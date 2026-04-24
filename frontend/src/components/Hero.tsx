import { motion, useScroll, useTransform, animate, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

// ── Replace with your real image imports ──
const SLIDESHOW_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=80",
    label: "Slat Chain Conveyors",
    tag: "Series 4200",
    subtitle: "Heavy Industrial Class",
    spec: "3,200 kg max load",
  },
  {
    src: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1400&q=80",
    label: "Belt Conveyors",
    tag: "Series 800",
    subtitle: "Light Industrial Class",
    spec: "0.3 – 3.5 m/s speed range",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
    label: "Powerised Turn Tables",
    tag: "Series PTT",
    subtitle: "Bulk Feed Class",
    spec: "360° indexing precision",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=80",
    label: "Roller Conveyors",
    tag: "Series RF",
    subtitle: "Medium Industrial Class",
    spec: "IP67 rated components",
  },
];

const SLIDE_DURATION = 5000;

// ── Font tokens — change these to switch fonts site-wide ──
const F_DISPLAY = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const F_MONO    = "'Roboto Mono', 'Courier New', monospace";

// ── 3D Rotating Gear SVG ──
const Gear3D = ({
  size = 120,
  teeth = 12,
  speed = 8,
  color = "#E8A020",
  opacity = 1,
  reverse = false,
}: {
  size?: number;
  teeth?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  reverse?: boolean;
}) => {
  const r      = size / 2;
  const innerR = r * 0.55;
  const toothH = r * 0.22;

  const points = Array.from({ length: teeth * 4 }).map((_, i) => {
    const angle  = (i / (teeth * 4)) * 2 * Math.PI - Math.PI / 2;
    const isOuter = i % 4 === 1 || i % 4 === 2;
    const rad    = isOuter ? r : r - toothH;
    return `${r + rad * Math.cos(angle)},${r + rad * Math.sin(angle)}`;
  });

  return (
    <motion.svg
      width={size} height={size}
      viewBox={`0 0 ${size} ${size}`}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      style={{ opacity }}
    >
      <defs>
        <radialGradient id={`gg-${teeth}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0.04" />
        </radialGradient>
        <filter id={`gs-${teeth}`}>
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor={color} floodOpacity="0.18" />
        </filter>
      </defs>
      <polygon points={points.join(" ")} fill={`url(#gg-${teeth})`} stroke={color} strokeWidth="1.5" filter={`url(#gs-${teeth})`} />
      <circle cx={r} cy={r} r={innerR}    fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx={r} cy={r} r={r * 0.18} fill="none" stroke={color} strokeWidth="1.5" />
      {[0, 90, 180, 270].map((deg) => (
        <line key={deg} x1={r} y1={r}
          x2={r + innerR * 0.9 * Math.cos((deg * Math.PI) / 180)}
          y2={r + innerR * 0.9 * Math.sin((deg * Math.PI) / 180)}
          stroke={color} strokeWidth="1" strokeOpacity="0.4"
        />
      ))}
    </motion.svg>
  );
};

// ── Orbit ring ──
const OrbitRing = ({
  radius, count, color, speed,
}: { radius: number; count: number; color: string; speed: number }) => (
  <motion.div
    style={{
      position: "absolute",
      width: radius * 2, height: radius * 2,
      top: "50%", left: "50%",
      marginLeft: -radius, marginTop: -radius,
      border: `1px solid ${color}22`,
      borderRadius: "50%",
    }}
    animate={{ rotate: 360 }}
    transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", width: 5, height: 5,
        background: color, borderRadius: "50%",
        top: "50%", left: "50%",
        marginLeft: -2.5, marginTop: -2.5,
        transform: `rotate(${(i / count) * 360}deg) translateX(${radius}px)`,
        opacity: 0.7,
        boxShadow: `0 0 6px ${color}`,
      }} />
    ))}
  </motion.div>
);

// ── Animated counter ──
function useCountUp(target: number, duration = 1.8, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const c = animate(0, target, { duration, ease: "easeOut", onUpdate: (v) => setValue(Math.round(v)) });
      return c.stop;
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return value;
}

// ── Stat block ──
const StatPill = ({ num, suffix, label, delay }: { num: number; suffix: string; label: string; delay: number }) => {
  const count = useCountUp(num, 2, delay);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 28px" }}
    >
      <div style={{ fontFamily: F_DISPLAY, fontSize: 34, fontWeight: 800, color: "#0A0A0A", lineHeight: 1, letterSpacing: "-1px" }}>
        {count}<span style={{ fontSize: 17, fontWeight: 700, color: "#E8A020" }}>{suffix}</span>
      </div>
      <div style={{ marginTop: 5, fontFamily: F_MONO, fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: "#999", fontWeight: 400 }}>
        {label}
      </div>
    </motion.div>
  );
};

// ── Slide progress bar ──
const SlideProgressBar = ({ isActive, duration }: { isActive: boolean; duration: number }) => (
  <div style={{ height: 2, background: "rgba(255,255,255,0.2)", borderRadius: 2, overflow: "hidden", flex: 1 }}>
    {isActive && (
      <motion.div
        key="active"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        style={{ height: "100%", background: "#E8A020", borderRadius: 2 }}
      />
    )}
  </div>
);

// ── 3D engineering scene ──
const EngineeringScene = () => (
  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", userSelect: "none" }}>
    <OrbitRing radius={220} count={6} color="#E8A020" speed={30} />
    <OrbitRing radius={160} count={4} color="#0A0A0A" speed={20} />
    <OrbitRing radius={100} count={3} color="#E8A020" speed={14} />

    {/* Center orb */}
    <motion.div
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", width: 90, height: 90, borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #FFFFFF 0%, #F5F5F5 40%, #E0E0E0 100%)",
        boxShadow: "0 0 0 2px #E8A02030, 0 0 40px #E8A02020, inset 0 2px 8px rgba(255,255,255,0.8), 4px 8px 20px rgba(0,0,0,0.12)",
        border: "1px solid #E8A02040",
      }}
    />

    {/* Pulse rings */}
    {[0, 1, 2].map((i) => (
      <motion.div key={i}
        style={{ position: "absolute", width: 90, height: 90, borderRadius: "50%", border: "1px solid #E8A02030" }}
        animate={{ scale: [1, 3.5], opacity: [0.5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: i * 1.16 }}
      />
    ))}

    {/* Gears */}
    <div style={{ position: "absolute", top: "calc(50% - 270px)", left: "calc(50% - 70px)" }}>
      <Gear3D size={140} teeth={14} speed={12} color="#E8A020" opacity={0.55} />
    </div>
    <div style={{ position: "absolute", bottom: "calc(50% - 260px)", right: "calc(50% - 60px)" }}>
      <Gear3D size={120} teeth={10} speed={10} color="#0A0A0A" opacity={0.13} reverse />
    </div>
    <div style={{ position: "absolute", top: "calc(50% - 50px)", left: "calc(50% - 290px)" }}>
      <Gear3D size={100} teeth={8}  speed={8}  color="#E8A020" opacity={0.30} reverse />
    </div>
    <div style={{ position: "absolute", top: "calc(50% - 50px)", right: "calc(50% - 290px)" }}>
      <Gear3D size={110} teeth={9}  speed={9}  color="#0A0A0A" opacity={0.11} />
    </div>
    <div style={{ position: "absolute", top: "calc(50% - 180px)", left: "calc(50% - 240px)" }}>
      <Gear3D size={70}  teeth={7}  speed={6}  color="#E8A020" opacity={0.22} />
    </div>
    <div style={{ position: "absolute", top: "calc(50% - 180px)", right: "calc(50% - 240px)" }}>
      <Gear3D size={75}  teeth={8}  speed={7}  color="#E8A020" opacity={0.18} reverse />
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════
// MAIN HERO
// ══════════════════════════════════════════════════════════
const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1],    ["0%", "20%"]);
  const opacity  = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused,   setIsPaused]   = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [clock,    setClock]        = useState("");
  const [mousePos, setMousePos]     = useState({ x: 0, y: 0 });

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setSlideIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length),
      SLIDE_DURATION
    );
  }, []);

  useEffect(() => {
    if (!isPaused) startTimer();
    else if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, startTimer]);

  const goToSlide = (i: number) => { setSlideIndex(i); startTimer(); };
  const goNext    = () => goToSlide((slideIndex + 1) % SLIDESHOW_IMAGES.length);
  const goPrev    = () => goToSlide((slideIndex - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length);

  useEffect(() => {
    const tick = () => setClock(
      new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " IST"
    );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({
      x: (e.clientX / window.innerWidth  - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  // Shared button style helper
  const navBtn = (base: React.CSSProperties) => ({
    ...base,
    transition: "background 0.2s, border-color 0.2s, color 0.2s",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roboto+Mono:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #ffffff;
          color: #0a0a0a;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        a { text-decoration: none; }
      `}</style>

      <section
        ref={ref} id="home"
        style={{
          minHeight: "100vh", width: "100%",
          overflow: "hidden", background: "#fff",
          position: "relative", fontFamily: F_DISPLAY,
        }}
      >
        {/* Grid background */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.028) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.028) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
        {/* Amber bloom */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(ellipse 70% 50% at 60% -10%, rgba(232,160,32,0.08) 0%, transparent 70%)",
        }} />

        {/* ── NAVBAR ── */}
        

        {/* ── MAIN TWO-COLUMN GRID ── */}
        <motion.div
          style={{
            y: contentY, opacity,
            position: "relative", zIndex: 10,
            display: "grid", gridTemplateColumns: "1fr 500px",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {/* ═══ LEFT PANEL ═══ */}
          <div style={{
            display: "flex", flexDirection: "column",
            padding: "64px 56px 48px",
            borderRight: "1px solid #EBEBEB",
            position: "relative", overflow: "hidden",
          }}>
            {/* 3D scene */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
              <EngineeringScene />
            </div>

            {/* Foreground text */}
            <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column" }}>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{ alignSelf: "flex-start", marginBottom: 32 }}
              >
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "#FFF8EE", border: "1px solid #E8A02038",
                  padding: "7px 16px",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "inline-block", animation: "pulse 2s infinite" }} />
                  <span style={{ fontFamily: F_MONO, fontSize: 9, letterSpacing: "1.8px", textTransform: "uppercase", color: "#C8880A", fontWeight: 500 }}>
                    Industrial Systems · Est. 2009
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <div style={{ marginBottom: 24 }}>
                {[
                  { text: "Engineered",  color: "#0A0A0A" },
                  { text: "to Move",     color: "#0A0A0A" },
                  { text: "the World.",  color: "#E8A020"  },
                ].map((line, i) => (
                  <div key={i} style={{ overflow: "hidden" }}>
                    <motion.div
                      initial={{ y: "110%", skewY: 3 }}
                      animate={{ y: 0, skewY: 0 }}
                      transition={{ delay: 0.5 + i * 0.12, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span style={{
                        display: "block",
                        fontFamily: F_DISPLAY,
                        fontWeight: 800,
                        fontSize: "clamp(52px, 5.8vw, 80px)",
                        lineHeight: 0.96,
                        letterSpacing: "-2.5px",
                        color: line.color,
                      }}>
                        {line.text}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Body copy */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 0.8 }}
                style={{
                  fontFamily: F_DISPLAY, fontSize: 15, fontWeight: 400,
                  lineHeight: 1.7, color: "#5A5A5A",
                  maxWidth: 460, marginBottom: 36,
                }}
              >
                Precision-engineered conveyor systems designed for the world's most demanding
                industrial environments — built for maximum throughput and minimal downtime.
              </motion.p>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 52 }}
              >
                <a href="#products"
                  style={{
                    fontFamily: F_DISPLAY, fontSize: 13, fontWeight: 600,
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "#E8A020", color: "#fff",
                    padding: "13px 26px",
                    boxShadow: "0 6px 24px rgba(232,160,32,0.28)",
                    transition: "background 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#D4900A"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#E8A020"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Explore Systems <span style={{ fontSize: 14 }}>→</span>
                </a>
                <a href="#about"
                  style={{
                    fontFamily: F_DISPLAY, fontSize: 13, fontWeight: 600,
                    color: "#0A0A0A", borderBottom: "1.5px solid #0A0A0A", paddingBottom: 2,
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#E8A020"; e.currentTarget.style.borderColor = "#E8A020"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#0A0A0A"; e.currentTarget.style.borderColor = "#0A0A0A"; }}
                >
                  Our Story
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.25 }}
                style={{ display: "flex", alignItems: "stretch", borderTop: "1px solid #EBEBEB", marginTop: "auto" }}
              >
                {[
                  { num: 15,  suffix: "+",   label: "Years Experience"   },
                  { num: 200, suffix: "+",   label: "Systems Deployed"   },
                  { num: 99,  suffix: ".4%", label: "Operational Uptime" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "stretch" }}>
                    {i > 0 && <div style={{ width: 1, background: "#EBEBEB" }} />}
                    <StatPill {...s} delay={1.35 + i * 0.14} />
                  </div>
                ))}

                {/* Scroll indicator */}
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, paddingLeft: 28 }}>
                  <span style={{ fontFamily: F_MONO, fontSize: 8, letterSpacing: "3px", textTransform: "uppercase", color: "#CCC" }}>Scroll</span>
                  <div style={{ width: 40, height: 1, background: "#DDD", overflow: "hidden", position: "relative" }}>
                    <motion.div
                      animate={{ x: [-40, 60] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      style={{ position: "absolute", inset: 0, width: 20, background: "#E8A020" }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ═══ RIGHT PANEL — SLIDESHOW ═══ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ display: "flex", flexDirection: "column", position: "relative" }}
          >
            {/* Image viewport */}
            <div
              style={{ flex: 1, position: "relative", overflow: "hidden", cursor: "pointer", minHeight: 480 }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Crossfade image */}
              <AnimatePresence>
                <motion.div
                  key={slideIndex}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute", inset: 0,
                    transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
                    transition: "transform 0.5s ease-out",
                  }}
                >
                  <img
                    src={SLIDESHOW_IMAGES[slideIndex].src}
                    alt={SLIDESHOW_IMAGES[slideIndex].label}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=80"; }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, transparent 50%, rgba(0,0,0,0.72) 100%)",
              }} />

              {/* Scan line */}
              <motion.div
                animate={{ top: ["-1px", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(232,160,32,0.45)", zIndex: 10, pointerEvents: "none", boxShadow: "0 0 8px rgba(232,160,32,0.32)" }}
              />

              {/* Corner brackets */}
              {[
                { top: 20, left: 20,  borderTop: "2px solid #E8A020", borderLeft:  "2px solid #E8A020" },
                { top: 20, right: 20, borderTop: "2px solid #E8A020", borderRight: "2px solid #E8A020" },
                { bottom: 20, left: 20,  borderBottom: "2px solid #E8A020", borderLeft:  "2px solid #E8A020" },
                { bottom: 20, right: 20, borderBottom: "2px solid #E8A020", borderRight: "2px solid #E8A020" },
              ].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: 22, height: 22, zIndex: 10, ...s }} />
              ))}

              {/* Slide counter */}
              <div style={{ position: "absolute", top: 24, left: 26, zIndex: 10, fontFamily: F_MONO, fontSize: 9, letterSpacing: "2px", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "#E8A020", fontWeight: 700 }}>{String(slideIndex + 1).padStart(2, "0")}</span>
                <span style={{ color: "rgba(255,255,255,0.35)" }}>/</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{String(SLIDESHOW_IMAGES.length).padStart(2, "0")}</span>
              </div>

              {/* Live / Paused badge */}
              <div style={{
                position: "absolute", top: 22, right: 26, zIndex: 10,
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(0,0,0,0.38)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(232,160,32,0.3)", padding: "5px 12px",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: isPaused ? "#777" : "#E8A020", display: "inline-block", animation: isPaused ? "none" : "pulse 1.5s infinite" }} />
                <span style={{ fontFamily: F_MONO, fontSize: 8, letterSpacing: "1.5px", textTransform: "uppercase", color: isPaused ? "#777" : "#E8A020", fontWeight: 500 }}>
                  {isPaused ? "Paused" : "Live"}
                </span>
              </div>

              {/* Slide label + controls */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "28px 28px 20px" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`lbl-${slideIndex}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div style={{ fontFamily: F_MONO, fontSize: 8, letterSpacing: "2px", textTransform: "uppercase", color: "#E8A020", marginBottom: 6, fontWeight: 500 }}>
                      {SLIDESHOW_IMAGES[slideIndex].tag}
                    </div>
                    <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: 21, color: "#fff", letterSpacing: "-0.4px", marginBottom: 3 }}>
                      {SLIDESHOW_IMAGES[slideIndex].label}
                    </div>
                    <div style={{ fontFamily: F_MONO, fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: "0.8px" }}>
                      {SLIDESHOW_IMAGES[slideIndex].spec}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress + arrows */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
                  <button onClick={goPrev}
                    style={{ width: 30, height: 30, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(0,0,0,0.32)", color: "#fff", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#E8A020"; e.currentTarget.style.background = "rgba(232,160,32,0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.background = "rgba(0,0,0,0.32)"; }}
                  >←</button>

                  <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                    {SLIDESHOW_IMAGES.map((_, i) => (
                      <button key={i} onClick={() => goToSlide(i)}
                        style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      >
                        <SlideProgressBar isActive={i === slideIndex && !isPaused} duration={SLIDE_DURATION} />
                        {i < slideIndex && <div style={{ height: 2, background: "rgba(232,160,32,0.55)", borderRadius: 2 }} />}
                      </button>
                    ))}
                  </div>

                  <button onClick={goNext}
                    style={{ width: 30, height: 30, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(0,0,0,0.32)", color: "#fff", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#E8A020"; e.currentTarget.style.background = "rgba(232,160,32,0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.background = "rgba(0,0,0,0.32)"; }}
                  >→</button>
                </div>
              </div>
            </div>

            {/* ── Info strip ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              style={{ borderTop: "1px solid #EBEBEB", display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              {[
                { label: "Load Capacity", val: "3,200 kg", pct: 82 },
                { label: "Uptime Index",  val: "99.4%",    pct: 99 },
              ].map((m, i) => (
                <div key={m.label} style={{ padding: "18px 24px", borderRight: i === 0 ? "1px solid #EBEBEB" : undefined }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontFamily: F_MONO, fontSize: 8, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B5B5B5", fontWeight: 400 }}>
                      {m.label}
                    </span>
                    <span style={{ fontFamily: F_DISPLAY, fontSize: 12, fontWeight: 700, color: "#0A0A0A" }}>
                      {m.val}
                    </span>
                  </div>
                  <div style={{ height: 3, background: "#F0F0F0", borderRadius: 2, overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.pct}%` }}
                      transition={{ duration: 1.6, ease: "easeOut", delay: 1.4 }}
                      style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, #E8A020, #F5C550)" }}
                    />
                  </div>
                </div>
              ))}

              {/* Location row */}
              <div style={{
                gridColumn: "1 / -1", borderTop: "1px solid #EBEBEB",
                padding: "13px 24px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ fontFamily: F_MONO, fontSize: 9, color: "#B5B5B5", letterSpacing: "0.5px" }}>
                  <span style={{ color: "#E8A020" }}>N</span> 13.0827°&nbsp;&nbsp;
                  <span style={{ color: "#E8A020" }}>E</span> 80.2707°
                  &nbsp;·&nbsp; Chennai, Tamil Nadu, India
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "inline-block", animation: "pulse 2s infinite" }} />
                  <span style={{ fontFamily: F_MONO, fontSize: 8, letterSpacing: "1.5px", textTransform: "uppercase", color: "#22C55E", fontWeight: 500 }}>
                    Systems Online
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── BOTTOM TICKER ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{
            position: "relative", zIndex: 10,
            height: 36, borderTop: "1px solid #EBEBEB",
            background: "#FAFAFA", overflow: "hidden",
            display: "flex", alignItems: "center",
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: 48,
            padding: "0 32px",
            animation: "ticker 30s linear infinite",
            whiteSpace: "nowrap",
          }}>
            {[
              { k: "System Status",   v: "◆ Operational",        color: "#22C55E" },
              { k: "Uptime",          v: "99.4%",                color: "#0A0A0A" },
              { k: "Active Units",    v: "47 Systems",           color: "#0A0A0A" },
              { k: "Load Average",    v: "↑ 2.4 T/hr",          color: "#22C55E" },
              { k: "Drive Type",      v: "Servo + Gearbox",      color: "#0A0A0A" },
              { k: "Speed Range",     v: "0.3 – 3.5 m/s",       color: "#E8A020" },
              { k: "Thermal Rating",  v: "94%",                  color: "#0A0A0A" },
              { k: "Location",        v: "Chennai · TN · India", color: "#0A0A0A" },
              { k: "Local Time",      v: clock,                  color: "#E8A020" },
              // duplicate for seamless loop
              { k: "System Status",   v: "◆ Operational",        color: "#22C55E" },
              { k: "Uptime",          v: "99.4%",                color: "#0A0A0A" },
              { k: "Active Units",    v: "47 Systems",           color: "#0A0A0A" },
              { k: "Load Average",    v: "↑ 2.4 T/hr",          color: "#22C55E" },
              { k: "Drive Type",      v: "Servo + Gearbox",      color: "#0A0A0A" },
              { k: "Speed Range",     v: "0.3 – 3.5 m/s",       color: "#E8A020" },
              { k: "Thermal Rating",  v: "94%",                  color: "#0A0A0A" },
              { k: "Location",        v: "Chennai · TN · India", color: "#0A0A0A" },
              { k: "Local Time",      v: clock,                  color: "#E8A020" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: F_MONO, fontSize: 8, letterSpacing: "1px", color: "#C5C5C5", fontWeight: 400 }}>{t.k}</span>
                <span style={{ fontFamily: F_MONO, fontSize: 8, letterSpacing: "0.5px", color: t.color, fontWeight: 600 }}>{t.v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;