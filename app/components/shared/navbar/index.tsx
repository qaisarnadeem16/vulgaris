'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { X, Menu } from 'lucide-react'; // Import icons from lucide-react

const Navbar = () => {
    const [language, setLanguage] = useState("ENG");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between px-8 py-6 absolute w-full left-1/2 -translate-x-1/2 lg:w-9/12">
            {/* Logo */}
            <Link href={'/'} className="text-2xl font-bold text-black">
                <span className="font-poetsen text-[32px]">Vulgaris</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex text-base space-x-6 font-poppins text-black font-semibold">
                <Link href={'/'} className="hover:text-buttonBg cursor-pointer">Home</Link>
                <Link href={'/'} className="hover:text-buttonBg cursor-pointer">How It Works</Link>
                <Link href={'/'} className="hover:text-buttonBg cursor-pointer">Pricing</Link>
            </div>

            {/* Language Selector & Login */}
            <div className="hidden md:flex items-center space-x-4">
                <button className="flex items-center text-black font-medium">
                    {language}
                </button>

                <button className="bg-buttonBg hover:scale-105 duration-300 transition-all text-white px-6 py-2 rounded-lg">
                    Login
                </button>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden text-black"
            >
                <Menu size={28} />
            </button>

            {/* Fullscreen Mobile Menu */}
            {isMenuOpen && (
                <div className=" min-h-screen absolute w-[100%] bg-white top-0 left-0 right-0 bottom-0 inset-0  flex flex-col items-center justify-center z-50 transition-all">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute top-6 right-3 text-semiBlack"
                    >
                        <X size={32} />
                    </button>

                    {/* Mobile Links */}
                    <div className="flex flex-col space-y-6  text-xl font-semibold">
                        <Link href={'/'} className="" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link href={'/'} className="" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
                        <Link href={'/'} className="" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                        <button className="text-gray-300 text-start hover:text-white">{language}</button>
                        <button className="bg-buttonBg px-6 py-2 rounded-lg text-white" onClick={() => setIsMenuOpen(false)}>
                            Login
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
