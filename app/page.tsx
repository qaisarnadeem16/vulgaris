'use client'

import ContactUs from "./components/home/contact-us";
import Footer from "./components/home/footer";
import HeroSection from "./components/home/hero-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ContactUs />
      <Footer />
    </>
  );
}
