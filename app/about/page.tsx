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
    "Integrity and Honesty",
    "Commitment",
    "Teamwork",
    "Rewarding hardwork and effort",
    "Encouraging risk taking and responsibility",
    "Empowering others",
    "Enjoying our work and lives",
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
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                BUILDING A BETTER FUTURE FOR THE MEAT INDUSTRY IN ZAMBIA AND
                BEYOND
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
              <div className="text-primary/20 absolute top-4 right-4 text-3xl font-bold">
                01
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Customer-Centric</h3>
                <p className="text-muted-foreground">
                  We place our customers at the center of everything we do,
                  designing products and services that solve real problems and
                  create lasting value.
                </p>
              </div>
            </div>
            <div className="hover:bg-accent/50 relative rounded-lg border p-6 transition-colors">
              <div className="text-primary/20 absolute top-4 right-4 text-3xl font-bold">
                02
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Innovation-Driven</h3>
                <p className="text-muted-foreground">
                  We continuously explore new ideas and technologies to push
                  boundaries and create better solutions for evolving
                  challenges.
                </p>
              </div>
            </div>
            <div className="hover:bg-accent/50 relative rounded-lg border p-6 transition-colors">
              <div className="text-primary/20 absolute top-4 right-4 text-3xl font-bold">
                03
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Quality-Focused</h3>
                <p className="text-muted-foreground">
                  We are committed to excellence in every aspect of our work,
                  from the products we build to the experiences we create and
                  the support we provide.
                </p>
              </div>
            </div>
            <div className="hover:bg-accent/50 relative rounded-lg border p-6 transition-colors">
              <div className="text-primary/20 absolute top-4 right-4 text-3xl font-bold">
                04
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Inclusive by Design</h3>
                <p className="text-muted-foreground">
                  We embrace diversity of thought, background, and perspective,
                  creating solutions that work for everyone and building teams
                  that reflect the communities we serve.
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
                We envision a world where technology enhances human potential,
                enabling everyone to achieve more, connect meaningfully, and
                contribute to a better future. We strive to be the company that
                makes this vision a reality through thoughtful innovation and an
                unwavering commitment to our core principles.
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
                <h3 className="text-lg font-bold">Customer First</h3>
              </div>
              <p className="text-muted-foreground">
                We prioritize our customers&amp;apos; needs in every decision we
                make. Your success is our success.
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
                <h3 className="text-lg font-bold">Innovation</h3>
              </div>
              <p className="text-muted-foreground">
                We constantly push boundaries and explore new possibilities to
                deliver cutting-edge solutions.
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
                <h3 className="text-lg font-bold">Integrity</h3>
              </div>
              <p className="text-muted-foreground">
                We believe in transparency, honesty, and ethical conduct in all
                our interactions.
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
                <h3 className="text-lg font-bold">Excellence</h3>
              </div>
              <p className="text-muted-foreground">
                We strive for excellence in everything we do, from product
                development to customer support.
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
                <h3 className="text-lg font-bold">Collaboration</h3>
              </div>
              <p className="text-muted-foreground">
                We work together across teams and with our clients to create
                better outcomes for everyone.
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
                <h3 className="text-lg font-bold">Social Responsibility</h3>
              </div>
              <p className="text-muted-foreground">
                We're committed to making a positive impact on communities and
                the environment.
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
          <h2 className="ml-4 text-3xl font-bold mt-2">
            What Makes Us Different
          </h2>
          <p className="text-center text-muted-foreground mt-4">
            Our philosophy at Quicksave is simple: never compromise—on quality,
            safety, or service. We deliver premium, traceable meat products and
            exceptional customer care to nourish communities and earn lasting
            trust.
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
                  <div className="h-[550px]">
                    <div className="h-full rounded-lg overflow-hidden bg-gray-200"></div>
                  </div>
                </div>
              </section>
            </TabsContent>
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
                    <div className="h-full rounded-lg overflow-hidden bg-gray-200"></div>
                  </div>
                </div>
              </section>
            </TabsContent>
            <TabsContent value="operation">
              <section className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 px-4">
                  <p>
                    We are endeavouring to be a truly national meat supplier by
                    ensuring we have a physical retail presence in all ten
                    provinces of the Republic of Zambia; literally giving us a
                    national retail footprint. In the next five years we project
                    that 70% of our annual turnover will arise from our retail
                    operation which will subsequently lead to an increase in
                    volume growth. We are aiming to open 150 outlets in total
                    within Zambia by 2031. Each outlet is to showcase and
                    reflect our “all-in-one”, “all-under-one-roof” and “one stop
                    shop” strategy therefore our stocking will consist of beef,
                    pork, chicken, chevon, mutton, processed meat, eggs, fish,
                    and support products such as meal ie-meal, cooking oil rice
                    and flour.
                  </p>

                  <div className="h-[550px]">
                    <div className="h-full rounded-lg overflow-hidden bg-gray-200"></div>
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
