import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {

  return (
    <div className="min-h-svh flex items-center justify-center bg-neutral-50">
  
            <LoginForm type="signin" className=" px-6 py-8 rounded-lg w-[420px] shadow-lg bg-white"/>
         
    </div>
  )
}
