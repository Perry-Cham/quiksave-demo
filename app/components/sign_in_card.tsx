"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const title = "Login Card";
interface Props{
  type:"login" | "signup",
  sendData:(data: {email: string, password: string, name?:string}) => void
}
interface account_data{
  email:string,
  password:string,
  name?:string
}
function Sign_In_Card({type, sendData}: Props){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

function handleSubmit(){
  const data: account_data = {
    email: email,
    password:password
  }
  if(type === "signup")data.name = name
  sendData(data)
}
  return (
    <Card className="md:w-[300px] max-w-sm">
      <CardHeader>
        <CardTitle>{type == "login" ? "Login to your account" : "Create an Account"}</CardTitle>
        <CardDescription>
          Enter your email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {type === "signup" && <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            type="text"
            value={name}
          />
        </div>}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
            type="email"
            value={email}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
         { type == "login" && <a className="text-sm hover:underline" href="#">
              Forgot your password?
            </a>}
          </div>
          <Input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
        </div>
        <Button onClick={handleSubmit} className="w-full bg-red-800 text-white">{
         type == "login" ? "Login" : "Create Account"
        }</Button>
      </CardContent>
     {type == "login" && <CardFooter className="flex justify-center">
        <p className="text-muted-foreground text-sm">
          Don't have an account?{" "}
          <a className="underline" href="/signup">
            Sign up
          </a>
        </p>
      </CardFooter>}
    </Card>
  );
};

export default Sign_In_Card
