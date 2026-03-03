import {
  BadgeCheck,
  ChartNoAxesCombined,
  Heart,
  HeartHandshake,
  Lightbulb,
  Shield,
  UsersRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function About_Page() {
  const values: Array<String> = [
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
      <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <img
              alt="Team collaborating in modern office"
              className="object-cover h-full"
              sizes="(max-width: 768px) 100vw, 50vw"
              src="https://ik.imagekit.io/ypgvaedes/Quicksave/About_Page_Images/Staff%20Photo.jpg"
            />
          </div>

          <div className="">
            <div>
              <h4 className="text-primary mb-2 font-semibold">Who We Are</h4>
              <h2 className="text-3xl font-bold tracking-tight mb-4 capitalize">
                Building a better future for the meat industry in Zambia and beyond
              </h2>
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
            <div className="pt-2">
              <h3 className="mb-3 text-lg font-bold">Our Core Values</h3>
              <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {values.map((value) => (
                  <li className="flex items-center gap-2">
                    <BadgeCheck />
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
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
                href="#"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3 group inline-flex items-center"
                data-slot="button"
              >
                Get In Touch
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="hover:bg-accent/50 relative rounded-lg border p-6 transition-colors">
              <div className="text-primary/20 absolute top-4 right-4 text-3xl font-bold">01</div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Customer & Food Safety</h3>
                <p className="text-muted-foreground">
                  We put food safety and customer service first across both our
                  retail butcheries and corporate sales channels — ensuring
                  consistently safe, traceable products for homes and businesses.
                </p>
              </div>
            </div>

            <div className="hover:bg-accent/50 relative rounded-lg border p-6 transition-colors">
              <div className="text-primary/20 absolute top-4 right-4 text-3xl font-bold">02</div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Supply Chain & Traceability</h3>
                <p className="text-muted-foreground">
                  From farm to butchery to delivery, we maintain cold-chain
                  controls and clear traceability so customers and corporate
                  partners can trust every cut we sell.
                </p>
              </div>
            </div>

            <div className="hover:bg-accent/50 relative rounded-lg border p-6 transition-colors">
              <div className="text-primary/20 absolute top-4 right-4 text-3xl font-bold">03</div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Butchery Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Skilled butchers and strict quality standards ensure we
                  deliver premium cuts and consistent portioning for retail
                  shelves and corporate orders.
                </p>
              </div>
            </div>

            <div className="hover:bg-accent/50 relative rounded-lg border p-6 transition-colors">
              <div className="text-primary/20 absolute top-4 right-4 text-3xl font-bold">04</div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Local Sourcing & Growth</h3>
                <p className="text-muted-foreground">
                  We partner with local farmers to support livelihoods while
                  expanding into new districts — growing our retail footprint
                  and strengthening supply for corporate clients.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-accent mt-24 rounded-lg p-8 lg:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
              <p className="text-muted-foreground mb-4">
                We envision a resilient, locally-rooted meat supplier trusted
                by households and businesses alike. By combining responsible
                sourcing, expert butchery, and reliable distribution, we aim
                to elevate standards across the regions we serve as we expand
                into new districts.
              </p>
            </div>
            <div className="flex justify-center lg:col-span-1 lg:justify-end">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[&gt;svg]:px-4 group inline-flex items-center"
                data-slot="button"
              >
                View our strategy
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Our Core Values</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            These principles guide everything we do, from how we develop our
            products to how we interact with our customers and each other.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm border-l-primary border-l-4 p-0"
          >
            <div data-slot="card-content" className="space-y-4 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <Heart />
                </div>
                <h3 className="text-lg font-bold">Customer Focus (Retail & Corporate)</h3>
              </div>
              <p className="text-muted-foreground">
                We serve both households and corporate partners with dependable
                supply, flexible fulfilment, and attentive service.
              </p>
            </div>
          </div>

          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm border-l-primary border-l-4 p-0"
          >
            <div data-slot="card-content" className="space-y-4 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <Lightbulb />
                </div>
                <h3 className="text-lg font-bold">Quality & Consistency</h3>
              </div>
              <p className="text-muted-foreground">
                Modern processing, strict portioning, and consistent quality
                ensure the same great product in every order.
              </p>
            </div>
          </div>

          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm border-l-primary border-l-4 p-0"
          >
            <div data-slot="card-content" className="space-y-4 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <Shield />
                </div>
                <h3 className="text-lg font-bold">Traceability & Safety</h3>
              </div>
              <p className="text-muted-foreground">
                Full traceability and food-safety protocols protect consumers
                and give confidence to corporate buyers.
              </p>
            </div>
          </div>

          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm border-l-primary border-l-4 p-0"
          >
            <div data-slot="card-content" className="space-y-4 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <ChartNoAxesCombined />
                </div>
                <h3 className="text-lg font-bold">Sustainable Growth</h3>
              </div>
              <p className="text-muted-foreground">
                We grow responsibly—scaling our retail network and services
                while protecting supply reliability and product standards.
              </p>
            </div>
          </div>

          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm border-l-primary border-l-4 p-0"
          >
            <div data-slot="card-content" className="space-y-4 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <UsersRound />
                </div>
                <h3 className="text-lg font-bold">Farmer Partnerships</h3>
              </div>
              <p className="text-muted-foreground">
                We invest in local farmers, building resilient supply chains
                and supporting rural livelihoods as we expand into new districts.
              </p>
            </div>
          </div>

          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm border-l-primary border-l-4 p-0"
          >
            <div data-slot="card-content" className="space-y-4 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <HeartHandshake />
                </div>
                <h3 className="text-lg font-bold">Community & Employment</h3>
              </div>
              <p className="text-muted-foreground">
                As we open new butcheries we create local jobs and give back
                to the communities we serve.
              </p>
            </div>
          </div>
        </div>
        <div className="pt-8 text-center">
          <p className="text-muted-foreground mx-auto max-w-2xl">
            These values aren't just words on our website—they're lived every
            day by our team members and reflected in the work we deliver.
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-center flex-col max-w-3xl mx-auto p-4 mb-5">
          <Badge className="text-sm" variant="default">
            Our Culture
          </Badge>
          <h2 className="ml-4 text-3xl font-bold mt-2">What Makes Us Different</h2>
          <p className="text-center text-muted-foreground mt-4">
            At Quicksave we never compromise on quality or safety. As a
            growing network of butcheries and a supplier to corporate clients,
            we combine skilled craft, traceable sourcing, and responsive
            service to deliver meat products our customers rely on every day.
          </p>
        </div>

        <div>
          <Tabs defaultValue="strengths" className="mx-auto max-w-7xl">
            <TabsList className="space-x-10 h-auto mx-auto" variant="line">
              <TabsTrigger
                className={`${tabs_trigger_classes}`}
                value="strengths"
              >
                Our Strengths
              </TabsTrigger>
              <TabsTrigger
                className={`${tabs_trigger_classes}`}
                value="responsibilities"
              >
                Our Responsibilities
              </TabsTrigger>
              <TabsTrigger
                className={`${tabs_trigger_classes}`}
                value="operation"
              >
                Our Operation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="strengths">
              <section className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 px-4">
                  <div>
                    <p>
                      Our strength in this industry is our unlimited capacity to
                      deliver nationwide within 48 hours of receiving orders and
                      to be a one-stop supplier for an assortment of meats. Our
                      strength to supply all the markets is based on the
                      following factors:
                    </p>
                    <ul className="mt-4 flex space-y-3 flex-col">
                      <li className="flex gap-2">
                        <BadgeCheck /> Experience of our staff in the food
                        industry,
                      </li>
                      <li className="flex gap-2">
                        <BadgeCheck /> An efficient livestock sourcing system in
                        place.
                      </li>
                      <li className="flex gap-2">
                        <BadgeCheck /> Availability of our own fleet of delivery
                        vehicles.
                      </li>
                    </ul>
                  </div>

                  <div className="h-[550px]">
                    <img
                      src="https://ik.imagekit.io/ypgvaedes/Quicksave/About_Page_Images/our%20strength%203.jpg"
                      className="h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="responsibilities">
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 px-4 py-8">
                  <div className="flex space-y-3 flex-col">
                    <p>
                      <span className="font-bold">TO THE CUSTOMERS: </span>
                      We aim to anticipate and meet customer needs so as to
                      become the customers’ supplier of choice.
                    </p>

                    <p>
                      <span className="font-bold"> TO THE EMPLOYEES: </span>
                      We seek to create sustainable employment and financially
                      empower its staff.
                    </p>

                    <p>
                      <span className="font-bold">TO THE SHAREHOLDERS: </span>
                      We ensure that our shareholders receive a competitive
                      long-term return on their investment in the company.
                    </p>
                  </div>
                  {/* Placeholder for image or graphic */}
                  <div className="h-[550px]">
                    <img
                      src="https://ik.imagekit.io/ypgvaedes/Quicksave/About_Page_Images/strengths%20image%202.jpg"
                      className="h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="operation">
              <section className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 px-4">
                  <div className="space-y-4 text-base">
                    <p>
                      We are building a national retail network with a physical
                      presence in all ten provinces of the Republic of Zambia —
                      creating a true national footprint.
                    </p>

                    <p>
                      Over the next five years we expect retail to account for
                      about 70% of our annual turnover, driving significant
                      volume growth. Our target is to open 150 outlets across
                      Zambia by 2031.
                    </p>

                    <p>
                      Each outlet will follow our “all-in-one, all-under-one-roof”
                      strategy and will stock a broad range of products,
                      including:
                    </p>

                    <ul className="list-disc list-inside ml-4">
                      <li>Fresh meats: beef, pork, chicken, chevon, mutton</li>
                      <li>Processed and value-added meat products</li>
                      <li>Staples and support items: eggs, fish, cooking oil, rice, flour</li>
                    </ul>
                  </div>

                  <div className="h-[550px]">
                    <img
                      src="https://ik.imagekit.io/ypgvaedes/Quicksave/About_Page_Images/our%20strengths.jpg"
                      className="h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
export default About_Page;
