import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/layout/hero";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HeroSection />
      </main>
    </>
  );
}
