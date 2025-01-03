/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess(null);
      return;
    }

    setIsLoading(true);
    try {
      // Implement your password reset API call here
      const response = await fetch("api/auth/forget-password/reqest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

if(data){
      setError(null);
      setSuccess("Password reset link has been sent to your email address.");
      setEmail("");
}
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
        <p className="text-gray-600 mt-2">
          Enter your email to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        {success && <div className="text-blue-500 text-sm mt-2">{success}</div>}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-md  focus:outline-none focus:ring-2  focus:ring-offset-2"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>

        <div className="text-center mt-4">
          <a
            href="/signin"
            className="text-sm text-emerald-600 hover:text-emerald-500"
          >
            Back to Sign In
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;