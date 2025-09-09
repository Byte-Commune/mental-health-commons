"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("Form data:", data);
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
            />
            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="text-sm text-red-500"
              >
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
            aria-label="Sign in in youur account"
          >
            Sign In
          </Button>
        </form>
      </section>
    </main>
  );
}