"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

const Navbar = () => {
  const pathname = usePathname();
  const [language, setLanguage] = useState("ENG");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    console.log("Auth state in Navbar:", {
      user,
      isLoading,
      storedToken:
        typeof window !== "undefined" ? localStorage.getItem("token") : null,
      storedEmail:
        typeof window !== "undefined"
          ? localStorage.getItem("userEmail")
          : null,
    });
  }, [user, isLoading]);

  const isActive = (href: string) => pathname === href;
  console.log("userrrr", user);

  return (
    <nav className="flex items-center justify-between z-10 px-8 py-6 absolute w-full left-1/2 -translate-x-1/2 lg:w-9/12">
      {/* Logo */}
      <Link href={"/"} className="text-2xl font-bold text-black">
        <span className="font-poetsen text-[32px]">MediZen</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex text-base space-x-6 font-poppins text-black font-semibold">
        <Link
          href="/"
          className={`${
            isActive("/") ? "text-buttonBg" : "hover:text-buttonBg"
          } cursor-pointer`}
        >
          Home
        </Link>
        <Link
          href="/#how-it-works"
          className={`${
            pathname === "/" ? "hover:text-buttonBg" : ""
          } cursor-pointer`}
        >
          How It Works
        </Link>
        <Link
          href="/payment"
          className={`${
            isActive("/payment") ? "text-buttonBg" : "hover:text-buttonBg"
          } cursor-pointer`}
        >
          Pricing
        </Link>
      </div>

      {/* Language & Login */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="flex items-center text-black font-medium">
          {/* {language} */}
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-black font-medium">Hi, {user.username}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:scale-105 duration-300 transition-all text-white px-6 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-buttonBg hover:scale-105 duration-300 transition-all text-white px-6 py-2 rounded-lg"
          >
            Login
          </Link>
        )}

        {/* <Link
                    href="/login"
                    className="bg-buttonBg hover:scale-105 duration-300 transition-all text-white px-6 py-2 rounded-lg"
                >
                    Login
                </Link> */}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="md:hidden text-black"
      >
        <Menu size={28} />
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="min-h-screen absolute w-full bg-white top-0 left-0 right-0 bottom-0 inset-0 flex flex-col items-center justify-center z-50 transition-all">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-3 text-semiBlack"
          >
            <X size={32} />
          </button>

          <div className="flex flex-col text-black items-start space-y-6 text-xl font-semibold">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`${isActive("/") ? "text-buttonBg" : ""}`}
            >
              Home
            </Link>
            <Link href="/#how-it-works" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </Link>
            <Link
              href="/payment"
              onClick={() => setIsMenuOpen(false)}
              className={`${isActive("/payment") ? "text-buttonBg" : ""}`}
            >
              Pricing
            </Link>
            <button className="text-gray-300 hover:text-black">
              {language}
            </button>
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="bg-buttonBg px-6 py-2 rounded-lg text-white"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
