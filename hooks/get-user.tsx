"use client";

import { useState, useEffect } from "react";
import { getSession } from "./get-session";

export const getUser = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const fetchUserData = async () => {
    setLoading(true);

    try {
      const session = await getSession();
      if (!session) {
        setError("Failed to fetch user data");
        return;
      }
      if (session?.data) {
        setData(session.data);
      } else {
        setError(session.error || "Failed to fetch user data");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { data, error, loading };
};
