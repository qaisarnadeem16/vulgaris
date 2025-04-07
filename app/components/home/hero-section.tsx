'use client'
import React from 'react'
import bg from '/public/assets/hero-bg.svg'
import logo from '/public/assets/logo-white.svg'
import Image, { StaticImageData } from 'next/image'
import Heading from '../shared/common/heading'
import Section from '../shared/section'
import SubHeading from '../shared/common/sub-heading'
import Navbar from '../shared/navbar'
import Button from '../shared/common/custom-btn'

type Props = {}

const HeroSection = (props: Props) => {
    return (
        <div className="">
            <div className=' min-w-full flex  w-full items-center  !bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(${(bg as StaticImageData).src})` }}>

                <Section>
                    <div className="xl:w-4/5  mx-auto lg:w-3/4  w-full  py-32">
                        <Heading className='font-poppins pt-20 font-bold'>AI-Powered <span className='bg-gradient-to-r from-[#00B5FF] to-[#AD47DD] bg-clip-text text-transparent'>Exam Result Interpretation</span>
                            <br /> In Minutes</Heading>
                        <SubHeading styles='max-w-xl py-9 mx-auto font-normal font-poppins text-[19px]' text='Our AI cross-references thousands of medical studies to give you a personalized health report—so you can make informed decisions faster.' />

                        <div className="!flex !justify-center">
                            <Button label='Upload PDF'/>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    )
}

export default HeroSection