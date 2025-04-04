import Image, { StaticImageData } from 'next/image';
import React from 'react';
import bitmap from '/public/assets/bitmap.svg';
import purpledots from '/public/assets/purpledots.svg';
import ellipse from '/public/assets/ellipse.svg';
import gradientellipse from '/public/assets/gradientellipse.svg';
import Section from '../shared/section';
import Button from '../shared/common/custom-btn';
import Heading from '../shared/common/heading';
import SubHeading from '../shared/common/sub-heading';


const Upload = () => {
    return (
        <div className="relative min-h-screen bg-cover bg-center flex flex-col"
            style={{ backgroundImage: `url(${(bitmap as StaticImageData).src})` }}>
            <div className="absolute lg:block hidden left-0 top-0">
                <Image src={purpledots} alt="purpledots" height={20} width={80} />
            </div>
            <div className="absolute left-0 top-7">
                <Image src={gradientellipse} alt="gradientcircle" height={200} width={200} />
            </div>
            <div className=" flex justify-center pt-20 items-center flex-grow">
                <Section>
                    <div className="">

                        {/* Header Section */}
                        <div className="space-y-6">

                            <Heading className='font-poppins font-bold md:text-5xl'>
                                Upload & Analyze Your Medical Report
                            </Heading>
                            <SubHeading text='Powered by GPT-4.5 for accurate, instant insights' styles='font-poppins' />

                            <div className=" p-4 space-y-4">
                                <div className="flex items-center justify-center w-full gap-4">
                                    <hr className="w-32  hidden border-t-2 border-gray-400 opacity-50 md:inline-block" />
                                    <span className="text-gray-700 font-medium">Upload Your Lab Results or Medical Scan</span>
                                    <hr className="w-32 border-t-2 border-gray-400 opacity-50 hidden md:inline-block" />
                                </div>
                                {/* File Input with Drag & Drop */}
                                <div className="flex items-center max-w-md mx-auto rounded-full py-1  border border-[#52469E] space-x-4 px-2">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Drag & drop here"
                                            className="w-full px-4   focus:outline-none  focus:border-transparent placeholder-[#979797]"
                                        // readOnly
                                        />
                                    </div>
                                    <button className="bg-red-600 text-white px-6 py-1 rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200">
                                        Upload
                                    </button>
                                </div>

                                {/* Text Input */}
                                <div className='max-w-md mx-auto pt-7'>
                                    <label className="block text-sm font-poppins font-medium text-semiBlack mb-2">
                                        Tell me about your disease?
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="write here"
                                        className="w-full px-4 py-2 rounded-2xl  border border-[#52469E]  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="py-5 flex justify-center">
                            <Button label="Generate" style="shadow-purple-400 shadow-sm !px-10 !py-2 text-lg" />
                        </div>

                    </div>
                </Section>

                {/* Floating Ellipse Decoration */}
                <div className="absolute right-2 bottom-1">
                    <Image src={ellipse} alt="gradientcircle" height={200} width={200} />
                </div>
            </div>
        </div>
    )
}

export default Upload