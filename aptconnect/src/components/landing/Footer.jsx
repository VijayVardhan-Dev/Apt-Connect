import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full">
            {/* Pre-footer CTA */}
            <div className="bg-[#5c5c5c] py-20 text-center px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to find your community?</h2>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                    Join your college email. Join 50+ clubs and 10k+ peers. Sign up in seconds.
                </p>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                    Sign up now
                </button>
            </div>

            {/* Main Footer Links */}
            <div className="bg-blue-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="col-span-2 md:col-span-1">
                            <h3 className="font-bold text-lg mb-4">APT Connect</h3>
                            <p className="text-blue-100 text-sm">Connect. Collaborate. Create.</p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-blue-100">Platform</h4>
                            <ul className="space-y-2 text-sm text-blue-100/80">
                                <li><a href="#" className="hover:text-white">Explore Clubs</a></li>
                                <li><a href="#" className="hover:text-white">Events</a></li>
                                <li><a href="#" className="hover:text-white">Projects</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-blue-100">Resources</h4>
                            <ul className="space-y-2 text-sm text-blue-100/80">
                                <li><a href="#" className="hover:text-white">Community Guidelines</a></li>
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-blue-100">Legal</h4>
                            <ul className="space-y-2 text-sm text-blue-100/80">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
