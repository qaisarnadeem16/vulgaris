'use client'
import { StaticImageData } from 'next/image'
import React from 'react'
import payment from '/public/assets/payment-bg.svg'
import Heading from '../shared/common/heading'
import SubHeading from '../shared/common/sub-heading'
import PricingCard from './pricing-card'
import { BuyOneTime, BuySubscription } from '@/libs/payments'
import { useAuth } from '@/app/context/AuthContext'

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
    const { user } = useAuth();
   
    const handlePayment = async (type:string)=>{
        if(user)
        {
            if(type==="oneTime")
            {
                const response = await BuyOneTime(type,user?.email)
                window.location.href = response?.url;
            }
            else{
                const response = await BuySubscription(type,user?.email)
               // console.log("re",response)
                 window.location.href = response?.url;
            }
        }
    }
    


    return (
        <>
            <div className="relative min-h-screen bg-cover bg-center flex flex-col"
                style={{ backgroundImage: `url(${(payment as StaticImageData).src})` }}>
                <div className="flex flex-col justify-center pt-[10rem] items-center flex-grow">
                    <Heading className='font-poppins font-bold'>
                        Secure Payment - Almost Done!
                    </Heading>
                    <SubHeading text='One Last Step to Understand Your Medical Report' />
                </div>
                <div className="relative px-2 top-10">
                    <div className="flex pt-8 justify-center gap-6 flex-wrap">
                        <PricingCard
                            title="One-time Exam Analysis"
                            price="3€"
                            period="per exam"
                            onclick={()=>handlePayment("oneTime")}
                            features={oneTimeFeatures}
                            buttonText="Get started"
                            isSubscription={false}
                        />
                        <PricingCard
                            title="Subscription Plan"
                            price="29€"
                            period="weekly"
                            onclick={()=>handlePayment("subscription")}
                            features={subscriptionFeatures}
                            buttonText="Get started"
                            isSubscription={true}
                            isBestValue={true}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default HeroSection