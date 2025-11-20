import React, { useState } from "react";
import { ArrowLeft, ChevronDown, Code, Database, User } from "lucide-react";

// FAQ Data structure
const FAQ_SECTIONS = [
  {
    category: "Getting Started (General)",
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
    category: "Technical Stack (Advanced)",
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

  const toggleSection = (index) => {
    setOpenSection((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-white py-8 text-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center mb-10 border-b border-gray-100 pb-4">
          {/* ArrowLeft is kept here if this page is navigable via router.goBack() */}
          <h2 className="text-3xl font-extrabold ml-2">Help Center & FAQ</h2>
        </div>

        {FAQ_SECTIONS.map((section, sectionIndex) => (
          <div
            key={section.category}
            className="mb-8 p-4 bg-gray-50 rounded-lg shadow-md"
          >
            {/* Category Header */}
            <h3 className="flex items-center text-xl font-bold mb-4 text-indigo-700">
              <section.icon size={24} className="mr-3 fill-indigo-600" />
              {section.category}
            </h3>

            {/* Accordion List */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {section.questions.map((item, itemIndex) => {
                const isOpen = openSection === `${sectionIndex}-${itemIndex}`;
                return (
                  <div
                    key={itemIndex}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <button
                      className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-gray-100 transition"
                      onClick={() =>
                        toggleSection(
                          isOpen ? null : `${sectionIndex}-${itemIndex}`,
                        )
                      }
                      aria-expanded={isOpen}
                    >
                      <span className="text-gray-900">{item.q}</span>
                      <ChevronDown
                        size={18}
                        className={`text-gray-500 transform transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {/* Answer Dropdown */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96" : "max-h-0"
                      }`}
                      style={
                        isOpen ? { maxHeight: "500px" } : { maxHeight: "0" }
                      }
                    >
                      <p className="p-4 pt-0 text-sm text-gray-600 border-t border-gray-200/50">
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
  );
}
