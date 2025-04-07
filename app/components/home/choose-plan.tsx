import React from 'react'
import Section from '../shared/section'
import Heading from '../shared/common/heading'
import SubHeading from '../shared/common/sub-heading'
import PricingCard from '../payment/pricing-card'
import Image, { StaticImageData } from 'next/image'
import bg from '/public/assets/plan-bg.svg'

const ChoosePlan = () => {
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
    return (
        <div className='min-w-full py-5 flex  w-full items-center  !bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(${(bg as StaticImageData).src})` }}>
            <Section>
                <div className="py-20">
                    <Heading className="font-poppins font-bold">Choose Your Plan</Heading>

                    <SubHeading
                        styles="max-w-lg mx-auto text-[19px] font-normal text-semiBlack font-poppins"
                        text="Affordable, Transparent Pricing for Exam Analysis"
                    />

                    <div className=" py-12">
                        <div className="flex pt-8 justify-center gap-6 flex-wrap">
                            <PricingCard
                                title="One-time Exam Analysis"
                                price="3€"
                                period="per exam"
                                features={oneTimeFeatures}
                                buttonText="Get started"
                                isSubscription={false}
                            />
                            <PricingCard
                                title="Subscription Plan"
                                price="29€"
                                period="weekly"
                                features={subscriptionFeatures}
                                buttonText="Get started"
                                isSubscription={true}
                                isBestValue={true}
                            />
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}

export default ChoosePlan