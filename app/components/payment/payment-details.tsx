'use client'
import React, { useState } from 'react'
import SubHeading from '../shared/common/sub-heading'
import CustomInput from '../shared/common/custom-input'
import visa from '/public/assets/visacard.svg'
import paypal from '/public/assets/paypalcard.svg'
import mastercard from '/public/assets/master.svg'
import greendots from '/public/assets/greendots.svg'
import Image from 'next/image';

const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() + i).toString());
const countries = [
    { name: 'United States', code: 'us' },
    { name: 'Canada', code: 'ca' },
    { name: 'United Kingdom', code: 'gb' },
    { name: 'Germany', code: 'de' },
    { name: 'France', code: 'fr' },
];

const PaymentDetailsForm = () => {
    const [selectedMethod, setSelectedMethod] = useState('Visa');
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);

    return (
        <>
            <div className="bg-[#F4F7FA] my-28 relative py-10">
                <div className="absolute lg:block hidden right-0 bottom-0">
                    <Image src={greendots} alt="greendots" height={20} width={80} />
                </div>
                <div className="py-6">
                    <SubHeading text='Review your order details and choose a payment method below' styles='font-poppins font-semibold text-2xl' />
                </div>
                <div className="py-10 px-2">
                    <div className="bg-white shadow-lg rounded-xl max-w-5xl mx-auto p-8">
                        {/* Heading */}
                        <h1 className="text-xl font-semibold text-gray-800">Payment Information</h1>

                        <div className="grid md:grid-cols-12 grid-cols-1 gap-6 mt-6">
                            {/* Left: Payment Methods */}
                            <div className="md:col-span-4 col-span-12 md:group-1 group-2">
                                <h2 className="text-sm font-medium text-gray-600 mb-4">Select Payment Method</h2>
                                <div className="space-y-3">
                                    {['Visa', 'Mastercard', 'PayPal'].map((method, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedMethod(method)}
                                            className={`flex items-center justify-between w-full px-4 py-3 border rounded-lg transition ${selectedMethod === method ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <input type="radio" checked={selectedMethod === method} readOnly />
                                                <span className="text-gray-700">{method}</span>
                                            </div>
                                            {method === 'Visa' && <Image src={visa} alt="visa" width={40} height={20} className="cursor-pointer" />}
                                            {method === 'Mastercard' && <Image src={mastercard} alt="mastercard" width={40} height={20} className="cursor-pointer" />}
                                            {method === 'PayPal' && <Image src={paypal} alt="paypal" width={40} height={20} className="cursor-pointer" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Card Details */}
                            <div className="md:col-span-8 col-span-12 space-y-4">
                                <CustomInput label="Card Number" inputType="text" placeholder="000 000 000 000" />

                                <div className="grid md:grid-cols-2 gap-4">
                                    {/* Expiry Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-semiBlack">Expiry Date</label>
                                        <div className="flex py-2 space-x-2">
                                            <select className="w-full border-2 border-[#D9E1E7] rounded-lg px-4 py-4">
                                                <option>MM</option>
                                                {months.map((month) => (
                                                    <option key={month} value={month}>
                                                        {month}
                                                    </option>
                                                ))}
                                            </select>
                                            <select className="w-full border-2 border-[#D9E1E7] rounded-lg px-4 py-4">
                                                <option>YYYY</option>
                                                {years.map((year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* CVC/CVV */}
                                    <CustomInput label="CVC/CVV" inputType="text" placeholder="***" />
                                </div>

                                <CustomInput label="Cardholder's Name" inputType="text" placeholder="name" className="" />

                                <div className="grid md:grid-cols-2 gap-4">
                                    <CustomInput label="Postal Code" inputType="text" placeholder="zip code" />

                                    {/* Country Dropdown */}
                                    <div>
                                        <label className="block text-sm font-medium mb-3">Country</label>
                                        <div className="">
                                            <select
                                                className="w-full border-2 border-[#D9E1E7] rounded-lg px-4 py-4"
                                                value={selectedCountry.name}
                                                onChange={(e) =>
                                                    setSelectedCountry(countries.find((c) => c.name === e.target.value)!)
                                                }
                                            >
                                                {countries.map((country) => (
                                                    <option key={country.code} value={country.name}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button className="w-full mt-6 bg-buttonBg text-white py-3 rounded-lg text-lg shadow-md hover:bg-purple-700">
                                    Continue to confirmation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentDetailsForm