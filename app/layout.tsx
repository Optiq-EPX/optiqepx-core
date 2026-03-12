import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Hind_Siliguri, Baloo_Da_2, Noto_Sans_Bengali, Mina, Galada } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/store/StoreProvider";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SuppressExtensionWarnings } from "@/components/shared/SuppressExtensionWarnings";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri-var",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
});

const outfit = Outfit({
  variable: "--font-outfit-var",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-var",
  subsets: ["latin"],
});

const balooDa2 = Baloo_Da_2({
  variable: "--font-baloo-da-var",
  subsets: ["bengali"],
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali-var",
  subsets: ["bengali"],
});

const mina = Mina({
  variable: "--font-mina-var",
  weight: ["400", "700"],
  subsets: ["bengali"],
});

const galada = Galada({
  variable: "--font-galada-var",
  weight: ["400"],
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: "OptiqEPX | AI-Powered Student Learning & Growth Platform",
  description: "Compete in study battles, collaborate in live rooms, and grow with a personal AI tutor. The next-generation platform for students.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${hindSiliguri.variable} ${balooDa2.variable} ${notoBengali.variable} ${mina.variable} ${galada.variable} antialiased`}
        suppressHydrationWarning
      >
        <SuppressExtensionWarnings />
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
