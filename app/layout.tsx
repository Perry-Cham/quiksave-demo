import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quicksave",
  description: "The official Website of Quicksave, a leading provider of high-quality meat products. Explore our wide range of delicious and premium meats, including chicken, pork, and processed options. Discover the perfect cuts for your culinary creations and experience the exceptional taste and quality that Quicksave is known for. Whether you're a home cook or a professional chef, our products are designed to elevate your cooking and satisfy your cravings. Visit our website to learn more about our offerings and find the perfect meat for your next meal.",
};

const NoNavPaths = ["/auth/signin", "/auth/signup"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar NoNavPaths={NoNavPaths} />
        {children}
      </body>
    </html>
  );
}
