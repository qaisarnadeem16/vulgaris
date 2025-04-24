import Image from "next/image";
import React from "react";
import pricingicon from "/public/assets/pricingicon.svg";
import featuredicon from "/public/assets/featuredicon.svg";
import best from "/public/assets/best.svg";
import whitecheckcircle from "/public/assets/whitecheckcircle.svg";
import blackcheck from "/public/assets/blackcheck.svg";
import Link from "next/link";

interface PricingCardProps {
    title: string;
    price: string;
    period?: string;
    features: string[];
    buttonText: string;
    isSubscription?: boolean;
    isBestValue?: boolean;
    onclick: ()=>void;
}

const PricingCard: React.FC<PricingCardProps> = ({
    title,
    price,
    onclick,
    period,
    features,
    buttonText,
    isSubscription = false,
    isBestValue = false,
}) => {
    return (
        <div
            className={`relative w-full max-w-sm p-6 rounded-xl shadow-lg ${isSubscription
                ? "bg-gradient-to-br from-purple-900 to-indigo-900 text-white"
                : "bg-white text-gray-800"
                }`}
        >
            {/* Badge for Best Value */}
            {isBestValue && (
                <span className="absolute top-3 right-4 font-semibold px-2 py-1 rounded-full">
                    <Image src={best} alt="Best Value" width={40} height={0} />
                </span>
            )}

            {/* Icon */}
            <div className="mb-4 pt-4 text-center">
                <span
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${isSubscription ? "bg-indigo-700" : "bg-gray-200"
                        }`}
                >
                    <Image
                        src={isSubscription ? featuredicon : pricingicon}
                        alt="Plan Icon"
                        width={600}
                        height={0}
                    />
                </span>
            </div>

            {/* Title and Price */}
            <h3 className="text-xl text-center font-semibold mb-2">{title}</h3>
            <div className="text-4xl text-center font-bold mb-2">
                {price}
                {period && <span className="text-base font-normal">/{period}</span>}
            </div>
            {isSubscription ? <p className="text-sm text-center opacity-80 mb-4">Billed annually</p> : <p className="text-sm text-center opacity-80 mb-4">Single Report Analysis</p>}
            {/* Features */}
            <ul className="space-y-2 mb-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <Image
                            src={isSubscription ? whitecheckcircle : blackcheck}
                            alt="Check Icon"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        <span className="text-sm">{feature}</span>
                    </li>
                ))}
            </ul>

            {/* Button */}
                <button
                  onClick={onclick}
                    className={`w-full cursor-pointer py-3 rounded-full font-medium transition-colors ${isSubscription
                        ? "bg-white text-indigo-500 hover:bg-gray-100"
                        : " text-buttonBg border hover:bg-gray-300"
                        }`}
                >
                    {buttonText}
                </button>
        </div>
    );
};

export default PricingCard;
