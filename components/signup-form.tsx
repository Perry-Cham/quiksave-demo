"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

// ── Schema ────────────────────────────────────────────────
const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password is required" }),
  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),
});

type FormValues = z.infer<typeof schema>
// ── Form Component ────────────────────────────────────────
export function LoginForm({
  className,
  type,
  ...props
}: React.ComponentProps<"form"> & {
  type: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignIn = type === "signin";
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues:{
            name: "",
            email: "",
            password: "",
          },
    mode: "onChange", // or "onSubmit" — your preference
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleFormSubmit = async (values: FormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
       const { data, error } = await authClient.signUp.email(
        {
          ...values,
          callbackURL: "/admin",
        },
        {
          onError(context) {
            alert(context.error.message);
          },
        },
      );
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter Your Details
          </p>
        </div>

        {/*Name*/}
  
          <Field>
            <FieldLabel htmlFor="name">User Name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Admin"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1.5">
                {errors.name.message}
              </p>
            )}
          </Field>
        

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            autoComplete="email"
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1.5">
              {errors.email.message}
            </p>
          )}
        </Field>

        {/* Password */}
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            {isSignIn && (
              <a
                href="#"
                className="text-sm text-muted-foreground hover:underline underline-offset-4"
              >
                Forgot your password?
              </a>
            )}
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive mt-1.5">
              {errors.password.message}
            </p>
          )}
        </Field>

        {/* Submit */}
        <Field>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && "Submitting"}
            {isSignIn ? "Login" : "Sign Up"}
          </Button>
        </Field>

        <FieldSeparator />

        <Field>
          <FieldDescription className="text-center text-sm">
            {isSignIn ? "Don't have an account? " : " Have an account? "}
            <a
              href={isSignIn ? "/auth/signup" : "/auth/signin"}
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              {isSignIn ? "Sign up" : "Login"}
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
