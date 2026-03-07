"use client";

import { ReactNode } from "react";
import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </MotionConfig>
  );
}
