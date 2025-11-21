import React from "react";
import userIcon from "../../assets/icons/profile_icon.png";

const testimonials = [
    {
        quote: "APT Connect helped me find the perfect team for my hackathon project. It's a game changer!",
        author: "Gautam Krishna",
        role: "CSE Student",
    },
    {
        quote: "I never knew there were so many active clubs until I joined. The community is really supportive.",
        author: "Vamsi Reddy",
        role: "ECE Student",
    },
    {
        quote: "Showcasing my projects here got me noticed by seniors. Highly recommend it to juniors!",
        author: "Atul Poluri",
        role: "IT Student",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 px-4 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        What Students Are Saying
                    </h2>
                    <p className="text-lg text-slate-600">
                        Voices from our APT community.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                            <p className="text-slate-700 italic mb-8 leading-relaxed">
                                "{item.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
                                    <img src={userIcon} alt="user" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">{item.author}</h4>
                                    <span className="text-xs text-slate-500 uppercase tracking-wide">{item.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
