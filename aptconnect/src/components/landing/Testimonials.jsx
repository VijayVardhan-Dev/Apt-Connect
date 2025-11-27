import React from 'react';

// Data extracted directly from the image
const testimonialData = [
    {
        quote: "APT Connect helped me find the right club for my passion, and I made amazing friends!",
        author: "Guna Sekhar Bora",
        role: "Literary Club"
    },
    {
        quote: "I showcased my project and got recognition college-wide. The platform is really easy to use.",
        author: "Anjali Reddy",
        role: "Literary Club"
    },
    {
        quote: "Managing events has never been easier. APT Connect keeps our members engaged!",
        author: "Anjali Reddy",
        role: "Literary Club"
    }
];

const eventsData = [
    { name: "Tech Expo 2025", date: "Nov 8, 2025, 10:00 AM" },
    { name: "Art + Design Carnival", date: "Nov 12, 2025, 3:00 PM" },
    { name: "Coding Marathon", date: "Nov 15, 2025, 9:00 AM" },
    { name: "Quiz Bowl", date: "Nov 18, 2025, 2:00 PM" },
    { name: "Robotics Bootcamp", date: "Nov 20, 2025, 4:00 PM" },
    { name: "Cultural Night", date: "Nov 22, 2025, 6:00 PM" },
];

const TestimonialCard = ({ quote, author, role }) => (
    <div className="bg-gray-50 p-8 rounded-2xl h-full flex flex-col justify-between hover:bg-gray-100 transition-colors duration-300">
        <p className="text-gray-600 mb-8 text-sm leading-relaxed">"{quote}"</p>
        <div className="flex items-center mt-25 gap-3">
            {/* Avatar Placeholder */}
            <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
            <div>
                <h4 className="font-bold text-gray-900 text-xs">{author}</h4>
                <p className="text-xs text-gray-400">{role}</p>
            </div>
        </div>
    </div>
);

const EventRow = ({ name, date }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-50 hover:bg-gray-50 px-2 transition-colors rounded-md group cursor-default">
        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-black">{name}</h3>
        <p className="text-xs text-gray-400 group-hover:text-gray-500">{date}</p>
    </div>
);

export default function Testimonials() {
    return (
        <section className=" py-20 max-w-6xl font-poppins mx-auto px-4 sm:px-6 lg:px-8 bg-white">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">What Students Are Saying</h2>
                <p className="text-gray-400 text-lg font-light">Voices from our APT community.</p>
            </div>

            {/* Testimonials Grid */}
            <div className="flex md:grid md:grid-cols-3 gap-6 mb-24 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                {testimonialData.map((item, index) => (
                    <div key={index} className="min-w-[85vw] md:min-w-0 snap-center">
                        <TestimonialCard
                            quote={item.quote}
                            author={item.author}
                            role={item.role}
                        />
                    </div>
                ))}
            </div>

            {/* Events Section */}
            <div className="max-w-6xl mx-auto">
                {/* Note: The image shows no specific header for events, just the list. 
            If you need a header, uncomment the line below: */}
                {/* <h3 className="text-xl font-bold mb-6">Upcoming Events</h3> */}

                <div className="flex flex-col gap-1">
                    {eventsData.map((event, index) => (
                        <EventRow
                            key={index}
                            name={event.name}
                            date={event.date}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}