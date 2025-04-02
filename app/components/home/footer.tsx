'use client'
import React from 'react'
import bg from '/public/assets/bg-footer.svg'
import logo from '/public/assets/logo-white.svg'
import Image, { StaticImageData } from 'next/image'
import Heading from '../shared/common/heading'
import Section from '../shared/section'
import SubHeading from '../shared/common/sub-heading'
import { Location, Mail, Phone } from '@/app/svg'

type Props = {}

const Footer = (props: Props) => {
    const data = [
        { title: "Phone", content: "+1 (800) 123-4567", svg: <Phone /> },
        { title: "Email", content: "contact@yourescapeagency.com ", svg: <Mail /> },
        { title: "Office", content: "23 Luxury Lane, Travel City, World ", svg: <Location /> },
    ]
    return (
        <div className=' min-w-full flex  w-full  gradient   flex-col justify-between bg-bottom  bg-no-repeat !bg-cover'
            style={{ backgroundImage: `url(${(bg as StaticImageData).src})` }}
        >

            <Section>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:pb-60 justify-between lg:px-12  grid-cols-1 gap-5 py-10">
                    {data.map((item, i) => (
                        <div className="flex gap-4 items-center ">
                            {item.svg}
                            <div className="flex flex-col gap-1">
                                <p className="text-xl font-normal font-alice text-white">{item.title}</p>
                                <p className="text-sm font-[300]  text-[#F9F6EE]">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </Section>

            <div className="py-3 flex justify-center w-full   ">
                <Image src={logo} alt='' className='' />
            </div>
        </div>
    )
}

export default Footer