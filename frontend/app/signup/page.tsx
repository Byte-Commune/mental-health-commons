"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = (data: SignupFormData) => {
    console.log("Signup data:", data);
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          aria-describedby="signup-instructions"
        >
          <p id="signup-instructions" className="sr-only">
            Fill in your name, email, and password to create an account.
          </p>


          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              aria-required="true"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : "name-help"}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            <p id="name-help" className="sr-only">
              Your full name, at least 2 characters.
            </p>
            {errors.name && (
              <p id="name-error" role="alert" className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>


          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              aria-required="true"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : "email-help"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            <p id="email-help" className="sr-only">
              Example: name@example.com
            </p>
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
              aria-describedby={
                errors.password ? "password-error" : "password-help"
              }
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <p id="password-help" className="sr-only">
              Must be at least 6 characters long.
            </p>
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
            aria-label="Create your account"
          >
            Sign Up
          </Button>
        </form>
      </section>
    </main>
  );
}
