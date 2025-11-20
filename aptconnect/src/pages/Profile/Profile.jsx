import React, { useState } from "react";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const clsx = (...classes) => classes.filter(Boolean).join(" ");

// Dummy Data Structure
const USER_DATA = {
  name: "Kumar Selvam",
  title: "UI/UX Designer",
  handle: "@kumar.selvam",
  location: "Chennai, Tamil Nadu, India",
  bio: "Passionate designer specializing in large-scale enterprise resource planning (ERP) systems. I focus on creating intuitive, scalable interfaces that bridge complex data structures with seamless user experiences.", // ADDED BIO
  profilePicUrl: "https://placehold.co/100x100/A0A0A0/FFFFFF?text=KS",
  personal: {
    dob: "05-Apr-1997",
    age: "27 years 7 months",
    bloodGroup: "B+ve",
    gender: "Male",
    languages: "English, Tamil",
    // Removed: maritalStatus, religion, nationality
  },
  contact: {
    email: "kumar@softhwares.com",
    phone: "+91 900 000 0000",
    address: "70/B, Nehru St, T Nagar",
  },
  // Removed: bank data entirely
};

// MODIFIED TABS: Removed 'Family'
const TABS = ["Personal", "Contact", "Education", "Skills", "Work"];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Personal");

  const handleGoBack = () => {
    console.log("Navigating back...");
  };

  // --- Content Render Helpers ---

  const renderPersonalInfo = () => (
    // Two-column layout on medium screens, single column on mobile
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {/* Left Column (Personal Info) - SIMPLIFIED */}
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-gray-700 border-b pb-2 mb-2">
          Personal Information
        </h4>
        <p className="text-sm">
          Date of Birth:{" "}
          <span className="font-medium">{USER_DATA.personal.dob}</span>
        </p>
        <p className="text-sm">
          Age: <span className="font-medium">{USER_DATA.personal.age}</span>
        </p>
        <p className="text-sm">
          Blood Group:{" "}
          <span className="font-medium">{USER_DATA.personal.bloodGroup}</span>
        </p>
        <p className="text-sm">
          Gender:{" "}
          <span className="font-medium">{USER_DATA.personal.gender}</span>
        </p>
        <p className="text-sm">
          Languages Known:{" "}
          <span className="font-medium">{USER_DATA.personal.languages}</span>
        </p>
        {/* Removed: Marital Status, Religion, Nationality */}
      </div>

      {/* Right Column (Bio/Contact Space) */}
      <div className="space-y-6 md:pt-0 pt-6">
        <div className="space-y-4 p-4 rounded-lg bg-gray-100 shadow-sm">
          <h4 className="text-base font-semibold text-gray-700 border-b pb-2 mb-2">
            Bio/Expertise
          </h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {USER_DATA.bio}
          </p>
        </div>
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="space-y-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <h4 className="text-base font-semibold text-gray-700 border-b pb-2">
        Contact Details
      </h4>
      <p className="flex items-center text-sm">
        <Mail size={16} className="mr-3 text-indigo-500" /> Email:{" "}
        <span className="ml-2 font-medium">{USER_DATA.contact.email}</span>
      </p>
      <p className="flex items-center text-sm">
        <Phone size={16} className="mr-3 text-indigo-500" /> Phone:{" "}
        <span className="ml-2 font-medium">{USER_DATA.contact.phone}</span>
      </p>
      <p className="flex items-center text-sm">
        <MapPin size={16} className="mr-3 text-indigo-500" /> Address:{" "}
        <span className="ml-2 font-medium">{USER_DATA.contact.address}</span>
      </p>
    </div>
  );

  // Function to render the main content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal":
        return renderPersonalInfo();
      case "Contact":
        return renderContactInfo();
      case "Education":
        return (
          <div className="p-4 text-gray-500">
            Education history section coming soon...
          </div>
        );
      case "Skills":
        return (
          <div className="p-4 text-gray-500">
            Skills and Certifications section coming soon...
          </div>
        );
      case "Work":
        return (
          <div className="p-4 text-gray-500">
            Work experience section coming soon...
          </div>
        );
      default:
        return (
          <div className="p-4 text-gray-500">
            No data available for this section.
          </div>
        );
    }
  };

  return (
    // Main page container
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 text-gray-900">
      {/* Centered, max-width container for content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (Back button removed as per Notification Page style) */}
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold ml-2">My Profile</h2>
        </div>

        {/* ===== Profile Card Section (Top half) ===== */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          {/* Placeholder for the blue/tech background graphic (ERP Image) */}
          <div
            className="h-32 bg-indigo-700/90 relative flex items-center p-6 text-white"
            style={{
              backgroundImage: `url('https://picsum.photos/1000/200')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Profile Strength Indicator (Placeholder based on image) */}
            <div className="absolute top-4 right-4 bg-white/90 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold shadow-md">
              Profile Strength: 80%
            </div>
          </div>

          {/* User Details Area */}
          <div className="relative p-6 pt-0 flex flex-col md:flex-row md:items-end">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-gray-300 absolute -top-14 left-6">
              <img
                src={USER_DATA.profilePicUrl}
                alt={USER_DATA.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and Title */}
            <div className="mt-16 md:mt-0 md:ml-36">
              <h3 className="text-xl font-bold text-gray-900">
                {USER_DATA.name}
              </h3>
              <p className="text-sm text-gray-600">{USER_DATA.title}</p>
              <p className="text-xs text-indigo-600 mt-1">
                {USER_DATA.location}
              </p>
            </div>

            {/* Edit Button */}
            <button className="md:ml-auto mt-4 md:mt-0 flex items-center px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 text-indigo-600 hover:bg-indigo-50 transition">
              <Edit size={16} className="mr-2" /> Edit Profile
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="border-t border-gray-100 mt-6 pt-2 pb-2 overflow-x-auto whitespace-nowrap">
            <div className="flex px-6 space-x-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "py-3 text-sm font-semibold transition-colors border-b-2",
                    activeTab === tab
                      ? "text-indigo-600 border-indigo-600"
                      : "text-gray-500 border-transparent hover:border-gray-300",
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Tab Content Area (Bottom half) ===== */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
