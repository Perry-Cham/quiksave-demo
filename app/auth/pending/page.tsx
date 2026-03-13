import { GalleryVerticalEnd, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PendingPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            QuickSave
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold">Account Created</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Your account has been successfully created and is now pending approval.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg border border-border">
                <p className="text-sm font-medium mb-2">What's Next?</p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Our team will review your account</li>
                  <li>You'll receive an email once approved</li>
                  <li>You can then sign in to your account</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-sm text-center text-muted-foreground">
                  Once your account is approved, you'll be able to sign in.
                </p>
                <Link href="/auth/signin">
                  <Button variant="outline" className="w-full">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        {/* Background image or content */}
      </div>
    </div>
  );
}
