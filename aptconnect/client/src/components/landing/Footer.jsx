import React, { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Instagram, Facebook, Youtube, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import logo from '../../assets/logos/logo.png';

export default function Footer() {
    // Refs for animation
    const containerRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Register GSAP Plugin
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                // Start when the top of the container hits 75% of the viewport height (starts later)
                start: "top 75%",
                // End when the center of the container hits 60% of the viewport height
                end: "center 60%",
                // scrub: true links animation strictly to scrollbar
                // scrub: 3 adds a 3-second delay for smoothness
                scrub: 3,
                markers: false // Set to true to see debug markers
            }
        });

        // First line: Comes from Left (-400px)
        tl.fromTo(line1Ref.current,
            { x: -400, opacity: 0 },
            { x: 0, opacity: 1, ease: "power2.out" },
            0
        );

        // Second line: Comes from Right (+400px)
        tl.fromTo(line2Ref.current,
            { x: 400, opacity: 0 },
            { x: 0, opacity: 1, ease: "power2.out" },
            0 // Start at same time as line 1
        );

        // Cleanup on unmount
        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, []);

    return (
        <div className="font-poppins bg-gray-100 min-h-screen flex flex-col justify-end pb-6 px-4">

            {/* Pre-footer CTA with GSAP Scroll Scrub */}
            <div ref={containerRef} className="max-w-4xl mx-auto text-center mt-16 mb-16 overflow-hidden">
                <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 leading-tight">
                    {/* Line 1 */}
                    <span ref={line1Ref} className="block will-change-transform">
                        Ready to find
                    </span>
                    {/* Line 2 */}
                    <span ref={line2Ref} className="block will-change-transform">
                        your <span className="text-blue-600">community?</span>
                    </span>
                </h2>

                <div className="animate-fade-in">
                    <p className="text-gray-500 mb-8">
                        Join 50+ clubs and 10k+ peers. Sign up in seconds.
                    </p>
                    <button onClick={() => navigate('/register')} className="bg-blue-600 text-white px-7 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30">
                        Sign up now
                    </button>
                </div>
            </div>

            {/* MAIN FOOTER CARD */}
            <footer className="bg-white w-full max-w-[1400px] mx-auto rounded-4xl shadow-sm px-8 py-12 md:px-16 md:py-16">

                {/* Top Section: Brand & Tagline */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <div className="flex items-center gap-2">
                        {/* Logo */}
                        <img src={logo} alt="APT Connect Logo" className="h-16 object-contain" />
                    </div>
                    <p className="text-gray-500 text-sm mt-4 md:mt-0 font-medium">
                        Connect. Collaborate. Create.
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 w-full mb-12"></div>

                {/* Middle Section: 4 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">

                    {/* Column 1: Platform */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-gray-500 font-medium">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Explore Clubs</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Events</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Projects</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Resources */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-gray-500 font-medium">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Community Guidelines</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Support</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Contact</h4>
                        <div className="space-y-4">
                            <a href="mailto:support@aptconnect.edu" className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Mail size={16} />
                                </div>
                                <span className="text-sm text-gray-500 font-medium group-hover:text-blue-600">support@aptconnect.edu</span>
                            </a>

                            <div className="flex items-center gap-3 group cursor-default">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Phone size={16} />
                                </div>
                                <span className="text-sm text-gray-500 font-medium">+91 123 456 7890</span>
                            </div>

                            <div className="flex items-center gap-3 group cursor-default">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <MapPin size={16} />
                                </div>
                                <span className="text-sm text-gray-500 font-medium">University Campus, Block A</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Language & Socials */}
                    <div className="flex flex-col justify-between">
                        <div className="flex justify-start lg:justify-end">
                            <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:border-gray-300 transition-colors">
                                <Globe size={16} />
                                <span>English</span>
                                <ChevronDown size={14} />
                            </button>
                        </div>

                        <div className="flex gap-4 justify-start lg:justify-end mt-8 lg:mt-0">
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 w-full mb-8"></div>

                {/* Bottom Section: Copyright & Legal */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p className="text-gray-400">© 2025 APT Connect. All rights reserved.</p>

                    <div className="flex gap-8">
                        <a href="#" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Terms & Conditions</a>
                        <a href="#" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Cookies</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}