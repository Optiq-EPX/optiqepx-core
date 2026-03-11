import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/authSlice';
import arenaReducer from '@/features/arena/store/arenaSlice';
import aiReducer from '@/features/ai/store/aiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    arena: arenaReducer,
    ai: aiReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
