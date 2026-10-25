import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { EngineeringApproach } from "@/components/sections/EngineeringApproach";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <EngineeringApproach />
      <TechStack />
      <Projects />
      <Contact />
    </main>
  );
}
