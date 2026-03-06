'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useAuthSync } from '@/features/auth/useAuthSync';

function AuthSyncer({ children }: { children: React.ReactNode }) {
  useAuthSync(); 
  return <>{children}</>;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthSyncer>{children}</AuthSyncer>
    </Provider>
  );
}
