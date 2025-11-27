import React from 'react';
import { User, Calendar, Users, Shield } from 'lucide-react';

export default function Stats() {
    const stats = [
        { icon: <Users className="w-6 h-6 text-blue-600" />, label: "50+ Active Communities" },
        { icon: <Calendar className="w-6 h-6 text-blue-600" />, label: "100+ Events Hosted" },
        { icon: <User className="w-6 h-6 text-blue-600" />, label: "10k+ Student Members" },
        { icon: <Shield className="w-6 h-6 text-blue-600" />, label: "100% Verified Members" },
    ];

    return (
        <div className="font-poppins py-12 bg-gray-50/50 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-2 group cursor-default">
                            <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                                {stat.icon}
                            </div>
                            <span className="text-sm font-semibold text-gray-700">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
