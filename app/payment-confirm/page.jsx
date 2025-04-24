'use client';

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { IoIosCheckmarkCircle } from "react-icons/io";


export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/upload?up=${true}`); 
    }, 3000); 

    return () => clearTimeout(timer); // Clean up the timer if the component is unmounted
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-[75vh] bg-right bg-no-repeat bg-contain">
      <div className="flex flex-col justify-center items-center text-center">
        {/* Loader Icon */}
        <IoIosCheckmarkCircle color="green"  size={100}/>
        {/* Message Content */}
        <h1 className="text-2xl font-bold mt-4">Payment Successful</h1>
        <p className="text-lg text-gray-600 mt-2">Upload & Analyze Your Report...</p>
      </div>
    </div>
  );
}
