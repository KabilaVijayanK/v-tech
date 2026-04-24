import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Products from "@/components/Products";
import WhyVTech from "@/components/WhyVTech";
import Vision from "@/components/Vision";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Products />
      <WhyVTech />
      <Vision />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
