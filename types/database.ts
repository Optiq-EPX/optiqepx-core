export type UserRole = 'student' | 'moderator' | 'admin';
export type ClassLevel = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'intermediate' | 'university';
export type BattleStatus = 'waiting' | 'active' | 'finished';

export interface UserProfile {
  id: string; 
  username: string;
  email: string;
  role: UserRole;
  class: ClassLevel;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string; 
  name: string;
  class: ClassLevel;
  created_by: string; 
  created_at: string;
}

export interface TeamMember {
  team_id: string; 
  user_id: string; 
  joined_at: string;
}

export interface Battle {
  id: string; 
  topic: string;
  status: BattleStatus;
  created_by: string; 
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
}

export interface BattleParticipant {
  battle_id: string; 
  user_id: string; 
  score: number;
  joined_at: string;
}

export interface StudyRoom {
  id: string; 
  topic: string;
  class: ClassLevel;
  host_id: string; 
  created_at: string;
  started_at: string | null;
}

export interface StudyRoomParticipant {
  room_id: string; 
  user_id: string; 
  joined_at: string;
}
