-- ENUMS
CREATE TYPE user_role AS ENUM ('student', 'moderator', 'admin');

-- USERS PROFILE
CREATE TABLE public.users_profile (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'student'::user_role NOT NULL,
    class TEXT CHECK (class IN ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'intermediate', 'university')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- TEAMS
CREATE TABLE public.teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    class TEXT NOT NULL CHECK (class IN ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'intermediate', 'university')),
    created_by UUID REFERENCES public.users_profile(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- TEAM MEMBERS
CREATE TABLE public.team_members (
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users_profile(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    PRIMARY KEY (team_id, user_id)
);

-- BATTLES
CREATE TYPE battle_status AS ENUM ('waiting', 'active', 'finished');
CREATE TABLE public.battles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic TEXT NOT NULL,
    status battle_status DEFAULT 'waiting'::battle_status NOT NULL,
    created_by UUID REFERENCES public.users_profile(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE,
    finished_at TIMESTAMP WITH TIME ZONE
);

-- BATTLE PARTICIPANTS (Teams or individuals joining a battle)
CREATE TABLE public.battle_participants (
    battle_id UUID REFERENCES public.battles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users_profile(id) ON DELETE CASCADE,
    score INTEGER DEFAULT 0 NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    PRIMARY KEY (battle_id, user_id)
);

-- STUDY ROOMS
CREATE TABLE public.study_rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic TEXT NOT NULL,
    class TEXT NOT NULL CHECK (class IN ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'intermediate', 'university')),
    host_id UUID REFERENCES public.users_profile(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE
);

-- STUDY ROOM PARTICIPANTS
CREATE TABLE public.study_room_participants (
    room_id UUID REFERENCES public.study_rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users_profile(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    PRIMARY KEY (room_id, user_id)
);

-- ROW LEVEL SECURITY (RLS) ENABLEMENT
ALTER TABLE public.users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battle_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_room_participants ENABLE ROW LEVEL SECURITY;

-- SIMPLE MVP RLS POLICIES

-- Users Profile: Users can read everyone, but only update themselves. Admin can do all.
CREATE POLICY "Profiles are viewable by everyone" ON public.users_profile FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.users_profile FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.users_profile FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins have full access to profiles" ON public.users_profile TO authenticated USING ( (SELECT role FROM public.users_profile WHERE id = auth.uid()) = 'admin' );

-- Teams: Everyone can view teams. Users can create teams. Only members/creators can update.
CREATE POLICY "Teams are viewable by everyone" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create teams" ON public.teams FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Admins have full access to teams" ON public.teams TO authenticated USING ( (SELECT role FROM public.users_profile WHERE id = auth.uid()) = 'admin' );

-- Team Members
CREATE POLICY "Team members are viewable by everyone" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Authenticated users can join teams" ON public.team_members FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave teams" ON public.team_members FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins have full access to team_members" ON public.team_members TO authenticated USING ( (SELECT role FROM public.users_profile WHERE id = auth.uid()) = 'admin' );

-- Battles
CREATE POLICY "Battles are viewable by everyone" ON public.battles FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create battles" ON public.battles FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Admins and Moderators have full access to battles" ON public.battles TO authenticated USING ( (SELECT role FROM public.users_profile WHERE id = auth.uid()) IN ('admin', 'moderator') );

-- Battle Participants
CREATE POLICY "Battle participants are viewable by everyone" ON public.battle_participants FOR SELECT USING (true);
CREATE POLICY "Authenticated users can join battles" ON public.battle_participants FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their battle score" ON public.battle_participants FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins and Moderators have full access to battle participants" ON public.battle_participants TO authenticated USING ( (SELECT role FROM public.users_profile WHERE id = auth.uid()) IN ('admin', 'moderator') );

-- Study Rooms
CREATE POLICY "Study rooms are viewable by everyone" ON public.study_rooms FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create study rooms" ON public.study_rooms FOR INSERT TO authenticated WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Admins and Moderators have full access to study rooms" ON public.study_rooms TO authenticated USING ( (SELECT role FROM public.users_profile WHERE id = auth.uid()) IN ('admin', 'moderator') );

-- Study Room Participants
CREATE POLICY "Room participants are viewable by everyone" ON public.study_room_participants FOR SELECT USING (true);
CREATE POLICY "Authenticated users can join rooms" ON public.study_room_participants FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave rooms" ON public.study_room_participants FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins and Moderators have full access to room participants" ON public.study_room_participants TO authenticated USING ( (SELECT role FROM public.users_profile WHERE id = auth.uid()) IN ('admin', 'moderator') );

-- FUNCTION for inserting user profile properly during auth signup via trigger (Optional but robust)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users_profile (id, username, email, role, class)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8)),
    new.email,
    'student'::user_role,
    COALESCE(new.raw_user_meta_data->>'class', '1')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- TRIGGER
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
