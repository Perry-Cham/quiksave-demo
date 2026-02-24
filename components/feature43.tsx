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
function product_card(imageUrl: string, product_name: string) {
   const product_card_styles =
    "h-[400px] w-[320px] flex items-center justify-center bg-cover bg-center rounded-md overflow-hidden";
    const overlay_styles = "bg-black/50 h-full w-full flex items-center justify-center";
  return (<div className={`${product_card_styles}`} style={{ backgroundImage: `url(${imageUrl})` }}>
  <div className={overlay_styles}>
    <a className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors cursor-pointer" href={`/products/${product_name}`}>
      View Products
    </a>
  </div>
</div>
  );
}
const Feature43 = ({
  title = "Our Products",
  buttonText = "Get Started",
  buttonUrl = "https://shadcnblocks.com",
  className,
}: Feature43Props) => {
 const product_card_images = [
  "https://ik.imagekit.io/ypgvaedes/Quicksave/Aesthetic_Photos/TBone5_900x600.webp",
  "https://ik.imagekit.io/ypgvaedes/Quicksave/Aesthetic_Photos/Chicken%20header.webp","https://ik.imagekit.io/ypgvaedes/Quicksave/Aesthetic_Photos/Pork-chops.webp",
  'https://ik.imagekit.io/ypgvaedes/Quicksave/Aesthetic_Photos/meat_counter_in_the_supermarket_1190595804.jpg'
 ]
 const product_names = [
  "beef",
  "chicken",
  "pork",
  "processed"
 ]
  return (
    <section className={cn("py-32 md:px-20", className)}>
      <div className="">
        {title && (
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-4xl font-medium text-pretty lg:text-5xl">
              {title}
            </h2>
          </div>
        )}
        <div className="">      
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {product_card_images.map((imageUrl, i) => (
            product_card(imageUrl, product_names[i])
           ))}
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
