"use client";
import ChoosePlan from "./components/home/choose-plan";
import ContactUs from "./components/home/contact-us";
import HeroSection from "./components/home/hero-section";
import Works from "./components/home/works";
import Footer from "./components/shared/footer/footer";
import Navbar from "./components/shared/navbar";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Home() {
  const searchParams = useSearchParams();
  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (token && email) {
        console.log("Processing token login");
        const handleAuth = async () => {
          const success = await login(email, token);
          if (success) {
            console.log("Login success, redirecting to upload");
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
            router.push("/upload");
          }
        };
        handleAuth();
      }
    }
  }, [searchParams, login, user, isLoading, router]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <Works />
      <ChoosePlan />
      <Footer />
    </>
  );
}
