import { BadgeCheck } from "lucide-react";
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
  return (
    <main>
      <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <img
              alt="Team collaborating in modern office"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              src="https://ik.imagekit.io/ypgvaedes/Quicksave/About_Page_Images/Staff%20Photo.jpg"
            />
          </div>

          <div className="">
            <div>
              <h4 className="text-primary mb-2 font-semibold">Who We Are</h4>
              <h2 className="text-3xl font-bold tracking-tight">
                Building A Future To Make A Difference
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
    </main>
  );
}
export default About_Page;
