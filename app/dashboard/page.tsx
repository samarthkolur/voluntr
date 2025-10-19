"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Wait until token is checked

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false); // Token exists, allow rendering
    }
  }, [router]);

  if (loading) {
    return <p>Loading...</p>; // Optional: show a loader while checking token
  }

  return (
    <div>
      <h1>Welcome to your dashboard</h1>
      <p>This page is protected by localStorage token.</p>
    </div>
  );
}
