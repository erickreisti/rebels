import { Header } from "../components/layout/Header";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Catalog } from "../components/sections/Catalog";
import { Features } from "../components/sections/Features";
import { Blog } from "../components/sections/Blog";
import { Location } from "../components/sections/Location";
import { Footer } from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-100">
      <Header />
      <main>
        <Hero />
        <About />
        <Catalog />
        <Features />
        <Blog />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
