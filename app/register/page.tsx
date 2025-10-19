"use client";
import { useEffect, useState } from "react";
import { SignupForm } from "@/components/signup-form";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: { role: string } = jwtDecode(token);
      if (decodedToken.role === "volunteer") {
        router.push("/volunteer-dashboard");
      } else if (decodedToken.role === "ngo") {
        router.push("/ngo-dashboard");
      } else {
        router.push("/dashboard");
      }
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
