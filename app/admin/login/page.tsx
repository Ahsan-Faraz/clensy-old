"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the correct login page
    router.replace("/protected");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007bff] mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    </div>
  );
}