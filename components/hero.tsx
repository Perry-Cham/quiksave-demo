import { ArrowUpRight, CirclePlay, Phone } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-(--breakpoint-xl) gap-12 px-6 py-12 lg:grid-cols-2 lg:py-0">
        <div className="my-auto">
          <h1 className="mt-6 max-w-[17ch] font-semibold text-4xl leading-[1.2]! tracking-[-0.035em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
            Welcome To QuickSave Meats
          </h1>
          <p className="mt-6 max-w-[60ch] text-foreground/80 text-lg">
            We're a company that hopes to meat your needs by providing
            high-quality meats at affordable prices. Our selection includes a
            variety of cuts and types of meat, all sourced from trusted
            suppliers to ensure freshness and flavor.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Button className="rounded-full text-base" size="lg">
              Contact Us <Phone className="ml-2 h-5 w-5" />
            </Button>
            <Button
              className="rounded-full text-base shadow-none"
              size="lg"
              variant="outline"
            >
              <CirclePlay className="h-5! w-5!" /> Learn More
            </Button>
          </div>
        </div>
        <div className="aspect-video w-full rounded-xl bg-accent lg:aspect-auto lg:h-screen lg:w-[1000px] lg:rounded-none" >
           <img
            className="object-cover"
            src="https://ik.imagekit.io/ypgvaedes/Quicksave/Aesthetic_Photos/garnished-steak-hero.jpg"
            alt=""
          />
         
        </div>
      </div>
    </div>
  );
}
