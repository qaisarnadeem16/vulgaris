"use client";
import { GoogleIcon } from "@/app/svg";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) {
      router.replace("/");
    }
  }, [searchParams, router]);

  const handleGoogleLogin = () => {
    const clientId =
      "511465103962-nkrpa9jm2qcjmk2brcmd3scc3shfg4qt.apps.googleusercontent.com";
    const redirectUri = encodeURIComponent(
      "http://localhost:8000/api/auth/google/callback"
    );
    const scope = encodeURIComponent("email profile");

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-blue flex items-center gap-2 text-white px-3 md:px-7 py-2 rounded-lg hover:scale-105 transition-transform"
    >
      <GoogleIcon /> With Google
    </button>
  );
}
