"use server";

import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import axiosInstance from "@/config/axios";
import { jwtDecode } from "jwt-decode";

interface SessionResponse {
  data: any | null; // Adjust type as per your API response structure
  error?: string;
}

export const getSession = async (
  defaultToken?: string
): Promise<SessionResponse> => {
  try {
    const cookieStore = cookies();
    const token =
      (cookieStore && (await cookieStore).get("token")?.value) ||
      defaultToken ||
      "";

    if (!token) {
      return { data: null, error: "Token not found" };
    }

    let user;
    try {
      user = jwtDecode(token);
    } catch (decodeError) {
      return { data: null, error: "Invalid token" };
    }

    const endpoint = "/api/users/profile"; // Define the correct endpoint for fetching session data
    const response = await axiosInstance.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return { data: response.data.body };
    } else {
      return {
        data: null,
        error: response.data.error || "Failed to fetch session",
      };
    }
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      return {
        data: null,
        error:
          err.response?.data?.error ||
          "Failed to fetch session due to server error",
      };
    } else {
      return {
        data: null,
        error: "An unexpected error occurred",
      };
    }
  }
};
