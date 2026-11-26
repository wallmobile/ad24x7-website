import { Hero } from "@/components/sections/Hero";
import { WhyUs } from "@/components/sections/WhyUs";
import { Services } from "@/components/sections/Services";
import { StatsCta } from "@/components/sections/StatsCta";
import { Blog } from "@/components/sections/Blog";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { getAllPosts } from "@/lib/posts";

// re-generate the page at most every 60s so new WordPress posts appear on the home blog section
export const revalidate = 60;

export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, 6);
  return (
    <main className="overflow-x-clip p-2.5 sm:p-[18px]">
      <Hero />
      <WhyUs />
      <Services />
      <StatsCta />
      <Blog posts={posts} />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
