import { ContactCTA } from "@/components/ContactCTA";
import { ExpertiseGrid } from "@/components/ExpertiseGrid";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RegulationCards } from "@/components/RegulationCards";
import { STRAVerification } from "@/components/STRAVerification";
import { StudioIntro } from "@/components/StudioIntro";
import { WorksGrid } from "@/components/WorksGrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorksGrid />
        <StudioIntro />
        <ExpertiseGrid />
        <STRAVerification />
        <RegulationCards />
        <ProcessSteps />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
