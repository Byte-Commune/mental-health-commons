"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // for redirecting
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert(result.message || "Login successful!");
        // Redirect to dashboard or homepage after login
        router.push("/dashboard"); // change this route as needed
      } else {
        alert(result.error || "Login failed");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center" role="main">
      <section
        className="w-full max-w-sm space-y-4"
        aria-labelledby="login-heading"
      >
        <h1 id="login-heading" className="text-2xl font-bold">
          Login
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          aria-describedby="login-instructions"
        >
          <p id="login-instructions" className="sr-only">
            Please enter your email and password to sign in.
          </p>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              aria-required="true"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // email format check
                  message: "Enter a valid email",
                },
              })}
              disabled={loading}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              aria-required="true"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              disabled={loading}
            />
            {errors.password && (
              <p
                id="password-error"
                role="alert"
                className="text-sm text-red-800"
              >
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            aria-label="Sign in to your account"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </section>
    </main>
  );
}
