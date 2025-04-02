'use client'
import React, { useState, ChangeEvent } from 'react';
import Section from '../shared/section';
import Heading from '../shared/common/heading';
import CustomInput from '../shared/common/custom-input';
import { ArrowDown } from '@/app/svg';

type Props = {};

const ContactUs: React.FC<Props> = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interests: '',
        message: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form data:', formData);
    };

    return (
        <div className='bg-[#2E2E2E]'>
            <Section>
                <div className="py-20 flex justify-center items-center">
                    <div className="xl:w-1/2 lg:w-3/4 w-full">
                        <div className="lg:w-3/5 mx-auto w-full py-5">
                            <Heading className="!lg:text-2xl !text-xl">
                                Sign Up for Exclusive Updates & Start Planning Your Dream Trip Today
                            </Heading>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full mx-auto text-white">
                            {/* Name Field */}
                            <div className="mb-4">
                                <CustomInput
                                    label="Your Name *"
                                    inputType="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Email Field */}
                            <div className="mb-4">
                                <CustomInput
                                    label="Your Email Address *"
                                    inputType="email"
                                    placeholder="example@gmail.com"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Travel Interests Field (Select Dropdown) */}
                            <div className="mb-4 relative">
                                <label className="block text-sm font-normal mb-1" htmlFor="interests">
                                    Your Travel Interests *
                                </label>
                                <select
                                    id="interests"
                                    name="interests"
                                    value={formData.interests}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3  bg-[#434242] focus:outline-none text-secondary appearance-none pr-10"
                                    required
                                >
                                    <option value="">Select your interest</option>
                                    <option value="Honeymoon">Honeymoon</option>
                                    <option value="Family Vacation">Family Vacation</option>
                                    <option value="Adventure Travel">Adventure Travel</option>
                                    <option value="Business Trip">Business Trip</option>
                                    <option value="Solo Travel">Solo Travel</option>
                                    <option value="Cultural Experience">Cultural Experience</option>
                                    <option value="Relaxation and Wellness">Relaxation and Wellness</option>
                                </select>
                                {/* Custom Arrow */}
                                <span className="absolute right-1 bottom-0 top-[2.6rem] transform -translate-y-1/2 pointer-events-none">
                                    <ArrowDown />
                                </span>
                            </div>

                            {/* Message Field */}
                            <div className="mb-4">
                                <label className="block text-sm font-normal mb-1" htmlFor="message">
                                    Any Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={8}
                                    placeholder="Any instructions or concerns..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded bg-[#434242] text-white placeholder-gray-500"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 mt-4 bg-transparent border border-primary text-primary hover:bg-yellow-500 hover:text-gray-900 transition duration-300"
                            >
                                Notify Me & Start Planning
                            </button>

                            {/* Footer Text */}
                            <p className="text-center text-secondary text-xs mt-4">
                                We're excited to bring you along as we prepare for launch! Start dreaming, and let us make your trip a reality now.
                            </p>
                        </form>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default ContactUs;
