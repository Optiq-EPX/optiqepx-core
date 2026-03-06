import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BattleParticipant, BattleStatus } from '@/types/database';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

interface ArenaState {
  activeBattleId: string | null;
  battleStatus: BattleStatus | null;
  topic: string | null;
  participants: BattleParticipant[];
  questions: Question[];
  currentQuestionIndex: number;
  myScore: number;
  timeLeftSeconds: number;
  isAiGenerating: boolean;
}

const initialState: ArenaState = {
  activeBattleId: null,
  battleStatus: null,
  topic: null,
  participants: [],
  questions: [],
  currentQuestionIndex: 0,
  myScore: 0,
  timeLeftSeconds: 0,
  isAiGenerating: false,
};

export const arenaSlice = createSlice({
  name: 'arena',
  initialState,
  reducers: {
    setActiveBattle: (state, action: PayloadAction<{ id: string, topic: string, status: BattleStatus }>) => {
      state.activeBattleId = action.payload.id;
      state.topic = action.payload.topic;
      state.battleStatus = action.payload.status;
    },
    setParticipants: (state, action: PayloadAction<BattleParticipant[]>) => {
      state.participants = action.payload;
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    addScore: (state, action: PayloadAction<number>) => {
      state.myScore += action.payload;
    },
    setAiGenerating: (state, action: PayloadAction<boolean>) => {
      state.isAiGenerating = action.payload;
    },
    leaveBattle: (state) => {
      return initialState;
    }
  },
});

export const {
  setActiveBattle,
  setParticipants,
  setQuestions,
  nextQuestion,
  addScore,
  setAiGenerating,
  leaveBattle,
} = arenaSlice.actions;

export default arenaSlice.reducer;
