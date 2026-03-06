import { Navbar, Hero, Features, Goals, Pricing, FAQ, CTA, Footer } from '@/components/landing';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Goals />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
