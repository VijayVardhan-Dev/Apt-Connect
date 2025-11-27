import React from 'react';
import Hero from "../../components/landing/Hero";
import Stats from "../../components/landing/Stats";
import FeatureSection from "../../components/landing/FeatureSection";
import Testimonials from "../../components/landing/Testimonials";
import Footer from "../../components/landing/Footer";

import chatFeatureImg from "../../assets/images/chat.png";
import clubImg from "../../assets/images/club.png";
import profileImg from "../../assets/images/profile.jpg";


export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">

      <main>
        <Hero />
        {/* <Stats /> */}

        <FeatureSection
          title="Connect, collaborate, and chat instantly."
          description="Approach clubs in the public directory based on your interests and get real-time conversations going."
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800" alt="Connect feature" className="w-full h-auto" />
          </div>
          <div className="rounded-2xl overflow-hidden hover:shadow-lg border border-bordercolor">
            <img
              src={chatFeatureImg}
              alt="Chat Interface"
              className="w-full h-auto rounded-2xl hover:shadow-lg border border-gray-100"
            />
          </div>
        </FeatureSection>

        <FeatureSection
          reversed={true}
          title="Build your next great project."
          description="Simple, always organized workspace for events, files, and more. Find team members easily."
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Collaborate feature" className="w-full h-auto" />
          </div>
          <div className="rounded-2xl overflow-hidden hover:shadow-lg border border-bordercolor">
            <img
              src={clubImg}
              alt="Chat Interface"
              className="w-full h-auto rounded-2xl hover:shadow-lg border border-gray-100"
            />
          </div>
        </FeatureSection>

        <FeatureSection
          title="Build your public portfolio automatically."
          description="Showcase your work to the entire campus. Projects you work on build your resume automatically."
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" alt="Create feature" className="w-full h-auto" />
          </div>
          <div className="rounded-2xl overflow-hidden hover:shadow-lg border border-bordercolor">
            <img
              src={profileImg}
              alt="Chat Interface"
              className="w-full h-auto scale-103  object-cover object-right translate-x-2"
            />
          </div>
        </FeatureSection>

        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}