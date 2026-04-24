import { motion, useScroll, useTransform, useMotionValue, useSpring, animate, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ── NOTE: Replace these with your actual image imports ──
// import heroImg1 from "@/assets/hero-conveyor.jpg";
// import heroImg2 from "@/assets/hero-conveyor-2.jpg";
// import heroImg3 from "@/assets/hero-conveyor-3.jpg";
// import heroImg4 from "@/assets/hero-conveyor-4.jpg";

// For demo purposes, using placeholder URLs — swap with your real imports
const SLIDESHOW_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=80",
    label: "Slat Chain Conveyors",
    tag: "In Production",
    subtitle: "Heavy Industrial Class",
  },
  {
    src: "/src/assets/hero-conveyor.jpg",
    label: "Roller Conveyors",
    tag: "Active",
    subtitle: "conveyor",
  },
  {
    src: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1400&q=80",
    label: "Belt Conveyors",
    tag: "Deployed",
    subtitle: "Light Industrial Class",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
    label: "Powerised Turn Tables",
    tag: "In Production",
    subtitle: "Bulk Feed Class",
  },
];

const SLIDE_DURATION = 4500; // ms per slide

// ── Animated counter hook ──
function useCountUp(target: number, duration = 1.8) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return controls.stop;
  }, [target, duration]);
  return value;
}

const SPECS = [
  { label: "Product Series", val: "Slat-Chain 4200", sub: "Heavy Industrial Class" },
  { label: "Drive Type",     val: "Servo + Gearbox",  sub: "IP67 Rated Motors" },
  { label: "Speed Range",    val: "0.3 – 3.5 m/s",   sub: "Variable Frequency Drive" },
];

const METERS = [
  { label: "Load Capacity",  val: "3,200 kg", pct: 82 },
  { label: "Thermal Rating", val: "94%",      pct: 94 },
  { label: "Uptime Index",   val: "99.4%",    pct: 99 },
];

const STATS = [
  { num: 15,  suffix: "+ yrs", label: "Engineering Experience" },
  { num: 200, suffix: "+",     label: "Systems Deployed"       },
  { num: 99,  suffix: ".4%",   label: "Operational Uptime"     },
];

const CHART_DATA = [62, 75, 58, 81, 90, 73, 88, 95, 79, 84, 91, 99];

const SYSTEMS = [
  { name: "Slat-Chain 4200",   tag: "Heavy",  active: true  },
  { name: "Belt-Drive Pro",    tag: "Medium", active: true  },
  { name: "Roller Flex 800",   tag: "Light",  active: true  },
  { name: "Screw Conveyor S3", tag: "Bulk",   active: false },
  { name: "Vibro-Feeder V7",   tag: "Feed",   active: true  },
];

// ── Sub-components ──

const PanelHeader = ({ left, right }: { left: string; right: string }) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-vt-border">
    <span className="font-mono text-[9px] tracking-[3px] uppercase text-vt-muted2">{left}</span>
    <span className="font-mono text-[10px] text-vt-accent">{right}</span>
  </div>
);

const MeterRow = ({ label, val, pct }: { label: string; val: string; pct: number }) => (
  <div className="px-6 py-3.5 border-b border-vt-border">
    <div className="flex justify-between mb-1.5">
      <span className="font-mono text-[9px] tracking-[2px] uppercase text-vt-muted2">{label}</span>
      <span className="font-mono text-[10px] text-vt-accent">{val}</span>
    </div>
    <div className="h-[3px] bg-vt-border2 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.8 }}
        className="h-full rounded-full bg-gradient-to-r from-vt-primary to-vt-accent"
      />
    </div>
  </div>
);

const StatBlock = ({ num, suffix, label }: { num: number; suffix: string; label: string }) => {
  const count = useCountUp(num, 1.8);
  return (
    <div className="px-6 py-5 border-b border-vt-border">
      <div className="font-display text-[52px] leading-none tracking-wide text-vt-accent">
        {count}<span className="text-[18px] text-vt-muted ml-1">{suffix}</span>
      </div>
      <div className="font-mono text-[9px] tracking-[2px] uppercase text-vt-muted2 mt-1">{label}</div>
    </div>
  );
};

const MiniChart = () => {
  const max = Math.max(...CHART_DATA);
  return (
    <div className="px-6 py-4 border-b border-vt-border">
      <div className="font-mono text-[9px] tracking-[2px] uppercase text-vt-muted2 mb-2.5">
        Throughput / Month
      </div>
      <div className="flex items-end gap-[3px] h-12">
        {CHART_DATA.map((v, i) => {
          const pct = (v / max) * 100;
          const isLast = i === CHART_DATA.length - 1;
          return (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${pct}%` }}
              transition={{ delay: 0.05 * i + 1, duration: 0.5, ease: "easeOut" }}
              className="flex-1 rounded-[1px]"
              style={{
                background: isLast
                  ? "#E8A020"
                  : `rgba(232,160,32,${0.2 + 0.5 * (pct / 100)})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// ── Slideshow Progress Bar ──
const SlideProgressBar = ({
  isActive,
  duration,
}: {
  isActive: boolean;
  duration: number;
}) => (
  <div className="h-[2px] bg-vt-border2 rounded-full overflow-hidden flex-1">
    {isActive ? (
      <motion.div
        key="active"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className="h-full bg-vt-accent rounded-full"
      />
    ) : (
      <div className="h-full w-0 bg-vt-accent rounded-full" />
    )}
  </div>
);

// ── Main Hero ──

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity   = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgScale  = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 20 });
  const sy = useSpring(my, { stiffness: 55, damping: 20 });

  const [clock, setClock] = useState("");

  // ── Slideshow state ──
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    if (!isPaused) {
      startTimer();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const goToSlide = (i: number) => {
    setSlideIndex(i);
    startTimer(); // reset timer on manual nav
  };

  const goNext = () => goToSlide((slideIndex + 1) % SLIDESHOW_IMAGES.length);
  const goPrev = () => goToSlide((slideIndex - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 18);
      my.set((e.clientY / window.innerHeight - 0.5) * 18);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  useEffect(() => {
    const tick = () => setClock(
      new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " IST"
    );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-vt-bg text-vt-text"
    >
      {/* Engineering grid background */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(232,160,32,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,160,32,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,160,32,0.06) 0%, transparent 70%)" }}
      />

      {/* ── TICKER ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 mt-14 h-9 flex items-center gap-10 px-10 border-b border-vt-border bg-vt-panel overflow-x-auto"
      >
        {[
          { k: "SYS_STATUS", v: "◆ OPERATIONAL", color: "text-green-400" },
          { k: "UPTIME",     v: "99.4%",          color: "text-vt-text" },
          { k: "ACTIVE UNITS", v: "47",            color: "text-vt-text" },
          { k: "LOAD AVG",   v: "↑ 2.4T/hr",      color: "text-green-400" },
          { k: "LOCATION",   v: "CHENNAI · TN · IN", color: "text-vt-text" },
          { k: "LOCAL TIME", v: clock,             color: "text-vt-accent" },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-mono text-[9px] tracking-[2px] uppercase text-vt-muted2 shrink-0">{t.k}</span>
            <span className={`font-mono text-[9px] tracking-[1px] ${t.color} shrink-0`}>{t.v}</span>
          </div>
        ))}
      </motion.div>

      {/* ── MAIN 3-COLUMN GRID ── */}
      <motion.div
        style={{
          y: contentY,
          opacity,
          gridTemplateColumns: "280px 1fr 300px",
          gridTemplateRows: "1fr 36px"
        }}
        className="relative z-10 grid min-h-[calc(100vh-92px)]"
      >

        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="border-r border-vt-border flex flex-col"
        >
          <PanelHeader left="System Index" right="001/06" />

          {SPECS.map((s) => (
            <div key={s.label} className="px-6 py-3.5 border-b border-vt-border flex flex-col gap-1">
              <div className="font-mono text-[9px] tracking-[2px] uppercase text-vt-muted2">{s.label}</div>
              <div className="text-sm font-semibold tracking-wide">{s.val}</div>
              <div className="text-[11px] text-vt-muted">{s.sub}</div>
            </div>
          ))}

          {METERS.map((m) => <MeterRow key={m.label} {...m} />)}

          <div className="mt-auto px-6 py-5 border-t border-vt-border">
            <div className="font-mono text-[9px] tracking-[2px] uppercase text-vt-muted2 mb-2">Coordinates</div>
            <div className="font-mono text-[11px] text-vt-muted leading-relaxed">
              <span className="text-vt-accent">N</span> 13.0827° &nbsp;
              <span className="text-vt-accent">E</span> 80.2707°<br />
              Chennai · Tamil Nadu · India
            </div>
          </div>
        </motion.div>

        {/* CENTER PANEL */}
        <div className="flex flex-col">

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="px-14 pt-12 pb-10 relative flex-shrink-0"
          >
            {/* Version annotation */}
            <div className="absolute top-12 right-14 flex flex-col items-end gap-1">
              <div className="font-mono text-[9px] tracking-[2px] uppercase text-vt-muted2 border border-vt-border2 px-2 py-1">
                Ver. 4.2.1
              </div>
              <div className="font-mono text-[10px] text-vt-accent">BUILD 2024-Q4</div>
            </div>

            {/* Kicker */}
            <div className="font-mono text-[10px] tracking-[4px] uppercase text-vt-accent mb-5 flex items-center gap-3">
              <span className="text-vt-muted2">//</span>
              Industrial Conveying Systems
            </div>

            {/* H1 */}
            {["Engineered", "to", "Convey."].map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%", skewY: 6 }}
                  animate={{ y: 0, skewY: 0 }}
                  transition={{ delay: 0.7 + i * 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className={`font-display block text-[clamp(72px,8vw,110px)] leading-[0.88] tracking-wide ${
                      word === "Convey." ? "text-vt-accent" : "text-vt-text"
                    }`}
                  >
                    {word}
                  </span>
                </motion.div>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.9 }}
              className="mt-6 text-base leading-relaxed text-vt-muted font-light max-w-lg"
            >
              Custom industrial conveyor systems for the world's most demanding operations —
              engineered for precision, uptime and longevity.
            </motion.p>
          </motion.div>

          {/* ── IMAGE SLIDESHOW ZONE ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex-1 relative border-t border-vt-border overflow-hidden min-h-[320px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Slideshow images — crossfade */}
            <AnimatePresence>
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ x: sx, y: sy }}
                className="absolute -inset-6"
              >
                <motion.img
                  src={SLIDESHOW_IMAGES[slideIndex].src}
                  alt={SLIDESHOW_IMAGES[slideIndex].label}
                  style={{ scale: imgScale }}
                  className="absolute inset-0 w-full h-full object-cover opacity-55 hover:opacity-65 transition-opacity duration-700"
                />
              </motion.div>
            </AnimatePresence>

            {/* Scan line */}
            <motion.div
              animate={{ top: ["-1px", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-px bg-vt-accent/40 z-20 pointer-events-none"
              style={{ boxShadow: "0 0 8px rgba(232,160,32,0.3)" }}
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to right, var(--color-vt-bg) 0%, transparent 14%, transparent 86%, var(--color-vt-bg) 100%),
                  linear-gradient(to bottom, transparent 50%, rgba(10,11,13,0.88) 100%)
                `,
              }}
            />

            {/* Corner brackets */}
            {[
              "top-4 left-4 border-t border-l",
              "top-4 right-4 border-t border-r",
              "bottom-4 left-4 border-b border-l",
              "bottom-4 right-4 border-b border-r",
            ].map((cls) => (
              <div key={cls} className={`absolute z-20 w-5 h-5 border-vt-accent ${cls}`} />
            ))}

            {/* Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div className="relative w-10 h-10">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-vt-accent/50" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-vt-accent/50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-vt-accent/40" />
              </div>
            </div>

            {/* Live badge + pause indicator */}
            <div className="absolute top-6 right-7 z-20 flex items-center gap-2 bg-vt-accent/12 border border-vt-accent/30 px-3 py-1.5">
              <span className={`w-[5px] h-[5px] rounded-full bg-vt-accent ${isPaused ? "" : "animate-pulse"}`} />
              <span className="font-mono text-[9px] tracking-[2px] uppercase text-vt-accent">
                {isPaused ? "Paused" : "Live Build"}
              </span>
            </div>

            {/* Slide counter */}
            <div className="absolute top-6 left-7 z-20 font-mono text-[9px] tracking-[2px] text-vt-muted2">
              <span className="text-vt-accent">{String(slideIndex + 1).padStart(2, "0")}</span>
              <span className="mx-1">/</span>
              <span>{String(SLIDESHOW_IMAGES.length).padStart(2, "0")}</span>
            </div>

            {/* ── Bottom controls row ── */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-7 pb-6">

              {/* Animated label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`label-${slideIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-4"
                >
                  <div className="font-mono text-[9px] tracking-[3px] uppercase text-vt-accent mb-1">
                    {SLIDESHOW_IMAGES[slideIndex].tag}
                  </div>
                  <div className="font-display text-2xl tracking-wide text-vt-text">
                    {SLIDESHOW_IMAGES[slideIndex].label}
                  </div>
                  <div className="font-mono text-[10px] text-vt-muted mt-0.5">
                    {SLIDESHOW_IMAGES[slideIndex].subtitle}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress bars + nav arrows row */}
              <div className="flex items-center gap-3">

                {/* Prev arrow */}
                <button
                  onClick={goPrev}
                  className="w-7 h-7 flex items-center justify-center border border-vt-border2 text-vt-muted2 hover:border-vt-accent hover:text-vt-accent transition-colors text-[11px] flex-shrink-0"
                >
                  ←
                </button>

                {/* Progress bars */}
                <div className="flex items-center gap-1.5 flex-1">
                  {SLIDESHOW_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className="flex-1 group relative"
                    >
                      <SlideProgressBar
                        isActive={i === slideIndex && !isPaused}
                        duration={SLIDE_DURATION}
                      />
                      {/* Filled bar for completed slides */}
                      {i < slideIndex && (
                        <div className="absolute inset-0 h-[2px] bg-vt-accent/50 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Next arrow */}
                <button
                  onClick={goNext}
                  className="w-7 h-7 flex items-center justify-center border border-vt-border2 text-vt-muted2 hover:border-vt-accent hover:text-vt-accent transition-colors text-[11px] flex-shrink-0"
                >
                  →
                </button>
              </div>
            </div>
          </motion.div>

          {/* CTA bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="flex items-center gap-8 px-14 py-7 border-t border-vt-border flex-shrink-0"
          >
            <a
              href="#products"
              className="group inline-flex items-center gap-3 bg-vt-accent text-vt-bg px-7 py-3.5 font-semibold text-xs tracking-[2px] uppercase hover:bg-orange-500 transition-colors"
            >
              Explore Systems
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#about"
              className="font-mono text-[10px] tracking-[2px] uppercase text-vt-muted hover:text-vt-accent transition-colors border-b border-transparent hover:border-vt-accent pb-px"
            >
              Discover Our Story
            </a>
            <div className="ml-auto flex items-center gap-3 font-mono text-[9px] tracking-[3px] uppercase text-vt-muted2">
              Scroll
              <div className="w-10 h-px bg-vt-border2 overflow-hidden relative">
                <motion.div
                  animate={{ x: [-40, 60] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-5 bg-vt-accent"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="border-l border-vt-border flex flex-col"
        >
          <PanelHeader left="Performance" right="Metrics" />

          {STATS.map((s) => <StatBlock key={s.label} {...s} />)}

          <MiniChart />

          <div className="flex-1 flex flex-col overflow-hidden">
            <PanelHeader left="Active Systems" right="↑ Live" />
            {SYSTEMS.map((s) => (
              <div key={s.name} className="flex items-center gap-3 px-6 py-3 border-b border-vt-border hover:bg-vt-accent/[0.04] transition-colors cursor-default">
                <div className={`w-[5px] h-[5px] rounded-full flex-shrink-0 ${s.active ? "bg-green-400" : "bg-vt-muted2"}`} />
                <div className="text-xs font-semibold flex-1 tracking-wide">{s.name}</div>
                <div className="font-mono text-[9px] tracking-[1px] uppercase text-vt-muted">{s.tag}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;