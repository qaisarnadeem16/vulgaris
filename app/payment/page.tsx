import React from 'react'
import Footer from '../components/shared/footer/footer'
import Navbar from '../components/shared/navbar'
import HeroSection from '../components/payment/hero-section'
import PaymentDetailsForm from '../components/payment/payment-details'

const PaymentPage = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <PaymentDetailsForm />
            <Footer />
        </div>
    )
}

export default PaymentPage