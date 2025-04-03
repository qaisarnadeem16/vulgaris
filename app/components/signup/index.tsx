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

const Register = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${(bitmap as StaticImageData).src})` }}>
            <div className="absolute left-0 lg:block hidden top-7">
                <Image src={gradientellipse} alt="gradientcircle" height={200} width={200} />
            </div>
            <Section>
                <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto w-full">

                    {/* Header Section */}
                    <div className="w-full bg-cover py-6 flex items-center justify-between px-10 text-center text-white font-poppins font-bold text-[22px]"
                        style={{ backgroundImage: `url(${(bg as StaticImageData).src})` }}>
                        Register Account
                        <div className="relative group">
                            {/* Link to Register Page */}
                            <Link href="/login">
                                <Image src={dots} alt="dots" height={40} width={40} className="cursor-pointer" />
                            </Link>

                            {/* Tooltip (Hidden by Default, Shows on Hover) */}
                            <span className="absolute -top-10 left-0 md:left-1/2 transform -translate-x-1/2 whitespace-nowrap 
            bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                Already have account login
                            </span>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="max-w-lg mx-auto py-10 px-6">
                        <div className="grid md:grid-cols-2 gap-5">
                            <CustomInput label="Username" inputType="text" placeholder="Type here" />
                            <CustomInput label="Email" inputType="text" placeholder="Type here" />
                            <CustomInput label="Password" inputType="password" placeholder="••••••" />
                            <CustomInput label="Confirm Password" inputType="password" placeholder="••••••" />
                        </div>


                        <div className="flex items-center gap-2 mt-5">
                            <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4 border-gray-300 rounded-md cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-[#809FB8] text-sm">
                                I agree to the{" "}
                                <Link href="/terms" className="hover:underline">
                                    Terms and Conditions
                                </Link>
                            </label>
                        </div>
                        {/* register Button */}
                        <div className="py-5 flex justify-center">
                            <Button label="Register" style="shadow-purple-400 shadow-sm !px-10 !py-2 text-lg" />
                        </div>
                    </div>
                </div>
            </Section>

            {/* Floating Ellipse Decoration */}
            <div className="absolute lg:block hidden right-2 bottom-1">
                <Image src={ellipse} alt="gradientcircle" height={200} width={200} />
            </div>
        </div>
    )
}

export default Register