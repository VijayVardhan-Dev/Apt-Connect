import React from 'react';

export const HeroImagePlaceholder = () => (
    <div className="w-full h-64 md:h-96 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="text-center p-6 relative z-10">
            <p className="text-gray-400 font-medium mb-2">Hero Illustration Placeholder</p>
            <p className="text-xs text-gray-400">Add your "Connect", "Collaborate", "Create" doodles here</p>
        </div>

        {/* Visual hints of where elements are in your design */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-red-100 rounded-full opacity-50 blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-yellow-100 rounded-full opacity-50 blur-xl animate-pulse delay-300"></div>
    </div>
);

export const FeatureImagePlaceholder1 = () => (
    <div className="w-full aspect-square md:aspect-[4/3] bg-gray-300 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
        <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 rounded-sm"></div>
        </div>
    </div>
);

export const FeatureImagePlaceholder2 = () => (
    <div className="w-full aspect-square md:aspect-[4/3] bg-gray-300 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
    </div>
);

export const FeatureImagePlaceholder3 = () => (
    <div className="w-full aspect-square md:aspect-[4/3] bg-gray-300 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
        <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-white"></div>
    </div>
);
