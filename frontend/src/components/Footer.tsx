import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Massive wordmark */}
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-[22vw] leading-[0.85] tracking-tighter px-6 md:px-10 pt-20 pb-10"
        >
          V&nbsp;TECH<span className="text-primary-glow">.</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 border-t border-background/10">
          <div className="col-span-2">
            <div className="font-mono-grotesk text-[10px] tracking-[0.3em] text-primary-glow uppercase mb-3">
              Solution partner for your process
            </div>
            <p className="text-background/70 max-w-sm font-light leading-relaxed">
              V Tech Manufacturing Pvt Ltd. Designing, building and commissioning industrial
              conveyors from Chennai, India.
            </p>
          </div>
          <div>
            <div className="font-mono-grotesk text-[10px] tracking-[0.3em] text-background/50 uppercase mb-4">
              Explore
            </div>
            <ul className="space-y-2 text-sm">
              {["About", "Products", "Why V Tech", "Process", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(/\s+/g, "")}`}
                    className="text-background/85 hover:text-primary-glow transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono-grotesk text-[10px] tracking-[0.3em] text-background/50 uppercase mb-4">
              Reach
            </div>
            <ul className="space-y-2 text-sm text-background/80">
              <li>Chennai, India</li>
              <li>
                <a href="tel:+917845922919" className="hover:text-primary-glow transition-colors">
                  +91 78459 22919
                </a>
              </li>
              <li>
                <a
                  href="mailto:vignesh@vtechindustries.co.in"
                  className="hover:text-primary-glow transition-colors"
                >
                  vignesh@vtechindustries.co.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-background/10 text-xs text-background/60">
          <div>© {new Date().getFullYear()} V Tech Manufacturing Pvt Ltd. All rights reserved.</div>
          <div className="font-mono-grotesk tracking-widest uppercase">
            Engineered in Chennai · Trusted Worldwide
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
