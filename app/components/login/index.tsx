import Image, { StaticImageData } from 'next/image';
import React from 'react';
import bitmap from '/public/assets/bitmap.svg';
import bg from '/public/assets/login-bg.svg';
import dots from '/public/assets/dots.svg';
import ellipse from '/public/assets/ellipse.svg';
import gradientellipse from '/public/assets/gradientellipse.svg';
import Section from '../shared/section';
import CustomInput from '../shared/common/custom-input';
import { AppleIcon, GoogleIcon } from '@/app/svg';
import Button from '../shared/common/custom-btn';
import Link from 'next/link';

const Login = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${(bitmap as StaticImageData).src})` }}>
            <div className="absolute lg:block hidden left-2 top-7">
                <Image src={gradientellipse} alt="gradientcircle" height={200} width={200} />
            </div>
            <Section>
                <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto w-full">

                    {/* Header Section */}
                    <div className="w-full bg-cover py-6 flex items-center justify-between px-10 text-center text-white font-poppins font-bold text-[22px]"
                        style={{ backgroundImage: `url(${(bg as StaticImageData).src})` }}>
                        Login Account
                        <div className="relative group">
                            {/* Link to Register Page */}
                            <Link href="/signup">
                                <Image src={dots} alt="dots" height={40} width={40} className="cursor-pointer" />
                            </Link>

                            {/* Tooltip (Hidden by Default, Shows on Hover) */}
                            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap 
                bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                Register Your Self
                            </span>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="max-w-lg mx-auto py-10 px-6">
                        <div className="grid md:grid-cols-2 gap-5">
                            <CustomInput label="Email" inputType="text" placeholder="Type here" />
                            <CustomInput label="Password" inputType="password" placeholder="••••••" />
                        </div>

                        {/* Divider */}
                        <div className="py-5 text-center text-gray-500">OR</div>
                        <div className="flex items-center justify-center w-full gap-4">
                            <hr className="w-1/4 border-t-2 border-gray-400 opacity-50 inline-block" />
                            <span className="text-gray-700 font-medium">Login</span>
                            <hr className="w-1/4 border-t-2 border-gray-400 opacity-50 inline-block" />
                        </div>

                        {/* Social Login */}
                        <div className="flex justify-center py-6 items-center gap-2 md:gap-5">
                            <button className="bg-blue flex items-center gap-2 text-white px-3 md:px-7 py-2 rounded-lg hover:scale-105 transition-transform">
                                <GoogleIcon /> With Google
                            </button>
                            <button className="bg-black flex items-center gap-2 text-white px-3 md:px-7 py-2 rounded-lg hover:scale-105 transition-transform">
                                <AppleIcon /> With Apple
                            </button>
                        </div>

                        {/* Login Button */}
                        <div className="py-5 flex justify-center">
                            <Button label="Login" style="shadow-purple-400 shadow-sm !px-10 !py-2 text-lg" />
                        </div>
                    </div>
                </div>
            </Section>

            {/* Floating Ellipse Decoration */}
            <div className="absolute lg:block hidden right-2 bottom-1">
                <Image src={ellipse} alt="gradientcircle" height={200} width={200} />
            </div>
        </div>
    );
};

export default Login;
