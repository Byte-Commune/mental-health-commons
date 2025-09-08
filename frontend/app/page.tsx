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
    <div className="flex min-h-screen items-center justify-center"> 
      <div className="w-full max-w-sm space-y-4"> 
        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required", 
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, //email format checkar
                  message: "Enter a valid email",   //error msg
                },
              })}
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6, //min value of the password
                  message: "Password must be at least 6 characters",  //error message
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-800">{errors.password.message}</p> 
            )}
          </div>


          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
