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
const baseSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password is required" }),
});

let signInSchema = baseSchema;
let signUpSchema = baseSchema.extend({
  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),
});

type signInValues = z.infer<typeof signInSchema>;
type signUpValues = z.infer<typeof signUpSchema>;
type FormValues = signInValues & Partial<signUpValues>;

// ── Form Component ────────────────────────────────────────
export function LoginForm({
  className,
  type,
  ...props
}: React.ComponentProps<"form"> & {
  type: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = type === "signin" ? signInSchema : signUpSchema;
  const isSignIn = type === "signin";
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues:
      type === "signin"
        ? {
            email: "",
            password: "",
          }
        : {
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
    //   setIsSubmitting(true);

    if (type === "signin") {
      const { data, error } = await authClient.signIn.email(
        {
          ...values,
          callbackURL: "/admin",
          rememberMe: false,
        },
        {
          onError(context) {
            console.log(context);
            alert(context.error.statusText);
          },
        },
      );
    } else if (type === "signup") {
      const { data, error } = await authClient.signUp.email(
        {
          ...(values as signUpValues),
          callbackURL: "/admin",
        },
        {
          onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
          },
        },
      );
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Log in to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter Your email below to access your account
          </p>
        </div>

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

        {/*Submit */}
        <Field>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && "Submitting"}
            {isSignIn ? "Login" : "Sign Up"}
          </Button>
        </Field>

        <FieldSeparator />
        {/* 
        <Field>
          <FieldDescription className="text-center text-sm">
            Don't have an account?
            <a
              href="/auth/signup"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
          Sign up
            </a>
          </FieldDescription>
        </Field>
         */}
      </FieldGroup>
    </form>
  );
}
