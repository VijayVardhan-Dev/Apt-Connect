import React from "react";
import { useNavigate } from "react-router-dom";

export default function CTA() {
    const navigate = useNavigate();

    return (
        <section className="py-24 px-4 bg-slate-900 text-white text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Ready to find your <br /> community?
                </h2>
                <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                    Join your college portal. Join 500+ students and 50+ clubs. Sign up in seconds.
                </p>
                <button
                    onClick={() => navigate('/register')}
                    className="px-10 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-500 transition shadow-lg hover:shadow-indigo-500/50"
                >
                    Sign up now
                </button>
            </div>
        </section>
    );
}
