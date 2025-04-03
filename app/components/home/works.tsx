import React from "react";
import Section from "../shared/section";
import Heading from "../shared/common/heading";
import SubHeading from "../shared/common/sub-heading";
import { StepData } from "../../data";
import Image from "next/image";
import dotedline from "/public/assets/dotedline.svg";

const HowItWorks = () => {
    return (
        <div className="py-12">
            <Section>
                <div className="text-center">
                    <Heading className="font-poppins font-bold">How does it work?</Heading>

                    <SubHeading
                        styles="max-w-lg mx-auto text-[19px] font-normal text-semiBlack font-poppins"
                        text="How Our AI Transforms Your Medical Documents Into Actionable Health Insights in Just 3 Simple Steps"
                    />

                    <div className="py-10">
                        <div className="relative max-w-4xl  mx-auto grid lg:grid-cols-3 grid-cols-1 mt-8">
                            {StepData.map((step, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    {/* Circle with number */}
                                    <div
                                        className={`w-12 h-12 z-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${step.number === 1
                                                ? "bg-red-500"
                                                : step.number === 2
                                                    ? "bg-green-500"
                                                    : "bg-purple-500"
                                            }`}
                                    >
                                        {step.number}
                                    </div>
                                    {/* Text */}
                                    <div className="mt-4 font-poppins space-x-5 text-center">
                                        <h3 className="font-bold text-lg text-semiBlack">{step.title}</h3>
                                        <p className="text-semiBlack text-base mt-2">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                            {/* Continuous dotted line behind circles */}
                            <div className="absolute lg:block  top-7 left-32 w-full hidden transform -translate-y-1/2 z-0">
                                <Image
                                    src={dotedline}
                                    alt="Dotted line"
                                    width={600}
                                    height={0}
                                    className="object-fill"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default HowItWorks;