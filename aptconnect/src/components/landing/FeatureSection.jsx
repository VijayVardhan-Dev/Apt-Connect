import React from "react";

export default function FeatureSection({
    title,
    description,
    image,
    reversed = false,
    bgColor = "bg-white"
}) {
    return (
        <section className={`py-20 px-4 ${bgColor}`}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">

                {/* Text Content */}
                <div className={`flex-1 text-center md:text-left ${reversed ? 'md:order-2' : 'md:order-1'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                        {title}
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Image Content */}
                <div className={`flex-1 ${reversed ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition duration-500">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-auto object-cover bg-slate-100"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
