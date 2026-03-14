import { cn } from "@/lib/utils";

interface Feature43Props {
  title?: string;
  buttonText?: string;
  buttonUrl?: string;
  className?: string;
}

interface ProductCard {
  imageUrl: string;
  name: string;
  label: string;
  description: string;
  slug: string;
  span?: string;
}

const products: ProductCard[] = [
  {
    imageUrl: "https://ik.imagekit.io/ypgvaedes/Quicksave/Aesthetic_Photos/TBone5_900x600.webp",
    name: "Beef",
    label: "Premium Cuts",
    description: "Aged to perfection. From ribeye to brisket.",
    slug: "beef",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    imageUrl: "https://ik.imagekit.io/ypgvaedes/Quicksave/Aesthetic_Photos/Chicken%20header.webp",
    name: "Chicken",
    label: "Farm Fresh",
    description: "Free-range, tender, and full of flavour.",
    slug: "chicken",
  },
  {
    imageUrl: "https://ik.imagekit.io/ypgvaedes/Quicksave/Aesthetic_Photos/Pork-chops.webp",
    name: "Pork",
    label: "Classic Staples",
    description: "Chops, ribs, and everything in between.",
    slug: "pork",
  },
  {
    imageUrl: "https://ik.imagekit.io/ypgvaedes/Quicksave/Aesthetic_Photos/meat_counter_in_the_supermarket_1190595804.jpg",
    name: "Processed",
    label: "Deli & Cured",
    description: "Sausages, deli meats, and artisan cuts.",
    slug: "processed",
    span: "lg:col-span-2",
  },
];

const Feature43 = ({
  title = "Our Products",
  buttonText = "View Full Catalogue",
  buttonUrl = "/products",
  className,
}: Feature43Props) => {
  return (
    <section className={cn("py-24 px-6 md:px-16 bg-white", className)}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
        <div>
          <p className="uppercase text-xs tracking-[0.2em] text-gray-400 mb-2">
            What We Offer
          </p>
          <h2 className="text-5xl font-bold text-black leading-tight">
            {title}
          </h2>
        </div>
        <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
          Sourced from trusted suppliers. Delivered with care. Browse our full
          range of premium meat products.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 h-auto lg:h-[680px]">
        {products.map((product) => (
          <a
            key={product.slug}
            href={`/products/${product.slug}`}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-gray-900 cursor-pointer",
              product.span
            )}
            style={{ minHeight: "280px" }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: `url(${product.imageUrl})` }}
            />

            {/* Gradient overlay — stronger at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/95 group-hover:via-black/50" />

            {/* Top label chip */}
            <div className="absolute top-4 left-4">
              <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs tracking-widest uppercase px-3 py-1 rounded-full">
                {product.label}
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-bold text-3xl mb-1">
                {product.name}
              </h3>
              <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {product.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-white text-black text-sm font-semibold px-5 py-2 rounded-full group-hover:bg-black group-hover:text-white border border-white transition-all duration-300">
                  View Products
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100 pt-10">
        <p className="text-gray-500 text-sm">
          Can't find what you're looking for?{" "}
          <a href="/contact" className="text-black font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity">
            Contact us directly.
          </a>
        </p>
        <a
          href={buttonUrl}
          className="inline-flex items-center gap-2 bg-black text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors duration-200"
        >
          {buttonText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export { Feature43 };