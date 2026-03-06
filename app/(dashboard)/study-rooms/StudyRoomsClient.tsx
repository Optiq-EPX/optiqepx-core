'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioReceiver, Users, Clock, PlusCircle, ArrowRight, Activity } from 'lucide-react';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';

interface RoomStatsProps {
  activeCount: number;
}

function RoomStats({ activeCount }: RoomStatsProps) {
  return (
    <motion.div variants={fadeInUp} className="glass-card p-1 rounded-[2.5rem] bg-gradient-to-r from-blue-600/10 via-indigo-600/5 to-transparent border-white/80 dark:border-white/5 overflow-hidden shadow-2xl shadow-black/[0.02] bg-white/40 dark:bg-white/[0.02]">
      <div className="flex flex-col sm:flex-row items-center justify-between p-8 px-12 gap-8">
         <div className="flex items-center gap-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 animate-pulse shadow-inner bg-white/50 dark:bg-white/5">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-black font-outfit text-muted-foreground uppercase tracking-[0.2em] opacity-60">Live Analytics</p>
              <p className="text-3xl font-space-grotesk font-black tracking-tight">{activeCount} Students Live</p>
            </div>
         </div>
         <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-12 h-12 rounded-2xl border-4 border-white dark:border-slate-900 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow-xl transform hover:-translate-y-1 transition-transform cursor-pointer">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="w-12 h-12 rounded-2xl border-4 border-white dark:border-slate-900 bg-black/[0.03] dark:bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-black text-muted-foreground shadow-xl">
              +{(activeCount - 5) > 0 ? activeCount - 5 : 0}
            </div>
         </div>
      </div>
    </motion.div>
  );
}

interface RoomCardProps {
  room: {
    id: string;
    topic: string;
    
  };
}

function RoomCard({ room }: RoomCardProps) {
  return (
    <motion.div 
      variants={fadeInUp}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="h-full"
    >
      <motion.div
        variants={cardHover}
        className="glass-card p-0 rounded-[3rem] border-white/80 dark:border-white/10 hover:border-blue-500/30 transition-all duration-500 group overflow-hidden h-full flex flex-col shadow-2xl shadow-black/[0.02] bg-white/50 dark:bg-white/5"
      >
        <div className="p-10 pb-6 relative">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] transform translate-x-4 -translate-y-4">
            <Users className="w-32 h-32" />
          </div>
          
          <div className="flex justify-between items-start mb-8">
            <Badge className="rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 border-0 font-black px-4 py-1.5 uppercase tracking-wider text-[10px]">
              {room.topic}
            </Badge>
            <div className="flex items-center gap-2 bg-black/[0.03] dark:bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-white/5">
              <Users className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span className="text-[10px] font-black font-outfit text-foreground/80">4 / 12</span>
            </div>
          </div>

          <h3 className="text-2xl font-space-grotesk font-black mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
            {room.topic} Mastery
          </h3>
          <p className="text-sm font-outfit text-muted-foreground line-clamp-2 max-w-[95%] font-medium leading-relaxed">
            Collaborative session on <span className="text-foreground font-black underline decoration-blue-500/30">{room.topic}</span>. Premium tutoring module active.
          </p>
        </div>

        <div className="mt-auto p-10 pt-0">
          <div className="flex items-center justify-between mb-8 text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-[0.2em] bg-black/[0.02] dark:bg-white/[0.03] p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-white/30 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <Clock className="w-3.5 h-3.5" />
              Live Now
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              Active
            </div>
          </div>
          <Button className="w-full h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black font-outfit uppercase tracking-widest text-xs group/btn border-0 shadow-xl shadow-blue-500/20">
            Join Session
            <ArrowRight className="w-4 h-4 ml-3 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StudyRoomsClient({
  userClass,
  activeRooms
}: {
  userClass: string | undefined;
  activeRooms: any[] | null;
}) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-10"
    >
      {}
      <motion.div 
        variants={fadeInUp}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div>
          <h1 className="text-5xl font-space-grotesk font-black tracking-tighter text-gradient pb-2 bg-gradient-to-r from-blue-600 to-indigo-600">
            Study Modules
          </h1>
          <p className="text-muted-foreground font-outfit mt-2 font-semibold flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-black uppercase tracking-widest">
              Class {userClass?.toUpperCase() || 'GENERAL'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
            Learn together, grow faster
          </p>
        </div>
        <div className="flex gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="h-14 border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 rounded-2xl px-8 font-black font-outfit uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-sm">
              <RadioReceiver className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              My Sessions
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="h-14 px-8 rounded-2xl font-black font-outfit uppercase tracking-widest text-xs bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-xl shadow-blue-500/20 gap-3">
              <PlusCircle className="w-6 h-6" />
              New Room
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {}
      <RoomStats activeCount={247} />

      {}
      <motion.section variants={fadeInUp} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-space-grotesk font-black tracking-tight flex items-center gap-4 text-foreground/90">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/5 flex items-center justify-center">
              <RadioReceiver className="w-6 h-6 text-blue-500" />
            </div>
            Active Rooms
          </h2>
          <div className="px-5 py-2.5 rounded-full bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-sm bg-white/50 dark:bg-white/5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Live Feed
          </div>
        </div>

        <motion.div 
          variants={staggerContainer}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {activeRooms && activeRooms.length > 0 ? (
            activeRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))
          ) : (
            <motion.div 
              variants={fadeInUp}
              className="col-span-full py-32 text-center rounded-[3rem] bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-3xl flex flex-col items-center shadow-2xl shadow-black/[0.02]"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-blue-500/5 dark:bg-blue-500/[0.02] border border-blue-500/10 dark:border-blue-500/20 flex items-center justify-center mb-8 text-blue-500/30">
                <RadioReceiver className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-space-grotesk font-black text-foreground/90 mb-4 tracking-tight">The Hall is Quiet</h3>
              <p className="text-base font-outfit text-muted-foreground max-w-sm mx-auto mb-10 font-medium leading-relaxed opacity-70">
                No active study rooms for your class at the moment. Lead the way and start a session!
              </p>
              <Button size="lg" className="rounded-2xl h-16 px-12 bg-blue-600 hover:bg-blue-700 text-white font-black font-outfit uppercase tracking-widest text-xs border-0 shadow-2xl shadow-blue-500/30">
                Create First Room
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}

