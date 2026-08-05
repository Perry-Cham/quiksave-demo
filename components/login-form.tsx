"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { GalleryVerticalEnd, LoaderCircle } from "lucide-react";
import { useAuth } from "@/hooks/auth-hook";

// ── Schema ────────────────────────────────────────────────
const baseSchema = z.object({
  email: z.email({ message: "Please enter a valid email" }),
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
  const [modalState, setModalState] = useState({
    open: false,
    title: "",
    message: "",
  });
  const { signIn, signUp, isLoading, error } = useAuth();
  const schema = type === "signin" ? signInSchema : signUpSchema;
  const isSignIn = type === "signin";
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // or "onSubmit" — your preference
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;

  const handleFormSubmit = async (values: FormValues) => {
    if (type === "signin") {
      await signIn(values.email, values.password);
    } else if (type === "signup") {
      await signUp(values.email, values.password, values.name!);
    }
    if (error) {
      setModalState({ open: true, title: error.code, message: error.message });
    }
  };

  return (
    <>
      <form
        className={cn("flex flex-col space-y-8", className)}
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className="flex items-center justify-left space-x-4">
          <GalleryVerticalEnd className="size-5" />
          <h1 className="text-xl font-bold">Quicksave</h1>
        </div>
        <FieldGroup>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Sign In</h1>
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
              disabled={isLoading}
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
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer"
            >
              {isLoading && (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                  Logging You In...
                </>
              )}
              {!isLoading && (isSignIn ? "Login" : "Sign Up")}
            </Button>
          </Field>

          <FieldSeparator />
        </FieldGroup>
      </form>

      {
        <Dialog open={modalState.open}>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>{modalState.title}</DialogTitle>
            </DialogHeader>
            <DialogDescription>{modalState.message}</DialogDescription>
            <DialogFooter>
              <Button
                onClick={() => {
                  setModalState({ open: false, title: "", message: "" });
                }}
              >
                Close
              </Button>
              <Button>
                Back To Home
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    </>
  );
}
