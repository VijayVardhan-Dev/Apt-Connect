import React from 'react';

export default function FeatureSection({ title, description, children, reversed = false }) {
    return (
        <div className="font-poppins py-12 md:py-16">
            <div className="max-w-7xl mx-auto font-poppins px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col md:flex-row items-center gap-6 lg:gap-5 ${reversed ? 'md:flex-row-reverse' : ''}`}>

                    {/* Text Content */}
                    <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            {title}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Image Content */}
                    <div className="w-full md:w-1/2 px-6 md:px-0">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
}
