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
import { GreenHeart } from '@/app/svg';
import { BsDownload } from 'react-icons/bs';

const Analysis = () => {
    return (
        <div className="relative min-h-screen bg-cover bg-center flex flex-col"
            style={{ backgroundImage: `url(${(bitmap as StaticImageData).src})` }}>
            <div className="absolute lg:block hidden left-0 top-0">
                <Image src={purpledots} alt="purpledots" height={20} width={80} />
            </div>
            <div className="absolute left-0 top-7">
                <Image src={gradientellipse} alt="gradientcircle" height={200} width={200} priority />
            </div>
            <div className=" flex justify-center pt-20 items-center flex-grow">
                <Section>
                    <div className="">

                        {/* Header Section */}
                        <div className="space-y-6">

                            <Heading className='font-poppins font-bold md:text-5xl'>
                                AI Analysis Completed!
                            </Heading>
                            <SubHeading text='Here is your AI-powered health analysis based on your uploaded report.' styles='font-poppins' />

                            <div className=" p-6 max-w-md mx-auto font-poppins text-white rounded-xl flex flex-col items-center text-center bg-buttonBg space-y-4">
                                <GreenHeart />
                                <div className="space-y-1">
                                    <h1 className='font-semibold text-2xl'>Disease Type 2</h1>
                                    <h1>Blood Glucose Test - Uploaded on </h1>
                                    <h1>March 29, 2025</h1>
                                </div>
                                <h1 className='font-medium'>AI Analysis Confidence: <span className='text-[#D80027]'>95%</span></h1>
                            </div>
                        </div>
                        <div className="py-5 flex justify-center">
                            <button className="shadow-purple-400 flex items-center gap-2 text-white rounded-md !bg-[#D80027] shadow-sm px-7 py-3 text-lg">
                                Download Report   <BsDownload />
                            </button>

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

export default Analysis