'use client';

import { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import payment from '/public/assets/payment-bg.svg';
import Heading from '../shared/common/heading';
import SubHeading from '../shared/common/sub-heading';
import PricingCard from './pricing-card';
import { BuyOneTime, BuySubscription } from '@/libs/payments';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '../shared/common/custom-btn';

const oneTimeFeatures = [
    "One comprehensive AI analysis",
    "GPT-4.5-powered insights",
    "Downloadable PDF summary",
    "No Subscription Required",
    "Discount Code Support",
];

const subscriptionFeatures = [
    "Unlimited Exam Analysis",
    "Save 50%+ Compared to Per-Use",
    "Break-even at just 5 reports/week",
    "Auto-renews Weekly",
    "Basic chat and email support",
];

const HeroSection = () => {
    const [voucherCode, setVoucherCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const handlePayment = async (type: string) => {
        if (!user) {
            router.push("/signup");
            return;
        }

        try {
            setIsLoading(true);
            if (type === "oneTime") {
                const response = await BuyOneTime(type, user.email);
                window.location.href = response?.url;
            } else {
                const response = await BuySubscription(type, user.email);
                window.location.href = response?.url;
            }
        } catch (error) {
            console.error("Payment error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVoucher = async () => {
        if (!user) {
            router.push("/signup");
            return;
        }

        if (!voucherCode.trim()) {
            alert("Please enter a voucher code.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await BuyOneTime("oneTime", user.email, voucherCode);
            window.location.href = response?.url;
        } catch (error) {
            console.error('Voucher apply failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen pt-10 bg-cover bg-center flex flex-col"
            style={{ backgroundImage: `url(${(payment as StaticImageData).src})` }}
        >
            <div className="flex flex-col justify-center pt-10 items-center flex-grow">
                <Heading className="font-poppins font-bold">
                    Secure Payment - Almost Done!
                </Heading>
                <SubHeading text="One Last Step to Understand Your Medical Report" />
            </div>

            {/* Voucher Input */}
            <div className="flex items-center justify-center py-5 px-5  max-w-2xl mx-auto gap-5 ">
                <div className=" mx-auto w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Use Voucher Code
                    </label>
                    <input
                        type="text"
                        placeholder="Enter voucher code"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className="w-full px-10 py-3 rounded-full border border-[#52469E] focus:outline-none"
                    />
                </div>

                <div className="text-center flex justify-center pt-7">
                    <Button
                        label={isLoading ? "Processing..." : "Use"}
                        style="shadow-purple-400 !rounded-full shadow-sm !px-10 !py-2 text-lg"
                        onClick={handleVoucher}
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div className="py-2 text-center text-gray-500">OR</div>

            <div className="relative px-2">
                <div className="flex pt-8 justify-center gap-6 flex-wrap">
                    <PricingCard
                        title="One-time Exam Analysis"
                        price="3€"
                        period="per exam"
                        onclick={() => handlePayment("oneTime")}
                        features={oneTimeFeatures}
                        buttonText="Get started"
                        isSubscription={false}
                    />
                    <PricingCard
                        title="Subscription Plan"
                        price="29€"
                        period="weekly"
                        onclick={() => handlePayment("subscription")}
                        features={subscriptionFeatures}
                        buttonText="Get started"
                        isSubscription={true}
                        isBestValue={true}
                    />
                </div>
            </div>
        
        </div>
    );
};

export default HeroSection;
