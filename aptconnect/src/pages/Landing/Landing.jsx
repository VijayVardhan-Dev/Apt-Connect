import React from 'react';
import Hero from "../../components/landing/Hero";
import Stats from "../../components/landing/Stats";
import FeatureSection from "../../components/landing/FeatureSection";
import Testimonials from "../../components/landing/Testimonials";
import Footer from "../../components/landing/Footer";
import { FeatureImagePlaceholder1, FeatureImagePlaceholder2, FeatureImagePlaceholder3 } from "../../components/landing/Placeholders";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">

      <main>
        <Hero />
        <Stats />

        <FeatureSection
          title="Connect, collaborate, and chat instantly."
          description="Approach clubs in the public directory based on your interests and get real-time conversations going."
        >
          <FeatureImagePlaceholder1 />
        </FeatureSection>

        <FeatureSection
          reversed={true}
          title="Build your next great project."
          description="Simple, always organized workspace for events, files, and more. Find team members easily."
        >
          <FeatureImagePlaceholder2 />
        </FeatureSection>

        <FeatureSection
          title="Build your public portfolio automatically."
          description="Showcase your work to the entire campus. Projects you work on build your resume automatically."
        >
          <FeatureImagePlaceholder3 />
        </FeatureSection>

        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}