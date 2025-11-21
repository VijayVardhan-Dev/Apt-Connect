import React from "react";
import { useNavigate } from "react-router-dom";
import connectImg from "../../assets/illustrations/connect.png";
import activeIcon from "../../assets/icons/active_students_icon.png";
import projectIcon from "../../assets/icons/projects_icon.png";
import verifiedIcon from "../../assets/icons/verified_members_icon.png";
import membersIcon from "../../assets/icons/members_icon.png";

export default function Hero() {
    const navigate = useNavigate();

    const stats = [
        { icon: membersIcon, label: "500+ active learners" },
        { icon: activeIcon, label: "50+ clubs formed" },
        { icon: projectIcon, label: "120+ projects showcased" },
        { icon: verifiedIcon, label: "100% verified members" },
    ];

    return (
        <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-slate-50">
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                    Connect and grow with <br className="hidden md:block" />
                    clubs at <span className="text-indigo-600">APT Kakinada.</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                    Join clubs, collaborate on projects, and showcase your work — all in one place.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <button
                        onClick={() => navigate('/register')}
                        className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-200"
                    >
                        Join your college now
                    </button>
                    <button
                        onClick={() => navigate('/explore')}
                        className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 transition"
                    >
                        Explore clubs
                    </button>
                </div>

                {/* Hero Image */}
                <div className="relative max-w-4xl mx-auto mb-20">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10 bottom-0 h-20" />
                    <img
                        src={connectImg}
                        alt="Students connecting"
                        className="w-full h-auto object-contain drop-shadow-xl"
                    />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200 pt-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-2">
                                <img src={stat.icon} alt="" className="w-5 h-5 object-contain" />
                            </div>
                            <span className="text-sm font-medium text-slate-900">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none opacity-30">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl" />
            </div>
        </section>
    );
}
