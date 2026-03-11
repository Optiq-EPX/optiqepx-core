'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2, User, GraduationCap, CheckCircle2, Phone, MapPin, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const bdDistricts = [
  "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogra", "Brahmanbaria", 
  "Chandpur", "Chapainawabganj", "Chattogram", "Chuadanga", "Comilla", "Cox's Bazar", 
  "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", 
  "Habiganj", "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachari", 
  "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", 
  "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", 
  "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", 
  "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", 
  "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", 
  "Tangail", "Thakurgaon"
].sort();

const profileSchema = z.object({
  username: z.string().min(3, 'Minimum 3 characters required').max(20),
  phone: z.string().length(11, 'Must be 11 digits').startsWith('01', 'Must start with 01').regex(/^\d+$/, 'Must contain only digits'),
  district: z.string().min(1, 'Required'),
  upazila: z.string().min(1, 'Required'),
  roadHouse: z.string().min(1, 'Required'),
  class: z.string().min(1, "Required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const inputClass = "h-14 rounded-2xl border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 focus-visible:ring-2 focus-visible:ring-violet-500/20 focus-visible:border-violet-500 font-outfit transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-white text-base shadow-sm";
const labelClass = 'text-[11px] font-black font-space-grotesk uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 block';

function CustomSelect({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  icon: Icon,
  searchable = false
}: { 
  value: string, 
  onChange: (val: string) => void, 
  options: { label: string, value: string }[], 
  placeholder: string,
  icon: any,
  searchable?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dropup, setDropup] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 300;
      setDropup(spaceBelow < dropdownHeight);
    }
  }, [isOpen]);

  const filteredOptions = searchable 
    ? options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 font-outfit transition-all text-base shadow-sm w-full outline-none flex items-center px-14 cursor-pointer relative",
          isOpen && "border-violet-500 ring-2 ring-violet-500/20"
        )}
      >
        <Icon className={cn("absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 transition-colors", isOpen && "text-violet-500")} />
        <span className={cn("flex-1 text-left", !value && "text-zinc-400 dark:text-zinc-600")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={cn("absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 transition-transform duration-300", isOpen && "rotate-180")} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: dropup ? 8 : -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropup ? 8 : -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute z-[100] left-0 right-0 p-2 bg-white dark:bg-[#0f0f13] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden",
              dropup ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top"
            )}
          >
            {searchable && (
              <div className="relative mb-2 px-1 pt-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <input 
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 outline-none font-outfit text-sm focus:border-violet-500/50 transition-all text-foreground"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <div className="max-h-[220px] overflow-y-auto custom-scrollbar p-1 space-y-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-outfit font-bold text-sm transition-all",
                      value === opt.value 
                        ? "bg-violet-500/10 text-violet-600 dark:text-violet-400" 
                        : "hover:bg-zinc-50 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      value === opt.value ? "bg-violet-500/20" : "bg-black/5 dark:bg-white/5 group-hover:bg-black/10"
                    )}>
                      <Icon className={cn(
                        "w-4 h-4",
                        value === opt.value ? "text-violet-500" : "text-muted-foreground/40"
                      )} />
                    </div>
                    <span>{opt.label}</span>
                    {value === opt.value && <CheckCircle2 className="ml-auto w-4 h-4 text-violet-500" />}
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-zinc-400 dark:text-zinc-600 font-outfit text-sm">
                  No matches found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProfileForm({ 
  initialData, 
  onComplete,
  hideHeader = false
}: { 
  initialData: any, 
  onComplete?: () => void,
  hideHeader?: boolean
}) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  let initialDistrict = '';
  let initialUpazila = '';
  let initialRoadHouse = '';

  if (initialData?.address) {
    const parts = initialData.address.split(', ').map((s: string) => s.trim());
    if (parts.length >= 3) {
      initialDistrict = parts[parts.length - 1];
      initialUpazila = parts[parts.length - 2];
      initialRoadHouse = parts.slice(0, parts.length - 2).join(', ');
    } else {
      initialRoadHouse = initialData.address;
    }
  }

  let initialPhone = initialData?.phone || '';
  if (initialPhone.startsWith('+88')) {
    initialPhone = initialPhone.replace('+88', '');
  }

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: initialData?.username || initialData?.auth_username || '',
      phone: initialPhone,
      district: initialDistrict,
      upazila: initialUpazila,
      roadHouse: initialRoadHouse,
      class: (initialData?.class as any) || undefined,
    },
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').substring(0, 11);
    form.setValue('phone', digitsOnly, { shouldValidate: true });
  };

  async function onSubmit(data: ProfileFormData) {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setIsLoading(false);
      toast.error('Not authenticated');
      return;
    }

    const fullAddress = `${data.roadHouse}, ${data.upazila}, ${data.district}`;
    const isFirstCompletion = !initialData?.is_profile_completed;

    const payload: Record<string, any> = {
      id: user.id,
      email: user.email,
      username: data.username,
      phone: '+88' + data.phone,
      address: fullAddress,
      class: data.class,
      is_profile_completed: true,
      updated_at: new Date().toISOString()
    };

    if (isFirstCompletion) {
      payload.xp = (initialData?.xp || 0) + 50;
    }

    try {
      const { data: updatedData, error: updateError } = await supabase
        .from('users')
        .update(payload)
        .eq('id', user.id)
        .select();

      if (updateError || !updatedData?.length) {
        console.warn('Update failed or 0 rows returned, attempting upsert. updateError:', updateError);
        const { error: upsertError } = await supabase
          .from('users')
          .upsert(payload, { onConflict: 'id' });
        
        if (upsertError) throw upsertError;
      }

      toast.success('Profile updated successfully!');
      
      if (onComplete) {
        onComplete();
      }
      
      router.refresh();
      
      if (isFirstCompletion && !onComplete) {
        window.location.href = '/student?welcome=true';
      } else if (!onComplete) {
        router.push('/profile');
      }
    } catch (error: any) {
      console.error("Supabase Error:", error);
      if (error.code === '23505') {
        toast.error('Username already taken. Please choose another.');
      } else {
        toast.error(`Database Error: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {!hideHeader && (
        <div className="text-center mb-10">
          <motion.div 
            variants={fadeInUp}
            className="w-20 h-20 rounded-[2rem] bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6 shadow-inner"
          >
            <User className="w-10 h-10 text-violet-600" />
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl font-space-grotesk font-black tracking-tighter mb-3 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Complete Your Profile
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-muted-foreground font-outfit font-medium text-lg"
          >
            Just a few more details to unlock all features of Optiq EPX.
          </motion.p>
        </div>
      )}

      <motion.div variants={fadeInUp} className={cn(!onComplete && !hideHeader && "glass-card p-8 md:p-10 rounded-[3rem] border-white/60 dark:border-white/10 shadow-2xl")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full relative z-50">
            <div className="flex flex-col gap-6 relative z-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 relative z-50">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className={labelClass}>Unique Username</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 group-focus-within:text-violet-600 transition-colors" />
                          <Input placeholder="johndoe" className={`pl-14 ${inputClass}`} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage className="absolute -bottom-5 left-1 font-outfit text-[9px] uppercase tracking-wider font-bold opacity-80" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className={labelClass}>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative group flex items-center h-14 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500 transition-all shadow-sm overflow-hidden">
                          <div className="flex items-center justify-center pl-5 pr-4 h-full border-r border-zinc-200 dark:border-white/10 text-muted-foreground/50 transition-colors group-focus-within:border-violet-500/30">
                             <Phone className="w-5 h-5 mr-3 group-focus-within:text-violet-600 transition-colors" />
                             <span className="font-outfit font-bold text-foreground opacity-90">+88</span>
                          </div>
                          <Input 
                            placeholder="01XXXXXXXXX" 
                            className="h-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-4 flex-1 shadow-none rounded-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 font-outfit text-base text-zinc-900 dark:text-white"
                            maxLength={11}
                            {...field} 
                            onChange={handlePhoneChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="absolute -bottom-5 left-1 font-outfit text-[9px] uppercase tracking-wider font-bold opacity-80" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className={labelClass}>District</FormLabel>
                      <FormControl>
                        <CustomSelect 
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select District"
                          icon={MapPin}
                          searchable={true}
                          options={bdDistricts.map(d => ({ label: d, value: d }))}
                        />
                      </FormControl>
                      <FormMessage className="absolute -bottom-5 left-1 font-outfit text-[9px] uppercase tracking-wider font-bold opacity-80" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="upazila"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className={labelClass}>Upazila / Area</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 group-focus-within:text-violet-600 transition-colors" />
                          <Input placeholder="e.g. Mirpur" className={`pl-14 pr-4 ${inputClass}`} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage className="absolute -bottom-5 left-1 font-outfit text-[9px] uppercase tracking-wider font-bold opacity-80" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roadHouse"
                  render={({ field }) => (
                    <FormItem className="relative md:col-span-2">
                      <FormLabel className={labelClass}>Road, House or Village</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 group-focus-within:text-violet-600 transition-colors" />
                          <Input placeholder="e.g. House 12, Road 5, Sector 4" className={`pl-14 pr-4 ${inputClass}`} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage className="absolute -bottom-5 left-1 font-outfit text-[9px] uppercase tracking-wider font-bold opacity-80" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem className="relative md:col-span-2">
                      <FormLabel className={labelClass}>Current Academic Class</FormLabel>
                      <FormControl>
                        <CustomSelect 
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select your class"
                          icon={GraduationCap}
                          searchable={true}
                          options={[
                            ...['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(num => ({ label: `Class ${num}`, value: num })),
                            { label: 'Intermediate / HSC', value: 'intermediate' },
                            { label: 'University / Graduation', value: 'university' }
                          ]}
                        />
                      </FormControl>
                      <FormMessage className="absolute -bottom-5 left-1 font-outfit text-[9px] uppercase tracking-wider font-bold opacity-80" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col items-center gap-4 mt-6">
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-black font-space-grotesk uppercase tracking-widest text-sm shadow-xl shadow-violet-500/20 border-0 transition-all disabled:opacity-60 flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        {onComplete ? 'Save Changes' : 'Save Info'}
                      </>
                    )}
                  </Button>
                </motion.div>
                {onComplete && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onComplete}
                    className="w-full h-14 rounded-2xl font-bold font-outfit text-muted-foreground hover:text-foreground border-white/10 hover:bg-white/5 transition-all cursor-pointer"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </motion.div>
    </motion.div>
  );
}
