import {
  BadgeCheck,
  ChartNoAxesCombined,
  Heart,
  HeartHandshake,
  Lightbulb,
  MoveRight,
  Shield,
  UsersRound,
  Truck,
  Users,
  Store,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Quicksave - Leading Meat Supplier in Zambia | Fresh & Processed Meat Products",
  description: "Learn about Quicksave, Zambia's premier meat supplier. Discover our mission to deliver high-quality, traceable fresh and processed meat products from farm to table, supporting local farmers and communities.",
  keywords: "Quicksave, meat supplier Zambia, fresh meat, processed meat, butchery, food safety, traceability, local sourcing, beef pork chicken",
  openGraph: {
    title: "About Quicksave - A Leading Meat Supplier in Zambia",
    description: "Building a better future for the meat industry in Zambia. High-quality fresh and processed meat products with strict safety and traceability standards.",
    siteName: "Quicksave",
    locale: "en_US",
    type: "website",
  }
};

function About_Page() {
  const values = [
    "Food Safety & Traceability",
    "Quality Butchery Craftsmanship",
    "Customer Focus (Retail & Corporate)",
    "Local Farmer Partnerships",
    "Responsible Growth",
    "Integrity & Accountability",
    "Community Commitment",
  ];

  const tabs_trigger_classes = "py-4 px-2 my-2";

  return (
    <main>
      {/* ── Section 1: Who We Are ── */}
      <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <img
              alt="Team collaborating in modern office"
              className="object-cover h-full w-full"
              sizes="(max-width: 768px) 100vw, 50vw"
              src="https://ik.imagekit.io/ypgvaedes/Quicksave/About_Page_Images/Staff%20Photo.jpg"
            />
          </div>

          <div>
            <div>
              <Badge variant="default" className="text-sm text-primary-foreground hover:bg-primary/90 mb-3 px-4">
                Who We Are
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight mb-4 capitalize">
                Building a better future for the meat industry in Zambia and beyond
              </h1>
            </div>
            <p className="text-muted-foreground">
              We are a dedicated team of professionals committed to delivering
              high-quality fresh and processed meat products across Zambia, the
              region, and international markets. Through our network of owned
              butcheries and supply channels, we combine industry expertise,
              strict quality standards, and a customer-focused approach to
              provide beef, pork, chicken, and a wide range of value-added meat
              products that meet real market needs.
            </p>
            <div className="pt-6">
              <h3 className="mb-3 text-lg font-bold">Our Core Values</h3>
              <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {values.map((value) => (
                  <li key={value} className="flex items-center gap-2">
                    <BadgeCheck className="text-primary shrink-0" />
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Mission + 4 pillars ── */}
      <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px] space-y-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-8">
            <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
              Our Mission
            </div>
            <h2 className="text-4xl leading-tight font-bold tracking-tight lg:text-5xl">
              Delivering nutritious, high-quality meat — from farm to table.
            </h2>
            <p className="text-muted-foreground text-xl">
              We work hand-in-hand with local farmers and skilled butchers to
              supply fresh, traceable meat products that nourish families and
              strengthen communities. Our mission is to uphold strict animal
              welfare, safety, and sustainability standards while supporting
              local livelihoods and modernizing the supply chain.
            </p>
            <div className="pt-2">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground text-sm font-medium px-4 py-2 hover:bg-red-600 transition-colors"
              >
                Get In Touch <MoveRight className="size-4" />
              </a>
            </div>
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/ypgvaedes/Quicksave/About_Page_Images/cow-about-page-2.jpg"
              alt="Cow eating hay in pasture"
              className="rounded-lg w-full"
            />
          </div>
        </div>

        {/* 4 pillars */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            { n: "01", title: "Customer & Food Safety", body: "We put food safety and customer service first across both our retail butcheries and corporate sales channels — ensuring consistently safe, traceable products for homes and businesses." },
            { n: "02", title: "Supply Chain & Traceability", body: "From farm to butchery to delivery, we maintain cold-chain controls and clear traceability so customers and corporate partners can trust every cut we sell." },
            { n: "03", title: "Butchery Craftsmanship", body: "Skilled butchers and strict quality standards ensure we deliver premium cuts and consistent portioning for retail shelves and corporate orders." },
            { n: "04", title: "Local Sourcing & Growth", body: "We partner with local farmers to support livelihoods while expanding into new districts — growing our retail footprint and strengthening supply for corporate clients." },
          ].map(({ n, title, body }) => (
            <div key={n} className="hover:bg-accent/50 relative rounded-lg border p-6 transition-colors">
              <div className="text-primary/20 absolute top-4 right-4 text-3xl font-bold">{n}</div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Vision banner */}
        <div className="bg-accent mt-18 rounded-lg p-8 lg:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
              <p className="text-muted-foreground mb-4">
                We envision a resilient, locally-rooted meat supplier trusted by
                households and businesses alike. By combining responsible
                sourcing, expert butchery, and reliable distribution, we aim to
                elevate standards across the regions we serve as we expand into
                new districts.
              </p>
            </div>
            <div className="flex justify-center lg:col-span-1 lg:justify-end">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-md border bg-background text-sm font-medium px-6 py-2 hover:bg-accent hover:text-accent-foreground transition-colors shadow-xs"
              >
                View our strategy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Core Values cards ── */}
      <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Our Core Values</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            These principles guide everything we do, from how we develop our
            products to how we interact with our customers and each other.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <Heart />, title: "Customer Focus (Retail & Corporate)", body: "We serve both households and corporate partners with dependable supply, flexible fulfilment, and attentive service." },
            { icon: <Lightbulb />, title: "Quality & Consistency", body: "Modern processing, strict portioning, and consistent quality ensure the same great product in every order." },
            { icon: <Shield />, title: "Traceability & Safety", body: "Full traceability and food-safety protocols protect consumers and give confidence to corporate buyers." },
            { icon: <ChartNoAxesCombined />, title: "Sustainable Growth", body: "We grow responsibly—scaling our retail network and services while protecting supply reliability and product standards." },
            { icon: <UsersRound />, title: "Farmer Partnerships", body: "We invest in local farmers, building resilient supply chains and supporting rural livelihoods as we expand into new districts." },
            { icon: <HeartHandshake />, title: "Community & Employment", body: "As we open new butcheries we create local jobs and give back to the communities we serve." },
          ].map(({ icon, title, body }) => (
            <div key={title} className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm border-l-primary border-l-4 p-0">
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 rounded-full p-3 text-primary">{icon}</div>
                  <h3 className="text-lg font-bold">{title}</h3>
                </div>
                <p className="text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-8 text-center">
          <p className="text-muted-foreground mx-auto max-w-2xl">
            These values aren't just words on our website—they're lived every
            day by our team members and reflected in the work we deliver.
          </p>
        </div>
      </section>

      {/* ── Section 4: What Makes Us Different (Tabs) ── */}
      <section className="container mx-auto px-4 pb-24 md:px-6 2xl:max-w-[1400px]">
        {/* Header */}
        <div className="flex items-center justify-center flex-col max-w-3xl mx-auto mb-10 text-center">
          <Badge className="text-sm mb-3" variant="default">Our Culture</Badge>
          <h2 className="text-3xl font-bold">What Makes Us Different</h2>
          <p className="text-muted-foreground mt-4">
            At Quicksave we never compromise on quality or safety. As a growing
            network of butcheries and a supplier to corporate clients, we
            combine skilled craft, traceable sourcing, and responsive service to
            deliver meat products our customers rely on every day.
          </p>
        </div>

        <Tabs defaultValue="strengths" className="mx-auto max-w-7xl">
          <TabsList className="space-x-10 h-auto mx-auto" variant="line">
            <TabsTrigger className={tabs_trigger_classes} value="strengths">Our Strengths</TabsTrigger>
            <TabsTrigger className={tabs_trigger_classes} value="responsibilities">Our Responsibilities</TabsTrigger>
            <TabsTrigger className={tabs_trigger_classes} value="operation">Our Operation</TabsTrigger>
          </TabsList>

          {/* ── Strengths ── */}
          <TabsContent value="strengths">
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch px-4">
              {/* Left: text + stat cards */}
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">Built to Deliver at Scale</h3>
                  <p className="text-muted-foreground">
                    Our strength in this industry is our unlimited capacity to
                    deliver nationwide within 48 hours of receiving orders and
                    to be a one-stop supplier for an assortment of meats. Our
                    strength to supply all the markets is based on the
                    following factors:
                  </p>
                </div>
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                    <BadgeCheck className="text-primary mt-0.5 shrink-0" />
                    <span>Experienced staff with deep roots in the food industry.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <BadgeCheck className="text-primary mt-0.5 shrink-0" />
                    <span>An efficient livestock sourcing system built for reliability.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <BadgeCheck className="text-primary mt-0.5 shrink-0" />
                    <span>Our own fleet of delivery vehicles for timely, controlled logistics.</span>
                  </li>
                </ul>
                {/* Stat strip */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                  {[
                    { label: "Delivery", value: "48hrs", sub: "nationwide" },
                    { label: "Products", value: "50+", sub: "SKUs stocked" },
                    { label: "Provinces", value: "10", sub: "target coverage" },
                  ].map(({ label, value, sub }) => (
                    <div key={label} className="rounded-lg border bg-accent/40 p-4 text-center">
                      <p className="text-2xl font-extrabold text-primary">{value}</p>
                      <p className="text-xs font-semibold mt-0.5">{label}</p>
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right: image */}
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://ik.imagekit.io/ypgvaedes/Quicksave/About_Page_Images/our%20strength%203.jpg"
                  className="w-full h-full object-cover"
                  alt="Our strengths"
                />
              </div>
            </div>
          </TabsContent>

          {/* ── Responsibilities ── */}
          <TabsContent value="responsibilities">
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch px-4">
              {/* Left: stakeholder cards */}
              <div className="flex flex-col gap-4 justify-center">
                <h3 className="text-2xl font-bold mb-1">Our Commitment to Every Stakeholder</h3>
                <p className="text-muted-foreground mb-2">
                  We believe a business only thrives when it creates real value
                  for everyone it touches. Here's what we promise to each group
                  we serve.
                </p>
                {[
                  { icon: <Users className="size-5" />, label: "To Our Customers", body: "We aim to anticipate and meet customer needs so as to become the customers' supplier of choice." },
                  { icon: <HeartHandshake className="size-5" />, label: "To Our Employees", body: "We seek to create sustainable employment and financially empower our staff." },
                  { icon: <ChartNoAxesCombined className="size-5" />, label: "To Our Shareholders", body: "We ensure that our shareholders receive a competitive long-term return on their investment." },
                ].map(({ icon, label, body }) => (
                  <div key={label} className="flex gap-4 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                    <div className="bg-primary/10 text-primary rounded-full p-2.5 h-fit shrink-0">{icon}</div>
                    <div>
                      <p className="font-bold text-sm mb-1">{label}</p>
                      <p className="text-muted-foreground text-sm">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Right: image */}
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://ik.imagekit.io/ypgvaedes/Quicksave/About_Page_Images/strengths%20image%202.jpg"
                  className="w-full h-full object-cover"
                  alt="Our responsibilities"
                />
              </div>
            </div>
          </TabsContent>

          {/* ── Operation ── */}
          <TabsContent value="operation">
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch px-4">
              {/* Left: content */}
              <div className="flex flex-col gap-5 justify-center">
                <h3 className="text-2xl font-bold">A National Retail Network</h3>
                <p className="text-muted-foreground">
                  We are building a physical presence in all ten provinces of
                  Zambia, creating a true national footprint. Over the next five
                  years retail is expected to account for about 70% of annual
                  turnover, with a target of 150 outlets by 2031.
                </p>
                <p className="text-muted-foreground">
                  Each outlet follows our "all-in-one, all-under-one-roof"
                  strategy, stocking a broad range of products for everyday
                  household and business needs.
                </p>
                {/* Product category pills */}
                <div>
                  <p className="text-sm font-semibold mb-2">What every outlet will stock:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Beef", "Pork", "Chicken", "Chevon", "Mutton", "Processed meats", "Eggs", "Fish", "Cooking oil", "Rice & flour"].map((item) => (
                      <span key={item} className="rounded-full border bg-accent/50 px-3 py-1 text-xs font-medium">{item}</span>
                    ))}
                  </div>
                </div>
                {/* Outlet target callout */}
                <div className="rounded-lg bg-primary/10 border border-primary/20 p-5 flex items-center gap-4">
                  <Store className="text-primary size-8 shrink-0" />
                  <div>
                    <p className="text-3xl font-extrabold text-primary">150</p>
                    <p className="text-sm text-muted-foreground">outlets targeted across Zambia by 2031</p>
                  </div>
                </div>
              </div>
              {/* Right: image */}
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://ik.imagekit.io/ypgvaedes/Quicksave/About_Page_Images/our%20strengths.jpg"
                  className="w-full h-full object-cover"
                  alt="Our operation"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

export default About_Page;