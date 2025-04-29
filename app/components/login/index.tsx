"use client";
import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import bitmap from "/public/assets/bitmap.svg";
import bg from "/public/assets/login-bg.svg";
import dots from "/public/assets/dots.svg";
import ellipse from "/public/assets/ellipse.svg";
import gradientellipse from "/public/assets/gradientellipse.svg";
import Section from "../shared/section";
import CustomInput from "../shared/common/custom-input";
import { AppleIcon } from "@/app/svg";
import Button from "../shared/common/custom-btn";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLogin from "../../components/googlelogin/GoogleLogin";
import { useAuth } from "@/app/context/AuthContext";
import {
  loginAction,
  verifyGoogleToken,
} from "@/actions/auth-actions/auth-actions";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingGoogleAuth, setProcessingGoogleAuth] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) {
      console.log("Processing Google login");
      // const handleGoogleLogin = async () => {
      //   try {
      //     const verifyResponse = await verifyGoogleToken(token);

      //     if (verifyResponse && verifyResponse.ok) {
      //       const success = await login(email, token);
      //       if (success) {
      //         const newUrl = window.location.pathname;
      //         window.history.replaceState({}, document.title, newUrl);
      //         router.push("/upload");
      //       }
      //     }

      //   } catch (error) {
      //     console.error("Google login failed:", error);
      //   }
      // };

      const handleGoogleLogin = async () => {
        try {
          console.log("Google login token details:", {
            tokenLength: token?.length || 0,
            tokenPrefix: token ? token.substring(0, 20) + "..." : "none",
            tokenParts: token ? token.split(".").length : 0,
            email,
          });

          console.log("Sending token for verification...");

          try {
            if (token && token.split(".").length === 3) {
              const [header, payload] = token.split(".");
              const decodedHeader = JSON.parse(atob(header));
              const decodedPayload = JSON.parse(atob(payload));
              console.log("Token contents (for debugging):", {
                header: decodedHeader,
                payload: {
                  ...decodedPayload,
                  id: decodedPayload.id ? "exists" : "missing",
                  email: decodedPayload.email ? "exists" : "missing",
                  exp: decodedPayload.exp
                    ? new Date(decodedPayload.exp * 1000).toISOString()
                    : "missing",
                },
              });
            }
          } catch (e) {
            console.error("Failed to decode token:", e);
          }

          const verification = await verifyGoogleToken(token);

          console.log("Token verification result:", verification);

          if (!verification?.ok) {
            console.error("Token verification failed:", verification);
            throw new Error(verification?.message || "Invalid token");
          }

          if (verification && verification.ok) {
            const success = await login(email, token);
            if (success) {
              const newUrl = window.location.pathname;
              window.history.replaceState({}, document.title, newUrl);
              router.push("/upload");
            }
          }
        } catch (error: any) {
          console.error("Google login failed with error:", error);
          setProcessingGoogleAuth(false);
          alert(`Google login failed: ${error.message}. Please try again.`);
        }
      };
      handleGoogleLogin();
    }
  }, [searchParams, router, login]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Invalid email address";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await loginAction(email.trim(), password.trim());

      if (response.error) {
        throw new Error(response.error);
      }

      // Save token and email in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("userEmail", response.user.email);

      // Optionally update auth context
      login(response.user.email, response.token);

      router.push("/upload");
    } catch (err: any) {
      console.error("Login error:", err);
      alert(err.message || "An error occurred during login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "email" | "password"
  ) => {
    if (field === "email") {
      setEmail(e.target.value);
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    } else if (field === "password") {
      setPassword(e.target.value);
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${(bitmap as StaticImageData).src})` }}
    >
      <div className="absolute lg:block hidden left-2 top-7">
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
          {/* Header Section */}
          <div
            className="w-full bg-cover py-6 flex items-center justify-between px-10 text-center text-white font-poppins font-bold text-[22px]"
            style={{ backgroundImage: `url(${(bg as StaticImageData).src})` }}
          >
            Login Account
            <div className="relative group">
              <Link href="/signup">
                <Image
                  src={dots}
                  alt="dots"
                  height={40}
                  width={40}
                  className="cursor-pointer"
                />
              </Link>
              <span
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap 
                                bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Register Your Self
              </span>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleLogin} className="max-w-lg mx-auto py-10 px-6">
            {processingGoogleAuth && (
              <div className="text-center mb-4 p-3 bg-blue-100 text-blue-800 rounded-md">
                Processing Google login, please wait...
              </div>
            )}

            <div className="grid md:grid-cols-1 gap-5">
              <CustomInput
                label="Email"
                inputType="text"
                placeholder="Type here"
                value={email}
                onChange={(e) => handleInputChange(e, "email")}
                error={errors.email}
              />
              <CustomInput
                label="Password"
                inputType="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => handleInputChange(e, "password")}
                error={errors.password}
              />
              <div className="py-5 flex justify-center">
                <Button
                  label={isSubmitting ? "Logging in..." : "Login"}
                  type="submit"
                  disabled={isSubmitting}
                  style="shadow-purple-400 shadow-sm !px-10 !py-2 text-lg"
                />
              </div>
            </div>

            <div className="py-5 text-center text-gray-500">OR</div>
            <div className="flex items-center justify-center w-full gap-4">
              <hr className="w-1/4 border-t-2 border-gray-400 opacity-50 inline-block" />
              <span className="text-gray-700 font-medium">Login</span>
              <hr className="w-1/4 border-t-2 border-gray-400 opacity-50 inline-block" />
            </div>

            <div className="flex justify-center py-6 items-center gap-2 md:gap-5">
              <GoogleLogin />
              {/* <button
                type="button"
                className="bg-black flex items-center gap-2 text-white px-3 md:px-7 py-2 rounded-lg hover:scale-105 transition-transform"
              >
                <AppleIcon /> With Apple
              </button> */}
            </div>

            <div className="text-center py-3">
              Don't have account{" "}
              <Link
                className="hover:text-purple-800 underline font-medium"
                href={"/signup"}
              >
                SignUp
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

export default Login;
