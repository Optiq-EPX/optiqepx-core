'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function joinBattle(battleId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { data: existingPlayer } = await supabase
    .from('battle_players')
    .select('id')
    .eq('battle_id', battleId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existingPlayer) return { success: true };

  const { data: battle, error: battleError } = await supabase
    .from('battles')
    .select('max_players, status')
    .eq('id', battleId)
    .single();

  if (battleError || !battle) throw new Error('Battle not found');
  if (battle.status !== 'waiting') throw new Error('Battle already started or finished');

  const { count } = await supabase
    .from('battle_players')
    .select('id', { count: 'exact', head: true })
    .eq('battle_id', battleId);

  if ((count || 0) >= battle.max_players) throw new Error('Battle is full');

  const { error: joinError } = await supabase
    .from('battle_players')
    .insert({
      battle_id: battleId,
      user_id: user.id
    });

  if (joinError) throw joinError;

  revalidatePath('/arena');
  return { success: true };
}

export async function createBattle(topic: string, maxPlayers: number, status: 'draft' | 'waiting' = 'waiting', password?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { data: existingBattle } = await supabase
    .from('battles')
    .select('id, status')
    .eq('owner_id', user.id)
    .in('status', ['draft', 'waiting', 'active'])
    .maybeSingle();

  if (existingBattle) {
    if (existingBattle.status === 'active') {
      throw new Error('You already have an active battle in progress. Finish it before creating a new one.');
    }
    
    await supabase.from('battles').update({ status: 'finished' }).eq('id', existingBattle.id);
  }

  const { data: battle, error } = await supabase
    .from('battles')
    .insert({
      owner_id: user.id,
      topic,
      max_players: maxPlayers,
      status: status,
      password: password || null
    })
    .select()
    .single();

  if (error) throw error;

  const { error: joinError } = await supabase
    .from('battle_players')
    .insert({
      battle_id: battle.id,
      user_id: user.id,
      is_ready: true
    });

  if (joinError) throw joinError;

  revalidatePath('/arena');
  return battle;
}

export async function toggleReady(battleId: string, isReady: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('battle_players')
    .update({ is_ready: isReady })
    .eq('battle_id', battleId)
    .eq('user_id', user.id);

  if (error) throw error;

  revalidatePath('/arena');
  return { success: true };
}

export async function publishBattle(battleId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('battles')
    .update({ status: 'waiting' })
    .eq('id', battleId)
    .eq('owner_id', user.id);

  if (error) throw error;

  revalidatePath('/arena');
  return { success: true };
}

export async function updateBattle(battleId: string, topic: string, maxPlayers: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('battles')
    .update({ 
      topic, 
      max_players: maxPlayers 
    })
    .eq('id', battleId)
    .eq('owner_id', user.id);

  if (error) throw error;

  revalidatePath('/arena');
  return { success: true };
}

export async function sendInvite(battleId: string, invitedUserId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { data: existingInvite } = await supabase
    .from('battle_invites')
    .select('id')
    .eq('battle_id', battleId)
    .eq('invited_user_id', invitedUserId)
    .maybeSingle();

  if (existingInvite) return { success: true };

  const { data: invite, error: inviteError } = await supabase
    .from('battle_invites')
    .insert({
      battle_id: battleId,
      inviter_id: user.id,
      invited_user_id: invitedUserId,
      status: 'pending'
    })
    .select()
    .single();

  if (inviteError) throw inviteError;

  const { data: battle } = await supabase
    .from('battles')
    .select('topic')
    .eq('id', battleId)
    .single();

  const { error: notifError } = await supabase
    .from('notifications')
    .insert({
      user_id: invitedUserId,
      type: 'battle_invite',
      data: {
        battle_id: battleId,
        invite_id: invite.id,
        inviter_name: user.user_metadata?.username || user.user_metadata?.full_name || 'A rival',
        topic: battle?.topic || 'Knowledge'
      }
    });

  if (notifError) throw notifError;

  return { success: true };
}

export async function respondToInvite(inviteId: string, battleId: string, accept: boolean, notificationId?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const status = accept ? 'accepted' : 'declined';

  await supabase.from('battle_invites').update({ status }).eq('id', inviteId);

  if (notificationId) {
    await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId);
  }

  if (accept) {
    const { data: existingPlayer } = await supabase
      .from('battle_players')
      .select('id')
      .eq('battle_id', battleId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (!existingPlayer) {
      await supabase
        .from('battle_players')
        .insert({
          battle_id: battleId,
          user_id: user.id
        });
    }
  }

  return { success: true };
}

export async function startBattle(battleId: string, language: string = 'english') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { data: battle } = await supabase
    .from('battles')
    .select('owner_id, topic')
    .eq('id', battleId)
    .single();

  if (battle?.owner_id !== user.id) throw new Error('Only owner can start');

  const { data: players } = await supabase
    .from('battle_players')
    .select('user_id, is_ready')
    .eq('battle_id', battleId);

  const unreadyPlayers = players?.filter(p => !p.is_ready && p.user_id !== battle.owner_id);
  
  if (unreadyPlayers && unreadyPlayers.length > 0) {
    throw new Error('Wait for all opponents to be ready!');
  }

  const questions = await generateAIQuestions(battle.topic, language);

  const formattedQuestions = questions.map((q: any, index: number) => ({
    battle_id: battleId,
    question: q.question,
    options: q.options,
    correct_answer: q.answer,
    order_index: index
  }));

  const { error: questionsError } = await supabase
    .from('quiz_questions')
    .insert(formattedQuestions);

  if (questionsError) throw questionsError;

  const { error: statusError } = await supabase
    .from('battles')
    .update({ status: 'active' })
    .eq('id', battleId);

  if (statusError) throw statusError;

  revalidatePath('/arena');
  return { success: true };
}

async function generateAIQuestions(topic: string, language: string = 'english') {
  const OPENROUTER_API_KEY = process.env.OPEN_ROUTER_API;
  
  if (!OPENROUTER_API_KEY) {
    console.error("OPEN_ROUTER_API key not found in environment variables");
  }

  const systemPrompt = `You are an Expert Educator from Bangladesh specializing in "${topic}". 
  Your goal is to create a challenging, high-quality, and pedagogically sound quiz for students.
  
  Guidelines for Questions:
  1. The topic is "${topic}".
  2. Language: The questions and options must be in ${language === 'bengali' ? 'Bengali (বাংলা)' : 'English'}.
  3. Context: Use terminology and professional phrasing suitable for students in Bangladesh.
  4. Create 10 unique questions of varying difficulty (3 easy, 4 medium, 3 hard).
  5. Ensure questions are clear, accurate, and unambiguous.
  6. Options should be distinct.
  7. The 'answer' string MUST match one of the 'options' strings exactly, character for character.
  8. MUST: Randomize the correct answer's position across the options array.
  
  Response Requirement: 
  You MUST return ONLY a valid JSON object containing an array called "questions".`;

  const userPrompt = `Generate a 10-question quiz about "${topic}" in ${language === 'bengali' ? 'Bengali' : 'English'} in JSON format.
  Each object in the "questions" array must have:
  - "question": (string) The full question text.
  - "options": (array of 4 strings) Four distinct choices.
  - "answer": (string) The correct choice (must match one of the options exactly).
  
  Format example:
  {
    "questions": [
      {
        "question": "Sample Question?",
        "options": ["A", "B", "C", "D"],
        "answer": "A"
      }
    ]
  }`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "OptiqEPX Arena",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": [
          { "role": "system", "content": systemPrompt },
          { "role": "user", "content": userPrompt }
        ],
        "response_format": { "type": "json_object" },
        "temperature": 0.7
      })
    });

    const data = await response.json();
    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Invalid AI response structure");
    }

    const content = data.choices[0].message.content;
    const cleanedText = content.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleanedText);
    
    const questionsArray = Array.isArray(parsed) ? parsed : (parsed.questions || parsed.quiz || []);
    
    if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
      throw new Error("No questions generated");
    }

    return questionsArray.map((q: any) => {
      const options = [...q.options];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      return { ...q, options };
    });
    
  } catch (error) {
    console.error("OpenRouter Generation Error:", error);
    return [
      {
        question: `What is a primary fundamental concept associated with ${topic}?`,
        options: ["Concept Alpha", "Concept Beta", "Concept Gamma", "Concept Delta"],
        answer: "Concept Alpha"
      },
      {
        question: `Which of the following describes a key characteristic of ${topic}?`,
        options: ["Characteristic A", "Characteristic B", "Characteristic C", "Characteristic D"],
        answer: "Characteristic A"
      },
      ...Array.from({ length: 8 }).map((_, i) => ({
        question: `Advanced ${topic} Query #${i + 3}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: "Option A"
      }))
    ].map(q => {
        const options = [...q.options];
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
        return { ...q, options };
    });
  }
}

export async function submitAnswer(battleId: string, questionId: string, selectedOption: string, isCorrect: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { data: existingAnswer } = await supabase
    .from('answers')
    .select('id')
    .eq('battle_id', battleId)
    .eq('question_id', questionId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existingAnswer) return { success: true };

  const { error: answerError } = await supabase
    .from('answers')
    .insert({
      battle_id: battleId,
      question_id: questionId,
      user_id: user.id,
      selected_option: selectedOption,
      is_correct: isCorrect
    });

  if (answerError) throw answerError;

  if (isCorrect) {
    const { error: rpcError } = await supabase.rpc('increment_player_score', {
      p_battle_id: battleId,
      p_user_id: user.id,
      p_points: 10
    });

    if (rpcError) {
      console.error('Score increment failed:', rpcError);
    }
  }

  return { success: true };
}

export async function finishBattle(battleId: string) {
  const supabase = await createClient();
  
  await supabase
    .from('battles')
    .update({ status: 'finished' })
    .eq('id', battleId);

  const { data: players } = await supabase
    .from('battle_players')
    .select('user_id, score')
    .eq('battle_id', battleId)
    .order('score', { ascending: false });

  if (players) {
    const xpRewards = [50, 35, 20, 10, 5];
    for (let i = 0; i < players.length && i < xpRewards.length; i++) {
        const {data: userData} = await supabase.from('users').select('xp').eq('id', players[i].user_id).single();
        await supabase
          .from('users')
          .update({ xp: (userData?.xp || 0) + xpRewards[i] })
          .eq('id', players[i].user_id);
    }
  }

  return { success: true };
}

export async function abandonActiveBattles() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('battles')
    .update({ status: 'finished' })
    .eq('owner_id', user.id)
    .in('status', ['draft', 'waiting', 'active']);

  if (error) throw error;

  revalidatePath('/arena');
  return { success: true };
}

export async function deleteBattle(battleId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('battles')
    .delete()
    .eq('id', battleId)
    .eq('owner_id', user.id);

  if (error) throw error;

  revalidatePath('/arena');
  return { success: true };
}
