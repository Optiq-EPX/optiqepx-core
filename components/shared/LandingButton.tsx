'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface LandingButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  showArrow?: boolean;
  fullWidth?: boolean;
}

export function LandingButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon,
  iconPosition = 'right',
  showArrow = false,
  fullWidth = false,
}: LandingButtonProps) {

  const variantStyles = {
    primary: cn(
      "relative text-white",
      "bg-gradient-to-b from-violet-500 to-violet-700",
      "shadow-[0_0_0_1px_rgba(139,92,246,0.5),0_4px_16px_rgba(124,58,237,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]",
      "hover:shadow-[0_0_0_1px_rgba(139,92,246,0.6),0_8px_30px_rgba(124,58,237,0.45),inset_0_1px_0_rgba(255,255,255,0.2)]",
      "active:shadow-[0_0_0_1px_rgba(139,92,246,0.5),0_2px_8px_rgba(124,58,237,0.3),inset_0_1px_4px_rgba(0,0,0,0.1)]",
    ),
    secondary: cn(
      "relative text-violet-600 dark:text-violet-300",
      "bg-white/80 dark:bg-white/[0.06]",
      "backdrop-blur-xl",
      "shadow-[0_0_0_1px_rgba(139,92,246,0.15),0_2px_8px_rgba(0,0,0,0.04)]",
      "dark:shadow-[0_0_0_1px_rgba(139,92,246,0.2),0_2px_8px_rgba(0,0,0,0.2)]",
      "hover:shadow-[0_0_0_1px_rgba(139,92,246,0.3),0_4px_16px_rgba(124,58,237,0.1)]",
    ),
    ghost: cn(
      "relative text-slate-500 dark:text-slate-400",
      "bg-transparent",
      "hover:text-violet-600 dark:hover:text-violet-300",
      "hover:bg-violet-50/50 dark:hover:bg-violet-500/[0.06]",
    ),
    outline: cn(
      "relative text-violet-600 dark:text-violet-300",
      "bg-transparent",
      "shadow-[inset_0_0_0_1.5px_rgba(139,92,246,0.4)]",
      "hover:shadow-[inset_0_0_0_1.5px_rgba(139,92,246,0.7),0_4px_16px_rgba(124,58,237,0.15)]",
      "hover:bg-violet-500/[0.04] dark:hover:bg-violet-500/[0.08]",
    ),
    white: cn(
      "relative text-violet-700",
      "bg-white",
      "shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_4px_16px_rgba(0,0,0,0.1)]",
      "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_8px_24px_rgba(0,0,0,0.15)]",
    ),
  };

  const sizeStyles = {
    sm: "px-4 h-9 text-[12px] gap-1.5 rounded-[10px]",
    md: "px-6 h-11 text-[13px] gap-2 rounded-[12px]",
    lg: "px-8 h-[52px] text-[13px] gap-2.5 rounded-[14px]",
    xl: "px-10 h-[58px] text-[14px] gap-3 rounded-[16px]",
  };

  const buttonContent = (
    <motion.button
      whileHover={{ scale: 1.015, y: -1 }}
      whileTap={{ scale: 0.985, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center font-space-grotesk font-bold tracking-[-0.01em] transition-all duration-300 cursor-pointer group overflow-hidden",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
    >
      
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />
      )}

      
      {variant === 'primary' && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
      )}

      
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon className="w-[15px] h-[15px] transition-transform duration-300 group-hover:-translate-x-0.5" />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon className="w-[15px] h-[15px] transition-transform duration-300 group-hover:translate-x-0.5" />
        )}
        {showArrow && (
          <ArrowRight className="w-[15px] h-[15px] transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </motion.button>
  );

  if (href) {
    return (
      <Link href={href} className={cn("inline-block", fullWidth && "w-full")}>
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
}
