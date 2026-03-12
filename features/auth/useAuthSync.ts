'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setUser, setLoading } from './store/authSlice';
import { createClient } from '@/utils/supabase/client';
import type { UserProfile } from '@/types/database';

export function useAuthSync() {
  const dispatch = useAppDispatch();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            const avatarUrl = profile.avatar_url || session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture;
            dispatch(setUser({ ...profile, avatar_url: avatarUrl } as UserProfile));
          } else {
            dispatch(setUser(null));
          }
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        console.error('Error syncing auth state:', error);
        dispatch(setUser(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
         const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
         const avatarUrl = profile?.avatar_url || session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture;
         dispatch(setUser({ ...profile, avatar_url: avatarUrl } as UserProfile));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, supabase]);
}
