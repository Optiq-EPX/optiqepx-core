'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Layout, 
  Swords, 
  ShieldCheck, 
  Key, 
  UserCog, 
  Activity,
  ArrowUpRight 
} from 'lucide-react';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';

export default function AdminDashboardClient({ 
  userCount, 
  roomCount, 
  battleCount 
}: { 
  userCount: number; 
  roomCount: number; 
  battleCount: number; 
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
          <h1 className="text-5xl font-space-grotesk font-black tracking-tighter bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent pb-2">
            Admin Console
          </h1>
          <p className="text-muted-foreground font-outfit mt-2 font-semibold flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-widest">
              Root Access
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
            Full platform governance
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="h-16 px-10 rounded-[1.5rem] font-black font-outfit uppercase tracking-widest text-xs bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white border-0 shadow-xl shadow-rose-500/30 gap-4">
            <ShieldCheck className="w-6 h-6" />
            System Audit
          </Button>
        </motion.div>
      </motion.div>

      {}
      <motion.div 
        variants={staggerContainer}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
      >
        <AdminStatCard 
          title="Total Users" 
          value={userCount.toString()} 
          icon={<Users className="w-6 h-6 text-violet-500 dark:text-violet-400" />} 
          label="Active Community"
        />
        <AdminStatCard 
          title="Study Rooms" 
          value={roomCount.toString()} 
          icon={<Layout className="w-6 h-6 text-blue-500 dark:text-blue-400" />} 
          label="Active Sessions"
        />
        <AdminStatCard 
          title="Total Battles" 
          value={battleCount.toString()} 
          icon={<Swords className="w-6 h-6 text-rose-500 dark:text-rose-400" />} 
          label="Competitive Pulse"
        />
        <AdminStatCard 
          title="Cluster Status" 
          value="STABLE" 
          icon={<Activity className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />} 
          label="99.9% Uptime"
        />
      </motion.div>

      {}
      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div variants={fadeInUp} whileHover="hover" initial="rest" animate="rest">
          <motion.div 
            variants={cardHover}
            className="glass-card p-10 rounded-[3rem] border-white/60 dark:border-white/10 hover:border-rose-500/20 transition-all group relative overflow-hidden h-full shadow-2xl shadow-black/[0.02] bg-white/50 dark:bg-white/5"
          >
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 dark:bg-rose-500/5 border border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400 bg-white/50 dark:bg-white/5">
                <Key className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-space-grotesk font-black text-foreground/90 leading-tight">AI Runtime</h3>
                <p className="text-xs font-black font-outfit text-muted-foreground uppercase tracking-widest opacity-60">AI Intelligence Core</p>
              </div>
            </div>
            
            <div className="space-y-6 mb-10">
              <div className="space-y-3">
                <Label className="text-[10px] font-black font-outfit uppercase tracking-[0.2em] text-muted-foreground/60 px-1 text-rose-600/60 dark:text-rose-400/60">Active Backend Key</Label>
                <Input 
                  type="password" 
                  value="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX" 
                  disabled 
                  className="h-14 rounded-2xl bg-black/[0.03] dark:bg-white/5 border-black/5 dark:border-white/10 font-mono text-sm tracking-widest opacity-50 transition-all" 
                />
              </div>
            </div>

            <Button className="w-full h-14 rounded-2xl bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white font-black font-outfit uppercase tracking-widest text-xs border-0 shadow-lg shadow-rose-500/20 transition-all">
              Initialize Key Rotation
            </Button>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover="hover" initial="rest" animate="rest">
          <motion.div 
            variants={cardHover}
            className="glass-card p-10 rounded-[3rem] border-white/60 dark:border-white/10 hover:border-violet-500/20 transition-all group relative overflow-hidden h-full shadow-2xl shadow-black/[0.02] bg-white/50 dark:bg-white/5"
          >
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 dark:bg-violet-500/5 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 bg-white/50 dark:bg-white/5">
                <UserCog className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-space-grotesk font-black text-foreground/90 leading-tight">User Governance</h3>
                <p className="text-xs font-black font-outfit text-muted-foreground uppercase tracking-widest opacity-60">Identity & Roles</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 rounded-3xl border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 hover:bg-black/[0.05] dark:hover:bg-white/10 font-black font-outfit flex flex-col gap-2 transition-all">
                <Users className="w-6 h-6 text-violet-500 dark:text-violet-400" />
                <span className="uppercase tracking-widest text-[10px]">Students</span>
              </Button>
              <Button variant="outline" className="h-24 rounded-3xl border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 hover:bg-black/[0.05] dark:hover:bg-white/10 font-black font-outfit flex flex-col gap-2 transition-all">
                <ShieldCheck className="w-6 h-6 text-rose-500 dark:text-rose-400" />
                <span className="uppercase tracking-widest text-[10px]">Moderators</span>
              </Button>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-violet-600/5 dark:bg-violet-600/[0.02] border border-violet-600/10 dark:border-violet-500/20 flex items-center justify-between group/link cursor-pointer bg-white/30 dark:bg-white/5">
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                <span className="text-[10px] font-black font-outfit uppercase tracking-[0.2em] text-violet-700 dark:text-violet-400">Audit Permissions logs</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-violet-400 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function AdminStatCard({ title, value, icon, label }: { title: string, value: string, icon: React.ReactNode, label: string }) {
  return (
    <motion.div variants={fadeInUp} whileHover="hover" initial="rest" animate="rest">
      <motion.div 
        variants={cardHover}
        className="glass-card p-8 rounded-[2.5rem] border-white/60 dark:border-white/10 hover:border-violet-500/20 transition-all group overflow-hidden relative shadow-2xl shadow-black/[0.02] bg-white/50 dark:bg-white/5"
      >
        <div className="w-14 h-14 rounded-2xl bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-white/40 dark:bg-white/5">
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="text-3xl font-space-grotesk font-black text-foreground/90 tracking-tighter">
            {value}
          </h3>
          <p className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-[0.2em] opacity-60">
            {title}
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/5">
          <p className="text-[9px] font-black font-outfit text-primary flex items-center gap-2 uppercase tracking-widest opacity-80">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {label}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
