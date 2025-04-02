'use client'
import React from 'react'
import bg from '/public/assets/bg-hero.svg'
import logo from '/public/assets/logo-white.svg'
import Image, { StaticImageData } from 'next/image'
import Heading from '../shared/common/heading'
import Section from '../shared/section'
import SubHeading from '../shared/common/sub-heading'

type Props = {}

const HeroSection = (props: Props) => {
    return (
        <div className=' min-w-full flex  w-full  gradientHero  items-center !bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(${(bg as StaticImageData).src})` }}>

            <Section>
                <div className="py-3 flex justify-center w-full ">
                    <Image src={logo} alt='' className='' />
                </div>
                <div className="xl:w-1/2 mx-auto lg:w-3/4  w-full xl:space-y-10 py-20 space-y-5">
                    <h2 className="text-base text-white text-center">The Bespoke Travel Agency</h2>
                    <Heading>Be the First to Know!
                        Sign Up for Early Access and Custom Itineraries.</Heading>
                    <SubHeading text='Our website is coming soon! Meanwhile, we’re here to help you plan the perfect custom itinerary, tailored just for you' />
                </div>
            </Section>
        </div>
    )
}

export default HeroSection