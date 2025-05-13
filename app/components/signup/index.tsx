"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import bitmap from "/public/assets/bitmap.svg";
import bg from "/public/assets/login-bg.svg";
import dots from "/public/assets/dots.svg";
import ellipse from "/public/assets/ellipse.svg";
import gradientellipse from "/public/assets/gradientellipse.svg";
import Section from "../shared/section";
import CustomInput from "../shared/common/custom-input";
import Button from "../shared/common/custom-btn";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { signupUser } from "@/actions/auth-actions/auth-actions";

// Define the structure of form data
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}

// Define the structure of errors
interface FormErrors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreed: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const { login, user } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormErrors> = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreed) newErrors.agreed = "You must agree to the terms";

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // try {
    //   const response = await fetch("http://localhost:8000/api/auth/signup", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log("Registration success:", data);
    //     login(data.user.email, data.token);
    //     router.push("/upload");
    //   } else {
    //     const error = await response.json();
    //     alert(error.message || "Registration failed");
    //   }
    // } catch (err) {
    //   alert("Something went wrong. Please try again.");
    // } 
    try {
      const data = await signupUser(formData);
      console.log("Registration success:", data);
      login(data.user.email, data.token);

      if (!user?.paidOneTime && !user?.isSubscribed) {
        router.push("/payment");
        return;
      } else {
        router.push("/upload");

      }
    } catch (err: any) {
      alert(err.message);
    }

    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${(bitmap as StaticImageData).src})` }}
    >
      <div className="absolute left-0 lg:block hidden top-7">
        <Image
          src={gradientellipse}
          alt="gradientcircle"
          height={200}
          width={200}
          priority
        />
      </div>

      <Section>
        <div className="relative">
          <Link
            href={"/"}
            className="cursor-pointer hover:underline hover:text-buttonBg"
          >
            Back to Home
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto w-full">
          <div
            className="w-full bg-cover py-6 flex items-center justify-between px-10 text-center text-white font-poppins font-bold text-[22px]"
            style={{ backgroundImage: `url(${(bg as StaticImageData).src})` }}
          >
            Register Account
            <div className="relative group">
              <Link href="/login">
                <Image
                  src={dots}
                  alt="dots"
                  height={40}
                  width={40}
                  className="cursor-pointer"
                />
              </Link>
              <span
                className="absolute -top-10 left-0 md:left-1/2 transform -translate-x-1/2 whitespace-nowrap 
                                bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Already have account login
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto py-10 px-6">
            <div className="grid grid-cols-1 gap-5">
              <CustomInput
                label="Username"
                inputType="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Type here"
                error={errors.username}
              />

              <CustomInput
                label="Email"
                inputType="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Type here"
                error={errors.email}
              />

              <CustomInput
                label="Password"
                inputType="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
                error={errors.password}
              />

              <CustomInput
                label="Confirm Password"
                inputType="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••"
                error={errors.confirmPassword}
              />
            </div>

            <div className="flex items-center gap-2 mt-5">
              <input
                type="checkbox"
                id="terms"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 rounded-md cursor-pointer"
              />
              <label htmlFor="terms" className="text-[#809FB8] text-sm">
                I agree to the{" "}
                <Link href="/terms" className="hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>
            {errors.agreed && (
              <div className="text-xs text-error mt-2">{errors.agreed}</div>
            )}


            <div className="py-5 flex justify-center">
              <Button
                label={isSubmitting ? "Registering..." : "Register"}
                type="submit"
                disabled={isSubmitting}
                style="shadow-purple-400 shadow-sm !px-10 !py-2 text-lg"
              />
            </div>
            <div className="text-center py-3">
              Already have an account?{" "}
              <Link
                className="hover:text-purple-800 underline font-medium"
                href="/login"
              >
                Login
              </Link>{" "}
              here
            </div>
          </form>
        </div>
      </Section>

      <div className="absolute lg:block hidden right-2 bottom-1">
        <Image src={ellipse} alt="gradientcircle" height={200} width={200} />
      </div>
    </div>
  );
};

export default Register;
