'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Swords, Check, X, Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/utils/supabase/client';
import { respondToInvite } from '../actions';
import { toast } from 'sonner';

export default function NotificationPanel({ currentUser }: { currentUser: any }) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    let channel: any;

    const setupSubscription = async () => {
      if (!currentUser?.id) return;

      fetchNotifications();
      
      channel = supabase
        .channel(`notifications-${currentUser.id}`)
        .on('postgres_changes', { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'notifications',
            filter: `user_id=eq.${currentUser.id}`
        }, (payload) => {
          setNotifications(prev => [payload.new, ...prev]);
          toast.info('New battle invitation!');
        })
        .subscribe();
    };

    setupSubscription();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    if (!currentUser?.id) return;

    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', currentUser.id)
      .eq('is_read', false)
      .order('created_at', { ascending: false });

    setNotifications(data || []);
  };

  const handleAction = async (notifId: string, type: string, data: any, accept: boolean) => {
    setIsProcessing(notifId);
    try {
      if (type === 'battle_invite') {
        if (!currentUser?.id) return;

        let inviteId = data.invite_id;

        if (!inviteId) {
          const { data: invite } = await supabase
            .from('battle_invites')
            .select('id')
            .eq('battle_id', data.battle_id)
            .eq('invited_user_id', currentUser.id)
            .eq('status', 'pending')
            .maybeSingle();
          
          if (invite) inviteId = invite.id;
        }

        if (inviteId) {
          setNotifications(prev => prev.filter(n => n.id !== notifId));
          await respondToInvite(inviteId, data.battle_id, accept, notifId);
        }
      }

      toast.success(accept ? 'Invitation accepted!' : 'Invitation declined');
      if (accept) {
        setIsOpen(false);
        router.push(`/arena?battle=${data.battle_id}`);
      }
    } catch (error) {
      console.error('Error responding to invite:', error);
      toast.error('Failed to respond to invitation');
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 rounded-2xl bg-black/3 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-rose-500/10 hover:text-rose-600 transition-all duration-300"
      >
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-[10px] font-black text-white flex items-center justify-center rounded-lg border-2 border-white dark:border-slate-950 animate-bounce">
            {notifications.length}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-96 z-50 bg-white dark:bg-slate-950 rounded-3xl border border-black/5 dark:border-white/10 shadow-2xl shadow-black/20 overflow-hidden"
            >
              <div className="p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
                <h3 className="font-space-grotesk font-black text-lg tracking-tight">Notifications</h3>
                <Badge variant="secondary" className="rounded-lg font-black text-[10px] uppercase tracking-wider">{notifications.length} New</Badge>
              </div>

              <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  notifications.map(notif => (
                    <div key={notif.id} className="p-6 border-b border-black/5 dark:border-white/10 hover:bg-black/1 dark:hover:bg-white/2 transition-colors group">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                          {notif.type === 'battle_invite' ? <Swords className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                        </div>
                        <div className="space-y-3 flex-1">
                          <p className="text-sm font-medium leading-relaxed">
                            <span className="font-black text-foreground">{notif.data.inviter_name}</span> invited you to a pulse-pounding <span className="text-rose-600 font-bold">{notif.data.topic}</span> battle!
                          </p>
                          {notif.type === 'battle_invite' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                disabled={isProcessing !== null}
                                onClick={() => handleAction(notif.id, notif.type, notif.data, true)}
                                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-9"
                              >
                                {isProcessing === notif.id ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <><Check className="w-3.5 h-3.5 mr-1" /> Accept</>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={isProcessing !== null}
                                onClick={() => handleAction(notif.id, notif.type, notif.data, false)}
                                className="flex-1 rounded-xl font-black text-[10px] uppercase tracking-widest h-9"
                              >
                                <X className="w-3.5 h-3.5 mr-1" /> Decline
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-black/3 dark:bg-white/5 flex items-center justify-center mx-auto mb-4 text-muted-foreground opacity-30">
                      <Bell className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-outfit font-bold text-muted-foreground opacity-50">All caught up!</p>
                  </div>
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="p-4 bg-black/2 dark:bg-white/5 text-center">
                    <button className="text-[10px] font-black uppercase tracking-[2px] text-muted-foreground hover:text-rose-600 transition-colors">
                        Mark all as read
                    </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
