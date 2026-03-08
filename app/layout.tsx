import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/store/StoreProvider";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit-var",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-var",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OptiqEPX | AI-Powered Student Learning & Growth Platform",
  description: "Compete in study battles, collaborate in live rooms, and grow with a personal AI tutor. The next-generation platform for students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <MotionProvider> 
              {children}
            </MotionProvider>
            <Toaster />
            <ScrollToTop />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
