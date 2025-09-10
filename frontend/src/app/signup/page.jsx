"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // import useRouter
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignupPage() {
  const [recapToken, setRecapToken] = useState("");
  const recaptchaRef = useRef(null); // create a ref for the recaptcha
  const router = useRouter(); // initialize router

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!recapToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    const payload = {
      ...data,
      recapToken,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert(result.message || "Registration successful!");
        router.push("/login"); // redirect to /login page after success
      } else {
        // On failure, reset the recaptcha widget and clear the token
        recaptchaRef.current.reset();
        setRecapToken("");
        alert(result.error || "Registration failed");
      }
    } catch (error) {
      alert("Network error: " + error.message);
      // Also reset the recaptcha in case of network error
      recaptchaRef.current.reset();
      setRecapToken("");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center" role="main">
      <section
        className="w-full max-w-sm space-y-4"
        aria-labelledby="signup-heading"
      >
        <h1 id="signup-heading" className="text-2xl font-bold">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={(token) => setRecapToken(token)}
            ref={recaptchaRef} // attach ref here
          />

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </section>
    </main>
  );
}
