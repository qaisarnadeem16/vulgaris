"use server";

import axiosInstance from "@/config/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAxiosError } from "axios";

export async function loginAction(email: string, password: string) {
  if (!email || !password) {
    return { error: "Please fill all fields" };
  }

  try {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });

    if (response.data.token) {
      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
      };
    }

    return { error: response.data?.message || "Login failed" };
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: error.response?.data?.message || "Invalid credentials" };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function verifyGoogleToken(token: string) {
  try {
    const response = await axiosInstance.get("/api/auth/check-token", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}


// actions/signup.ts
export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}


export const signupUser = async (payload: SignupPayload) => {
  try {
    const response = await axiosInstance.post("/api/auth/signup", payload);
    return response.data; // Axios parses JSON automatically
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Registration failed";
    throw new Error(message);
  }
};


export async function saveReportAction(email: string, simplified_conclusion: string, disclaimer: string, cost: number) {
  try {
    // Send a POST request to save the report
    const response = await axiosInstance.post("/api/auth/save-report", {
      email,
      simplified_conclusion,
      disclaimer,
      cost,
    });

    // Return the response data or a success message
    return { success: response.data?.message || "Report saved successfully" };
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: error.response?.data?.message || "Error saving report" };
    }
    return { error: "An unexpected error occurred" };
  }
}