import React, { useState } from "react";
import { ChevronDown, Code, User } from "lucide-react";

// FAQ Data structure (Unchanged)
const FAQ_SECTIONS = [
  {
    category: "Getting Started",
    icon: User,
    questions: [
      {
        q: "How do I create a new Club?",
        a: "Navigate to the Home page and click the floating '+ Create' button in the top-right corner. You will be guided through a simple modal to set up your club's name, bio, and requirements.",
      },
      {
        q: "How does the mobile layout switching work?",
        a: "Below the 768px width breakpoint, the app switches to single-panel mode. Clicking a chat item hides the list and shows the conversation panel. The back arrow takes you back to the list.",
      },
      {
        q: "How do I update my profile settings?",
        a: "Click your profile icon (or the 'John Doe' name) in the sidebar footer. In the pop-up menu, click 'Settings' to adjust privacy, security, and notification preferences.",
      },
    ],
  },
  {
    category: "Technical Stack",
    icon: Code,
    questions: [
      {
        q: "What frontend framework is used?",
        a: "The site is built using React (with functional components and Hooks) for the dynamic UI, and styled exclusively with Tailwind CSS for rapid, utility-first development.",
      },
      {
        q: "How is the data handled?",
        a: "We use Firebase for the backend. Firestore manages the core data (posts, user profiles, chat metadata), and Firebase Storage handles image uploads (like club logos).",
      },
      {
        q: "How are the sidebars and chat layout responsive?",
        a: "Responsiveness is achieved via CSS media queries for width breakpoints (500px for bottom bar, 850px for sidebar collapse), and JavaScript state (`isMobileView`, `viewMode`) to conditionally render full-width components.",
      },
    ],
  },
];

export default function HelpPage() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="max-w-2xl mx-auto px-6 pt-12">
        
        {/* Minimal Header */}
        <header className="mb-12">
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            Help Center
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Frequently asked questions and support.
          </p>
        </header>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {FAQ_SECTIONS.map((section, sectionIndex) => (
            <div key={section.category}>
              
              {/* Section Title - Minimal & Uppercase */}
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                <section.icon size={16} className="text-gray-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {section.category}
                </h3>
              </div>

              {/* Questions List */}
              <div>
                {section.questions.map((item, itemIndex) => {
                  const uniqueId = `${sectionIndex}-${itemIndex}`;
                  const isOpen = openSection === uniqueId;

                  return (
                    <div
                      key={itemIndex}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <button
                        onClick={() => toggleSection(uniqueId)}
                        className="w-full flex justify-between items-start py-4 text-left group"
                        aria-expanded={isOpen}
                      >
                        <span className={`text-sm font-medium transition-colors duration-200 ${isOpen ? "text-black" : "text-gray-700 group-hover:text-black"}`}>
                          {item.q}
                        </span>
                        <span className="ml-4 mt-1">
                          <ChevronDown
                            size={14}
                            className={`text-gray-400 transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-black" : ""
                            }`}
                          />
                        </span>
                      </button>

                      {/* Answer Dropdown */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${
                          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="pb-6 text-sm leading-relaxed text-gray-500 max-w-prose">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}