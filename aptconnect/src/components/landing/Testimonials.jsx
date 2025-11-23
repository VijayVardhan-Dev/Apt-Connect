import React from 'react';

const TestimonialCard = ({ quote, author, role }) => (
    <div className="bg-gray-50 p-8 rounded-2xl hover:bg-gray-100 transition-colors duration-300">
        <p className="text-gray-700 mb-6 italic leading-relaxed">"{quote}"</p>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
                <h4 className="font-semibold text-gray-900 text-sm">{author}</h4>
                <p className="text-xs text-gray-500">{role}</p>
            </div>
        </div>
    </div>
);

export default function Testimonials() {
    return (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">What Students Are Saying</h2>
                <p className="text-gray-500">Voices from our APT community.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <TestimonialCard
                    quote="APT Connect helped me find all the tech clubs instantly. The notification system is really amazing, never miss an event!"
                    author="Samantha Rao"
                    role="CSE, 3rd Year"
                />
                <TestimonialCard
                    quote="I was able to collaborate and find a team for the hackathon via this platform. It really simplifies college life."
                    author="Amit Reddy"
                    role="ECE, 2nd Year"
                />
                <TestimonialCard
                    quote="Great platform to showcase my projects. Connecting with seniors has never been easier."
                    author="Rahul P."
                    role="IT, 4th Year"
                />
            </div>
        </section>
    );
}
