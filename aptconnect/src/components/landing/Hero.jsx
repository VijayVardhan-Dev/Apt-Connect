import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import connectImg from '../../assets/illustrations/connect.png';
import collaborateImg from '../../assets/illustrations/collobarate.png';
import createImg from '../../assets/illustrations/create.png';
import logo from '../../assets/logos/logo.png';

export default function Hero() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <section className="relative pt-0 pb-12 overflow-hidden">
            {/* Navbar integrated into Hero */}
            <nav className="relative z-50 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <img src={logo} alt="APT Connect" className="h-14 w-auto" />
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Log in
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                            >
                                Sign up
                            </button>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900">
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden bg-white border-b border-gray-100 absolute w-full top-full left-0 z-50 shadow-lg">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <button
                                onClick={() => navigate('/login')}
                                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            >
                                Log in
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="block w-full text-left px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Grid Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center pt-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                    Connect and grow with <br className="hidden md:block" />
                    clubs at APT Kakinada.
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                    Join clubs, collaborate on projects, and showcase your work — all in one place.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
                    >
                        Get started - it's free
                    </button>
                    <button
                        onClick={() => navigate('/explore')}
                        className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                    >
                        Explore clubs
                    </button>
                </div>

                <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                    {/* Connect */}
                    <div className="relative group">
                        <div className="h-64 w-full flex items-center justify-center relative">
                            <img src={connectImg} alt="Connect" className="w-full h-full object-contain" />
                        </div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center">
                            <div className="bg-[#FF9B9B] px-6 py-2 rounded-full shadow-sm text-sm font-medium text-white whitespace-nowrap z-10">
                                connect
                            </div>
                        </div>
                    </div>

                    {/* Collaborate */}
                    <div className="relative group">
                        <div className="h-64 w-full flex items-center justify-center relative">
                            <img src={collaborateImg} alt="Collaborate" className="w-full h-full object-contain" />
                        </div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center">
                            <div className="bg-[#A78BFA] px-6 py-2 rounded-full shadow-sm text-sm font-medium text-white whitespace-nowrap z-10">
                                collaborate
                            </div>
                        </div>
                    </div>

                    {/* Create */}
                    <div className="relative group">
                        <div className="h-64 w-full flex items-center justify-center relative">
                            <img src={createImg} alt="Create" className="w-full h-full object-contain" />
                        </div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center">
                            <div className="bg-[#F472B6] px-6 py-2 rounded-full shadow-sm text-sm font-medium text-white whitespace-nowrap z-10">
                                create
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
