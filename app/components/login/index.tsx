'use client';
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
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
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!email) newErrors.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email address';

        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return; // Only proceed if validation passes

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login success:', data);
                router.push('/upload');
            } else {
                const error = await response.json();
                alert(error.message || 'Login failed');
            }
        } catch (err) {
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'email' | 'password') => {
        if (field === 'email') {
            setEmail(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, email: '' })); // Clear email error on change
        } else if (field === 'password') {
            setPassword(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, password: '' })); // Clear password error on change
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${(bitmap as StaticImageData).src})` }}>
            <div className="absolute lg:block hidden left-2 top-7">
                <Image src={gradientellipse} alt="gradientcircle" height={200} width={200} />
            </div>

            <Section>
                <div className="relative">
                    <Link href={'/'} className="cursor-pointer hover:underline hover:text-buttonBg">
                        Back to Home
                    </Link>
                </div>
                <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto w-full">
                    {/* Header Section */}
                    <div className="w-full bg-cover py-6 flex items-center justify-between px-10 text-center text-white font-poppins font-bold text-[22px]"
                        style={{ backgroundImage: `url(${(bg as StaticImageData).src})` }}>
                        Login Account
                        <div className="relative group">
                            <Link href="/signup">
                                <Image src={dots} alt="dots" height={40} width={40} className="cursor-pointer" />
                            </Link>
                            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap 
                                bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                Register Your Self
                            </span>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleLogin} className="max-w-lg mx-auto py-10 px-6">
                        <div className="grid md:grid-cols-2 gap-5">
                            <CustomInput
                                label="Email"
                                inputType="text"
                                placeholder="Type here"
                                value={email}
                                onChange={(e) => handleInputChange(e, 'email')}
                                error={errors.email}
                            />
                            <CustomInput
                                label="Password"
                                inputType="password"
                                placeholder="••••••"
                                value={password}
                                onChange={(e) => handleInputChange(e, 'password')}
                                error={errors.password}
                            />
                        </div>

                        <div className="py-5 text-center text-gray-500">OR</div>
                        <div className="flex items-center justify-center w-full gap-4">
                            <hr className="w-1/4 border-t-2 border-gray-400 opacity-50 inline-block" />
                            <span className="text-gray-700 font-medium">Login</span>
                            <hr className="w-1/4 border-t-2 border-gray-400 opacity-50 inline-block" />
                        </div>

                        <div className="flex justify-center py-6 items-center gap-2 md:gap-5">
                            <button className="bg-blue flex items-center gap-2 text-white px-3 md:px-7 py-2 rounded-lg hover:scale-105 transition-transform">
                                <GoogleIcon /> With Google
                            </button>
                            <button className="bg-black flex items-center gap-2 text-white px-3 md:px-7 py-2 rounded-lg hover:scale-105 transition-transform">
                                <AppleIcon /> With Apple
                            </button>
                        </div>

                        <div className="py-5 flex justify-center">
                            <Button
                                label={isSubmitting ? 'Logging in...' : 'Login'}
                                type="submit"
                                disabled={isSubmitting}
                                style="shadow-purple-400 shadow-sm !px-10 !py-2 text-lg"
                            />
                        </div>
                        <div className="text-center py-3">
                            Don't have account <Link className='hover:text-purple-800 underline font-medium' href={'/signup'}>SignUp</Link> here
                        </div>
                    </form>
                </div>
            </Section>

            <div className="absolute lg:block hidden right-2 bottom-1">
                <Image src={ellipse} alt="gradientcircle" height={200} width={200} />
            </div>
        </div>
    );
};

export default Login;
