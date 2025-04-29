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

// export async function verifyGoogleToken(token: string) {
//   try {
//     const response = await axiosInstance.get("/api/auth/check-token", {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return null;
//   }
// }

export async function verifyGoogleToken(token: string) {
  if (!token) {
    console.error("No token provided to verifyGoogleToken");
    return { ok: false, message: "No token provided" };
  }

  try {
    console.log("Token verification request details:", {
      endpoint: "/api/auth/check-token",
      headers: { Authorization: `Bearer ${token.substring(0, 15)}...` },
    });

    const requestConfig = {
      headers: { Authorization: `Bearer ${token}` },
      url: "/api/auth/check-token",
      method: "GET",
    };
    console.log("Full verification request config:", requestConfig);

    const response = await axiosInstance.get("/api/auth/check-token", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Token verification response:", {
      status: response.status,
      data: response.data,
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Token verification request failed:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });

      console.log("Trying fallback verification with fetch API...");
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const fetchResponse = await fetch(`${apiUrl}/api/auth/check-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const fetchData = await fetchResponse.json();
        console.log("Fetch fallback response:", {
          status: fetchResponse.status,
          ok: fetchResponse.ok,
          data: fetchData,
        });
      } catch (fetchError) {
        console.error("Fetch fallback also failed:", fetchError);
      }

      return {
        ok: false,
        message: error.response?.data?.message || "Token verification failed",
      };
    }

    console.error("Token verification unknown error:", error);
    return { ok: false, message: "Unknown error during token verification" };
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

export async function saveReportAction(
  email: string,
  simplified_conclusion: string,
  disclaimer: string,
  cost: number
) {
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
