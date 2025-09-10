"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignupPage() {
 const [recapToken, setRecapToken] = useState(""); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!captchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }
    console.log("Signup data:", data, "captcha:", captchaToken);
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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
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
          />

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </section>
    </main>
  );
}
