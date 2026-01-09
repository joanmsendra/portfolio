import { Suspense, lazy } from "react";
import { Header } from "@/components/Header";
import { Hero3D } from "@/components/Hero3D";

// Lazy load below-the-fold components to improve initial load time
const About = lazy(() => import("@/components/About").then(module => ({ default: module.About })));
const Skills = lazy(() => import("@/components/Skills").then(module => ({ default: module.Skills })));
const Projects = lazy(() => import("@/components/Projects").then(module => ({ default: module.Projects })));
const Contact = lazy(() => import("@/components/Contact").then(module => ({ default: module.Contact })));
const Footer = lazy(() => import("@/components/Footer").then(module => ({ default: module.Footer })));

// Simple loading placeholder for sections
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero3D />
      
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<div className="py-8"><SectionLoader /></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
