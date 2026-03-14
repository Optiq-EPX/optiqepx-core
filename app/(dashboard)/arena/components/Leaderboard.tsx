'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Target } from 'lucide-react';
import { getHighResAvatar } from '@/lib/utils';

export default function Leaderboard({ players }: { players: any[] }) {
  return (
    <div className="glass-card p-8 rounded-[3rem] border-white/60 dark:border-white/10 shadow-2xl space-y-8 bg-white/40 dark:bg-slate-950/40">
      <div className="flex items-center justify-between">
        <h3 className="font-space-grotesk font-black text-xl tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Trophy className="w-5 h-5" />
            </div>
            Leaderboard
        </h3>
        <Star className="w-5 h-5 text-rose-500 animate-pulse fill-current" />
      </div>

      <div className="space-y-4">
        {players.map((player, index) => (
          <motion.div
            layout
            key={player.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-5 rounded-[2rem] border transition-all duration-500 ${index === 0 ? 'bg-linear-to-br from-amber-500/10 to-transparent border-amber-500/30' : 'bg-black/2 dark:bg-white/5 border-black/5 dark:border-white/5'}`}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black shadow-lg overflow-hidden ${index === 0 ? 'bg-linear-to-br from-amber-500 to-amber-600' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-orange-400' : 'bg-indigo-500'}`}>
                    {(() => {
                      const avatar = getHighResAvatar(player.users?.avatar_url);
                      return avatar ? (
                        <img src={avatar} className="w-full h-full object-cover" alt={player.users?.username} />
                      ) : (
                        player.users?.username?.charAt(0).toUpperCase()
                      );
                    })()}
                  </div>
                  {index < 3 && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-lg bg-white dark:bg-slate-900 shadow-md border border-black/5 dark:border-white/10 flex items-center justify-center">
                          <Medal className={`w-3.5 h-3.5 ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-slate-500' : 'text-orange-500'}`} />
                      </div>
                  )}
              </div>
              <div>
                <span className="block font-black text-sm tracking-tight">{player.users?.username}</span>
                <div className="flex items-center gap-2 mt-0.5">
                    <Target className="w-3 h-3 text-rose-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">{player.correct_answers || 0} Correct</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className={`block text-xl font-black font-space-grotesk tracking-tighter ${index === 0 ? 'text-amber-600' : 'text-foreground'}`}>
                {player.score || 0}
              </span>
              <span className="text-[8px] font-black uppercase tracking-[2px] text-muted-foreground opacity-40">Points</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-4 border-t border-black/5 dark:border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[3px] text-center text-muted-foreground opacity-40">Battle in Progress</p>
      </div>
    </div>
  );
}
