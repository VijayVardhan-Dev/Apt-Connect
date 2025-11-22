import React from "react";
import { Users, FileText, Flag } from "lucide-react";

const ShowcaseStats = ({ stats }) => {
    const { totalUsers, totalClubs, totalPosts } = stats;

    const statItems = [
        {
            label: "Total Users",
            value: totalUsers,
            icon: <Users className="w-5 h-5 text-blue-500" />,
            bg: "bg-blue-50",
        },
        {
            label: "Active Clubs",
            value: totalClubs,
            icon: <Flag className="w-5 h-5 text-indigo-500" />,
            bg: "bg-indigo-50",
        },
        {
            label: "Total Posts",
            value: totalPosts,
            icon: <FileText className="w-5 h-5 text-rose-500" />,
            bg: "bg-rose-50",
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-4xl mx-auto mt-8">
            {statItems.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                    <div className={`p-3 rounded-full mb-2 ${item.bg}`}>
                        {item.icon}
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                        {item.value.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ShowcaseStats;
