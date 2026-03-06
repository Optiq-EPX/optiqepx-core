import { Navbar, Hero, HeroMockup, Features, Goals, Pricing, FAQ, CTA, Footer } from '@/components/landing';

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-violet-500/30 selection:text-primary">
      
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:100px_100px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.1),transparent_50%)]" />
      </div>

      <Navbar />
      <Hero />
      <HeroMockup />
      <div className="relative z-10">
        <Features />
        <Goals />
        <Pricing />
        <FAQ />
        <CTA />
      </div>
      <Footer />
    </div>
  );
}
