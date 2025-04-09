"use client";
import React from "react";
import Image from "next/image";
import Section from "../section"; // Assuming this is a custom wrapper component
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "@/app/svg";
import american from '/public/assets/american.svg'
import meta from '/public/assets/meta.svg'
import paypal from '/public/assets/paypal.svg'
import mastercard from '/public/assets/mastercard.svg'
import discover from '/public/assets/discover.svg'
import apay from '/public/assets/apay.svg'
import visa from '/public/assets/visa.svg'
import gpay from '/public/assets/gpay.svg'
import opay from '/public/assets/opay.svg'
import Link from "next/link";


const Footer = () => {
    return (
        <footer className="bg-white py-5">
            <Section>
                <div className="space-y-5 py-5">
                    {/* Left Section: Logo and Disclaimer */}
                    <div className="md:mb-0  flex  flex-row justify-between md:items-center text-gray-800">
                        <h3 className="text-2xl font-semibold">MediZen</h3>
                        <div className="flex items-center gap-5">
                            <Link href="#" aria-label="twitter">
                                <TwitterIcon />
                            </Link>
                            <Link href="#" aria-label="Facebook">
                                <FacebookIcon />
                            </Link>
                            <Link href="#" aria-label="Instagram">
                                <InstagramIcon />
                            </Link>
                            <Link href="#" aria-label="linkedin">
                                <LinkedInIcon />
                            </Link>
                        </div>
                    </div>

                    {/* Center Section: Navigation Links */}
                    <div className="flex flex-col md:flex-row justify-between font-poppins md:items-center text-semiBlack">
                        <p className="text-sm mt-2 max-w-sm">
                            AI insights are informational only— <br />not a substitute for professional <br /> medical diagnosis
                        </p>
                        <nav className="grid md:flex justify-center text-semiBlack grid-cols-2 gap-4 py-2">
                            <Link href="#" className="hover:text-gray-600">Home</Link>
                            <Link href="#" className="hover:text-gray-600">Pricing</Link>
                            <Link href="#" className="hover:text-gray-600">How It Works</Link>
                            <Link href="#" className="hover:text-gray-600">Contact Us</Link>
                        </nav>
                    </div>


                    {/* Right Section: Social Media Icons */}

                </div>

                {/* Bottom Section: Copyright and Payment Logos */}
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-4">
                    <p className="text-sm text-semiBlack">© 2025, All right reserved | MediZen</p>
                    <div className="grid grid-cols-5 md:grid-cols-12 gap-3  mt-2 md:mt-0">
                        <Image src={american} alt="american" width={40} height={20} className="cursor-pointer" />
                        <Image src={paypal} alt="paypal" width={40} height={20} className="cursor-pointer" />
                        <Image src={meta} alt="meta" width={40} height={20} className="cursor-pointer" />
                        <Image src={mastercard} alt="mastercard" width={40} height={20} className="cursor-pointer" />
                        <Image src={apay} alt="apay" width={40} height={20} className="cursor-pointer" />
                        <Image src={visa} alt="visa" width={40} height={20} className="cursor-pointer" />
                        <Image src={discover} alt="discover" width={40} height={20} className="cursor-pointer" />
                        <Image src={gpay} alt="gpay" width={40} height={20} className="cursor-pointer" />
                        <Image src={opay} alt="opay" width={40} height={20} className="cursor-pointer" />
                    </div>
                </div>
            </Section>
        </footer>
    );
};

export default Footer;