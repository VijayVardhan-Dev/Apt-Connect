import React from "react";
import Hero from "../../components/landing/Hero";
import FeatureSection from "../../components/landing/FeatureSection";
import Testimonials from "../../components/landing/Testimonials";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

// Assets
import collaborateImg from "../../assets/illustrations/collobarate.png";
import createImg from "../../assets/illustrations/create.png";
import showcaseImg from "../../assets/illustrations/collobarate.png"; // Reusing collaborate for showcase if specific one not found, or use a placeholder. 
// Note: User mentioned "Showcase.png" in icons but "create.png" in illustrations. 
// Let's check if there is a showcase illustration. The list_dir showed: collobarate.png, connect.png, create.png.
// I will use create.png again or collaborate.png for the third section, or better, I will use the "Showcase.png" from icons if it's high res, but icons are usually small.
// Let's stick to the 3 illustrations we have. I'll use 'create.png' for the project section and 'collobarate.png' for the last one for now.

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Hero />

      <FeatureSection
        title="Connect, collaborate, and chat instantly."
        description="Explore clubs in one place. Meet peers based on your interests and start conversations."
        image={collaborateImg}
        bgColor="bg-white"
      />

      <FeatureSection
        title="Build your next great project."
        description="Create clubs, join projects, and work together. Turn your ideas into reality with a supportive community."
        image={createImg}
        reversed={true}
        bgColor="bg-slate-50"
      />

      <FeatureSection
        title="Build your public portfolio automatically."
        description="Your profile showcases your club memberships and projects. Get recognized for your contributions."
        image={collaborateImg} // Reusing for now as per available assets
        bgColor="bg-white"
      />

      <Testimonials />

      <CTA />

      <Footer />
    </div>
  );
}