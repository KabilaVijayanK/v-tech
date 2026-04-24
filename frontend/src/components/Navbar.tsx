import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Why V Tech", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 30));
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "glass rounded-full mx-4 md:mx-8 px-6 py-3 shadow-glass"
            : ""
        }`}
      >
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-display font-black text-lg">V</span>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-primary blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
          </div>
          <div className="leading-none">
            <div className="font-display font-bold text-base tracking-tight">V TECH</div>
            <div className="text-[10px] tracking-[0.25em] text-muted-foreground font-medium">INDUSTRIES</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors group"
            >
              {l.label}
              <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-gradient-electric scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full bg-foreground text-background hover:bg-primary transition-all duration-500 hover:shadow-glow"
        >
          Get in touch
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </motion.header>
  );
};

export default Navbar;
