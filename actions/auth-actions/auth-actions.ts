"use server";

import axiosInstance from "@/config/axios";
import { isAxiosError } from "axios";

interface LoginActionProps {
  email: string;
  password: string;
}

export const loginAction = async ({ email, password }: LoginActionProps) => {
  if (!email || !password) {
    throw new Error("Please fill all the fields");
  }

  try {
    const response = await axiosInstance.post(
      "/api/auth/log-in",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data.success) {
      return response.data;
    }

    return {
      success: false,
      error: response.data?.error || "Login failed",
    };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.error || "Invalid credentials",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
};
