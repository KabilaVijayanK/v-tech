import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import facility from "@/assets/about-facility.jpg";

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "100%",  label: "In-House Manufacturing",    delay: 0.5 },
  { value: "24/7",  label: "Operational Uptime",         delay: 0.7 },
  { value: "1000+", label: "Custom Solutions Delivered", delay: 0.9 },
];

const MILESTONES = [
  { year: "2009", event: "Founded in Chennai",          active: false },
  { year: "2012", event: "First 100 systems deployed",  active: false },
  { year: "2016", event: "ISO 9001 Certification",      active: false },
  { year: "2020", event: "Expanded heavy-load series",  active: true  },
  { year: "2024", event: "1,000+ solutions milestone",  active: false },
];

const PROCESS = [
  {
    num: "01",
    title: "Design",
    desc: "Purpose-built CAD engineering for your exact process specifications.",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Simulate",
    desc: "Load, thermal and motion simulation before a single component is cut.",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Build",
    desc: "100% in-house fabrication with precision CNC and welding cells.",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Deploy",
    desc: "On-site commissioning and lifetime support — from day one to year ten.",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

const PARAS = [
  "V Tech Industries has been designing and building custom conveyors and complete conveyor systems for a broad spectrum of industries — from packaging lines to heavy material handling.",
  "Our engineers take the time to understand the nuances of your process. Every solution is purpose-built to deliver years of dependable operation, increased efficiency, and remarkably low maintenance costs.",
  "From a single conveyor to fully integrated material flow systems, we partner with you long after delivery — turning first-time customers into lifetime partners.",
];

// ── 3D Facility Card ──────────────────────────────────────────────────────────

const FacilityCard3D = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Soft drop shadow */}
      <div
        className="absolute -bottom-6 left-[5%] right-[5%] h-10 rounded-full pointer-events-none z-0"
        style={{ background: "rgba(0,0,0,0.15)", filter: "blur(20px)" }}
      />
      {/* 3D depth edges — visible on light bg */}
      <div
        className="absolute top-1.5 -right-2.5 bottom-[-6px] w-2.5 z-[-1] rounded-r"
        style={{ background: "linear-gradient(to right, #d0d0d0, #b8b8b8)" }}
      />
      <div
        className="absolute -bottom-2 left-1.5 -right-2.5 h-2 z-[-2] rounded-b"
        style={{ background: "linear-gradient(to bottom, #c0c0c0, #a8a8a8)" }}
      />

      <motion.div
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: "preserve-3d",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)"
        }}
        className="relative overflow-hidden border border-foreground/15 rounded-sm z-10"
      >
        {/* Image */}
        <div ref={imgRef} className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={facility}
            alt="V Tech manufacturing facility"
            style={{
              y: imgY,
              filter: "brightness(0.48) saturate(0.85)"
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Scan line */}
        <motion.div
          animate={{ top: ["-1px", "100%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px pointer-events-none z-30"
          style={{ background: "linear-gradient(90deg, transparent, rgba(232,160,32,0.9), transparent)" }}
        />

        {/* Dark gradient overlay — ensures all text readable */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%, rgba(0,0,0,0.82) 100%)" }}
        />

        {/* Corner brackets */}
        {[
          "top-2.5 left-2.5 border-t border-l",
          "top-2.5 right-2.5 border-t border-r",
          "bottom-2.5 left-2.5 border-b border-l",
          "bottom-2.5 right-2.5 border-b border-r",
        ].map((cls) => (
          <div
            key={cls}
            className={`absolute w-3.5 h-3.5 z-40 pointer-events-none ${cls}`}
            style={{ borderColor: "#E8A020" }}
          />
        ))}

        {/* Live badge */}
        <div
          className="absolute top-3.5 right-3.5 z-40 flex items-center gap-1.5 px-3 py-1.5"
          style={{
            background: "rgba(232,160,32,0.18)",
            border: "1px solid rgba(232,160,32,0.5)",
          }}
        >
          <span className="w-[5px] h-[5px] rounded-full animate-pulse" style={{ background: "#E8A020" }} />
          <span className="font-mono text-[8px] tracking-[2px] uppercase" style={{ color: "#E8A020" }}>
            Facility Live
          </span>
        </div>

        {/* Footer text — always white, over dark overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-40 flex items-end justify-between p-5">
          <div>
            <div
              className="font-mono text-[8px] tracking-[3px] uppercase mb-1.5"
              style={{ color: "#E8A020" }}
            >
              Chennai · India
            </div>
            <div className="font-display text-xl font-semibold tracking-wide" style={{ color: "#ffffff" }}>
              Where every system is engineered.
            </div>
          </div>
          <div className="font-mono text-[8px] tracking-[2px] uppercase" style={{ color: "rgba(255,255,255,0.65)" }}>
            Facility / 01
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ── Process Cube Card ─────────────────────────────────────────────────────────

const CubeCard = ({ num, title, desc, icon, index }: (typeof PROCESS)[0] & { index: number }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 100, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 100, damping: 20 });
  const cardRef = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{ perspective: "500px" }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative border border-foreground/10 bg-background p-6 overflow-hidden cursor-default
          transition-all duration-300"
        whileHover={{
          borderColor: "rgba(200,134,10,0.4)",
          backgroundColor: "rgba(200,134,10,0.03)",
          boxShadow: "0 8px 32px rgba(200,134,10,0.08), 0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

        {/* Number */}
        <div className="font-mono text-[8px] tracking-[3px] text-foreground/25 mb-3">{num}</div>

        {/* Icon box */}
        <div className="w-7 h-7 border border-foreground/12 group-hover:border-primary/50 flex items-center justify-center mb-3.5 transition-colors duration-300 text-foreground/40 group-hover:text-primary">
          {icon}
        </div>

        {/* Title — always readable */}
        <div className="font-display text-xl font-bold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </div>

        {/* Desc — always readable */}
        <div className="text-xs text-foreground/55 leading-relaxed group-hover:text-foreground/75 transition-colors duration-300">
          {desc}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Main About Component ──────────────────────────────────────────────────────

const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden bg-background">

      {/* Subtle grid texture for engineering feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(200,134,10,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Section eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono-grotesk text-[10px] tracking-[3px] text-primary">01</span>
          <span className="h-px w-8 bg-primary" />
          <span className="font-mono-grotesk text-[10px] tracking-[3px] uppercase text-foreground/50">
            Our Story
          </span>
        </motion.div>

        {/* ── Two-col grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start mb-24">

          {/* Left: heading + paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:sticky md:top-24"
          >
            <div className="font-mono-grotesk text-[9px] tracking-[4px] uppercase text-foreground/35 mb-5 flex items-center gap-2.5">
              <span className="text-foreground/20">//</span>
              V Tech Industries
            </div>

            <h2 className="font-display font-black text-[clamp(48px,5.5vw,80px)] leading-[0.9] tracking-tight text-foreground mb-10">
              Built on<br />
              the{" "}
              <em className="not-italic font-extralight text-primary italic">subtle</em>
              <br />
              <span
                style={{
                  WebkitTextStroke: "1.5px rgba(200,134,10,0.4)",
                  color: "transparent",
                  display: "block",
                  fontWeight: 100,
                }}
              >
                details.
              </span>
            </h2>

            <div className="flex flex-col gap-6">
              {PARAS.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.8, delay: i * 0.12 }}
                  className="text-base md:text-lg leading-[1.75] text-foreground/65 font-light
                    pl-4 border-l-2 border-foreground/10
                    hover:border-l-primary hover:text-foreground/85
                    transition-all duration-300 cursor-default"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D facility card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <FacilityCard3D />
          </motion.div>
        </div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 mb-20 border border-foreground/10"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`relative p-10 group cursor-default transition-all duration-300
                hover:bg-primary/[0.03]
                ${i < STATS.length - 1 ? "md:border-r border-b md:border-b-0 border-foreground/10" : ""}`}
            >
              {/* Hover accent line top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
              >
                {/* Big number — always visible */}
                <div className="font-display text-[64px] md:text-[72px] font-black leading-none tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {s.value}
                </div>
                {/* Label — always visible */}
                <div className="font-mono-grotesk text-[9px] tracking-[3px] uppercase text-foreground/45 mt-2 group-hover:text-primary/70 transition-colors duration-300">
                  {s.label}
                </div>
                {/* Animated sweep bar */}
                <div className="mt-5 h-px bg-foreground/10 overflow-hidden relative">
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: s.delay, ease: "easeOut" }}
                    className="absolute inset-0 bg-primary"
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* ── Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono-grotesk text-[9px] tracking-[3px] uppercase text-foreground/40">
              Company Milestones
            </span>
            <div className="flex-1 h-px bg-foreground/10" />
          </div>

          <div className="flex border border-foreground/10 overflow-hidden">
            {MILESTONES.map((m) => (
              <div
                key={m.year}
                className={`flex-1 relative px-5 py-5 border-r border-foreground/10 last:border-r-0
                  cursor-default transition-colors duration-200 hover:bg-primary/[0.04]
                  ${m.active ? "bg-primary/[0.05]" : ""}`}
              >
                {m.active && <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />}
                {/* Year number — readable */}
                <div className="font-display text-[28px] font-black leading-none tracking-tight text-primary">
                  {m.year}
                </div>
                {/* Event text — readable */}
                <div className="text-xs font-medium text-foreground/55 mt-1.5 leading-[1.4]">
                  {m.event}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Process cubes ── */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono-grotesk text-[9px] tracking-[3px] uppercase text-foreground/40">
              Engineering Process
            </span>
            <div className="flex-1 h-px bg-foreground/10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROCESS.map((p, i) => (
              <CubeCard key={p.num} {...p} index={i} />
            ))}
          </div>
        </div>

        {/* ── Footer strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-foreground/10"
        >
          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            {["V Tech Industries", "ISO 9001:2015", "Est. 2009", "Chennai · India"].map((t) => (
              <span key={t} className="font-mono-grotesk text-[9px] tracking-[2px] uppercase text-foreground/40">
                {t}
              </span>
            ))}
          </div>
          <a
            href="#products"
            className="group inline-flex items-center gap-3 bg-foreground text-background
              px-6 py-3 text-xs font-semibold tracking-[2px] uppercase
              hover:bg-primary transition-colors duration-300"
          >
            View All Projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default About;