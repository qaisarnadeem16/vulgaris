'use client'

import ChoosePlan from "./components/home/choose-plan";
import ContactUs from "./components/home/contact-us";
import HeroSection from "./components/home/hero-section";
import Works from "./components/home/works";
import Footer from "./components/shared/footer/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Works/>
      <ChoosePlan/>
      {/* <ContactUs /> */}
      <Footer />
    </>
  );
}
