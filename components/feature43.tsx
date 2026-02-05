import {
  BatteryCharging,
  GitPullRequest,
  Layers,
  RadioTower,
  SquareKanban,
  WandSparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature {
  heading: string;
  description: string;
  icon: React.ReactNode;
}

interface Feature43Props {
  title?: string;
  features?: Feature[];
  buttonText?: string;
  buttonUrl?: string;
  className?: string;
}

const Feature43 = ({
  title = "Our Products",
  features = [
    {
      heading: "Quality",
      description:
        "Built with attention to detail and best practices. Every component is thoroughly tested and follows modern React patterns for reliability and performance.",
      icon: <GitPullRequest className="size-6" />,
    },
    {
      heading: "Experience",
      description:
        "Crafted with user experience in mind. Each component is designed to be intuitive, accessible, and provide smooth interactions across all devices.",
      icon: <SquareKanban className="size-6" />,
    },
    {
      heading: "Support",
      description:
        "Comprehensive documentation and community support. Get help when you need it with detailed guides, examples, and active community assistance.",
      icon: <RadioTower className="size-6" />,
    },
    {
      heading: "Innovation",
      description:
        "Cutting-edge design patterns and modern web technologies. Stay ahead with the latest trends in UI/UX design and development practices.",
      icon: <WandSparkles className="size-6" />,
    },
    {
      heading: "Results",
      description:
        "Proven track record of successful implementations. These components have been battle-tested in real-world applications and deliver consistent results.",
      icon: <Layers className="size-6" />,
    },
    {
      heading: "Efficiency",
      description:
        "Optimized for performance and developer productivity. Lightweight, fast-loading components that help you build faster without compromising on quality.",
      icon: <BatteryCharging className="size-6" />,
    },
  ],
  buttonText = "More Features",
  buttonUrl = "https://shadcnblocks.com",
  className,
}: Feature43Props) => {
  const product_card_styles = "h-[400px] w-[340px] flex items-center justify-center border-2 border-black"
  return (
    <section className={cn("py-32 px-32", className)}>
      <div className="">
        {title && (
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-4xl font-medium text-pretty lg:text-5xl">
              {title}
            </h2>
          </div>
        )}
        <div className="">
          {/*features.map((feature, i) => (
            <div key={i} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.heading}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))*/}
          <div className="grid grid-cols-4">
            <div className={product_card_styles}>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                View Products
              </button>
            </div>
            <div className={product_card_styles}>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                View Products
              </button>
            </div>
            <div className={product_card_styles}>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                View Products
              </button>
            </div>
            <div className={product_card_styles}>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                View Products
              </button>
            </div>
           
          </div>
        </div>
        {buttonUrl && (
          <div className="mt-16 flex justify-center">
            <Button size="lg" asChild>
              <a href={buttonUrl}>{buttonText}</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export { Feature43 };
