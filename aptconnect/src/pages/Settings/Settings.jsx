import React, { useState } from "react";
import { ArrowLeft, ChevronDown, X } from "lucide-react";

const SECTIONS = [
  {
    title: "Sign in & Security",
    content: (
      <div className="space-y-2">
        <p className="text-sm">Email: bora@example.com</p>
        <button className="text-sm underline text-indigo-600 hover:text-indigo-700">Change password</button>
      </div>
    ),
  },
  {
    title: "Visibility",
    content: (
      <div className="space-y-2">
        <label className="flex items-center gap-3">
          <input type="radio" name="vis" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
          <span className="text-sm">Public</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="radio" name="vis" className="text-indigo-600 focus:ring-indigo-500" />
          <span className="text-sm">Private</span>
        </label>
      </div>
    ),
  },
  {
    title: "Data privacy",
    content: (
      <div className="space-y-2">
        <p className="text-sm">Manage what data Apt Connect stores.</p>
        <button className="text-sm underline text-indigo-600 hover:text-indigo-700">Download your data</button>
      </div>
    ),
  },
  {
    title: "Notifications",
    content: (
      <div className="space-y-2">
        <label className="flex items-center justify-between">
          <span className="text-sm">Email notifications</span>
          <input type="checkbox" defaultChecked className="text-indigo-600 rounded focus:ring-indigo-500" />
        </label>
        <label className="flex items-center justify-between">
          <span className="text-sm">Push notifications</span>
          <input type="checkbox" className="text-indigo-600 rounded focus:ring-indigo-500" />
        </label>
      </div>
    ),
  },
];

export default function SettingsPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeModal = (setter) => (e) => {
    setter(false);
  };

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  const handleLogout = () => {
    setShowLogoutModal(false);
    console.log("Logout action initiated.");
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    console.log("Account deletion initiated.");
  };

  return (
    <div className="min-h-screen bg-white py-8 text-gray-900">
      
      {/* 💡 MODIFIED CONTAINER: Removed mx-auto. Uses max-w-3xl for readable width 
          and relies on the parent Dashboard Layout (which offsets the sidebar)
          to position this content correctly on the left. */}
      <div className="w-full max-w-3xl px-4 sm:px-6"> 
        
        {/* Header */}
        <div className="flex items-center mb-8">
          <ArrowLeft className="w-6 h-6 cursor-pointer text-gray-800 hover:text-indigo-600 transition" />
          <h2 className="text-xl font-medium ml-4">Settings</h2> 
        </div>

        {/* ===== Main Content Block (Left-aligned, max-width 3xl) ===== */}

        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-10">
          <img
            src="https://placehold.co/56x56/a0a0a0/ffffff?text=P"
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-indigo-400"
          />
          <div>
            <p className="text-sm text-gray-600">Profile</p>
            <h3 className="text-base font-semibold text-gray-900">
              Bora Gunasekhar
            </h3>
          </div>
        </div>

        {/* Settings Options (Accordion Style) */}
        <div className="border-t border-gray-200">
          {SECTIONS.map((sec, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={sec.title} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-4 px-0 text-left hover:bg-gray-50 transition rounded-md"
                  aria-expanded={isOpen}
                  aria-controls={`section-content-${i}`}
                >
                  <span className="text-[15px] font-medium text-gray-800">{sec.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transform transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <div
                  id={`section-content-${i}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-80 py-3" : "max-h-0"
                  }`}
                >
                  <div className="text-sm text-gray-700 pl-4">{sec.content}</div> 
                </div>
              </div>
            );
          })}

          {/* Account Deletion */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex justify-between items-center py-3 px-0 cursor-pointer hover:bg-gray-50 transition rounded-md"
          >
            <span className="text-red-600 text-[15px] font-medium">
              Delete Account
            </span>
          </button>

          {/* Logout */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex justify-between items-center py-3 px-0 cursor-pointer hover:bg-gray-50 transition rounded-md"
          >
            <span className="text-[15px] font-medium text-gray-800">Logout</span>
          </button>
        </div>
      </div>
      {/* ===== End Main Content Block ===== */}


      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-blur-sm" onClick={closeModal(setShowLogoutModal)}>
          <div className="bg-white rounded-lg p-6 w-[350px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Confirm Logout</h3>
              <X
                className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={closeModal(setShowLogoutModal)}
              />
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal(setShowLogoutModal)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-blur-sm" onClick={closeModal(setShowDeleteModal)}>
          <div className="bg-white rounded-lg p-6 w-[350px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-red-600">
                Delete Account
              </h3>
              <X
                className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={closeModal(setShowDeleteModal)}
              />
            </div>
            <p className="text-sm text-gray-600 mb-6">
              This action is permanent. Are you sure you want to delete your
              account?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal(setShowDeleteModal)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}