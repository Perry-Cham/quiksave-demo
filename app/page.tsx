import Hero from "@/components/hero";
import AboutUsSection from "../components/custom components/pages/landing_page/about_us_section";
import { Feature43 } from "@/components/feature43";
function Home() {
  return (
    <main>
      <Hero />
     <AboutUsSection />
     <Feature43 className=""/>
    </main>
  );
}
 export default Home;