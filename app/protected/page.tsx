"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@clensy.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Login timeout')), 10000) // 10 second timeout
      );

      const signInPromise = signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      const result = await Promise.race([signInPromise, timeoutPromise]) as any;

      if (result?.error) {
        setError("Invalid credentials. Please check your email and password.");
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        router.push("/admin");
      } else {
        setError("Login failed. Please try again.");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.message === 'Login timeout') {
        setError("Login is taking too long. Please check your connection and try again.");
      } else {
        setError("An error occurred during sign in. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image 
              src="https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069431/website-images/x50aedpsjrpfubhn0d8b.png" 
              alt="Clensy Logo" 
              width={140} 
              height={50} 
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-gray-600">Enter your credentials to access the dashboard</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
              placeholder="admin@clensy.com"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          {/* <div className="mb-6 p-3 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-600">
              <strong>Default credentials:</strong><br/>
              Email: admin@clensy.com<br/>
              Password: admin123
            </p>
          </div> */}

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white font-medium flex items-center justify-center ${
              isLoading ? "bg-[#007bff]/70 cursor-not-allowed" : "bg-[#007bff] hover:bg-[#0069d9]"
            } transition-colors`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}