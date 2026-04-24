import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

/* ─────────────────────────────────────────────
   THEME TOKENS
───────────────────────────────────────────── */
const T = {
  bg:        "#ffffff",
  bgAlt:     "#f7f6f4",
  bgDark:    "#111110",
  border:    "rgba(0,0,0,0.09)",
  borderMid: "rgba(0,0,0,0.14)",
  accent:    "#2a37c8",
  ink:       "#111110",
  inkMid:    "#3a3835",
  inkBody:   "#5a5855",
  inkMute:   "#8a8784",
  inkFaint:  "#b0aeab",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const points = [
  {
    k: "I",
    num: "01",
    title: "In-house manufacturing",
    body: "Every component is engineered, fabricated and assembled under one roof — giving us total control over quality and project timelines.",
    stat: "100%",
    statLabel: "In-house",
  },
  {
    k: "II",
    num: "02",
    title: "High uptime systems",
    body: "We design for the operational reality of three-shift production. Our conveyors are built to run, not to be repaired.",
    stat: "99.6%",
    statLabel: "Avg uptime",
  },
  {
    k: "III",
    num: "03",
    title: "Low maintenance, by design",
    body: "Sealed bearings, accessible drive groups, and intelligent component selection keep total cost of ownership remarkably low.",
    stat: "−60%",
    statLabel: "Maint. cost",
  },
  {
    k: "IV",
    num: "04",
    title: "On-time delivery",
    body: "Best-in-class lead times backed by disciplined project management. When we commit a date, your line moves on that date.",
    stat: "98%",
    statLabel: "On-time rate",
  },
];

/* ─────────────────────────────────────────────
   POINT CARD
───────────────────────────────────────────── */
const PointCard = ({
  point,
  index,
  isLast,
}: {
  point: (typeof points)[number];
  index: number;
  isLast: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "64px 1fr auto",
        gap: "0 0",
        borderBottom: isLast ? "none" : `1px solid ${T.border}`,
        position: "relative",
        background: T.bg,
        transition: "background 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = T.bgAlt;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = T.bg;
      }}
    >
      {/* LEFT: vertical number column */}
      <div
        style={{
          borderRight: `1px solid ${T.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 48,
          paddingBottom: 48,
          gap: 0,
          position: "relative",
        }}
      >
        {/* roman numeral rotated */}
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: T.inkFaint,
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            userSelect: "none",
          }}
        >
          {point.k}
        </span>

        {/* dot indicator */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: T.accent,
            position: "absolute",
            bottom: -4,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        />
      </div>

      {/* MIDDLE: main content */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        style={{ padding: "48px 48px 48px 40px" }}
      >
        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.28em",
              color: T.accent,
              textTransform: "uppercase",
            }}
          >
            {point.num}
          </span>
          <span style={{ height: 1, width: 20, background: T.accent, display: "block" }} />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: T.inkMute,
              textTransform: "uppercase",
            }}
          >
            Why V Tech
          </span>
        </div>

        {/* title */}
        <h3
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(24px, 3.5vw, 40px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: T.ink,
            textTransform: "uppercase",
            margin: "0 0 18px",
          }}
        >
          {point.title}
        </h3>

        {/* body */}
        <p
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.75,
            color: T.inkBody,
            maxWidth: 520,
            margin: 0,
          }}
        >
          {point.body}
        </p>
      </motion.div>

      {/* RIGHT: stat block */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 + 0.15 }}
        style={{
          borderLeft: `1px solid ${T.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 48px",
          minWidth: 160,
          gap: 6,
        }}
      >
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: T.ink,
          }}
        >
          {point.stat}
        </div>
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: T.inkMute,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {point.statLabel}
        </div>
        <div
          style={{
            marginTop: 12,
            width: 32,
            height: 2,
            background: T.accent,
            borderRadius: 1,
          }}
        />
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
const Header = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: `1px solid ${T.border}`,
        minHeight: 320,
      }}
    >
      {/* left: headings */}
      <div
        style={{
          padding: "72px 60px",
          borderRight: `1px solid ${T.border}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              color: T.accent,
              textTransform: "uppercase",
            }}
          >
            03
          </span>
          <span style={{ height: 1, width: 28, background: T.accent, display: "block" }} />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.22em",
              color: T.inkMute,
              textTransform: "uppercase",
            }}
          >
            Why V Tech
          </span>
        </motion.div>

        {/* main title */}
        <div>
          <div style={{ overflow: "hidden", marginBottom: 6 }}>
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(32px, 5vw, 60px)",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                lineHeight: 0.95,
                color: T.ink,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Four reasons our
            </motion.h2>
          </div>
          <div style={{ overflow: "hidden", marginBottom: 6 }}>
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(32px, 5vw, 60px)",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                lineHeight: 0.95,
                color: T.ink,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              customers never
            </motion.h2>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(32px, 5vw, 60px)",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                lineHeight: 0.95,
                color: T.accent,
                fontStyle: "italic",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              look elsewhere.
            </motion.h2>
          </div>
        </div>
      </div>

      {/* right: summary grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.25 }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        }}
      >
        {[
          { label: "Founded", value: "2002" },
          { label: "Projects delivered", value: "800+" },
          { label: "Countries served", value: "12" },
          { label: "Engineers on-site", value: "85+" },
        ].map((item, i) => (
          <div
            key={item.label}
            style={{
              padding: "36px 40px",
              borderRight: i % 2 === 0 ? `1px solid ${T.border}` : "none",
              borderBottom: i < 2 ? `1px solid ${T.border}` : "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 6,
            }}
          >
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: T.ink,
              }}
            >
              {item.value}
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: T.inkMute,
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────── */
const ProgressBar = ({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: 63,
        top: 0,
        bottom: 0,
        width: 1,
        background: T.border,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          scaleY,
          originY: 0,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: T.accent,
        }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────
   BOTTOM STRIP
───────────────────────────────────────────── */
const BottomStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      style={{
        background: T.bgDark,
        padding: "36px 60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20,
      }}
    >
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(14px, 2.5vw, 22px)",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: "#f2ede8",
          textTransform: "uppercase",
        }}
      >
        Built to run.{" "}
        <span style={{ color: T.accent, fontStyle: "italic", fontWeight: 400 }}>
          Engineered to last.
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {["ISO 9001:2015", "CE Marked", "24/7 Support"].map((badge) => (
          <div key={badge} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: T.accent,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: "rgba(242,237,232,0.55)",
                textTransform: "uppercase",
              }}
            >
              {badge}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────── */
const WhyVTech = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,400;1,600;1,700;1,800;1,900&family=IBM+Plex+Sans:wght@300;400;500&display=swap');
      `}</style>

      <section
        id="why"
        ref={sectionRef}
        style={{ position: "relative", background: T.bg, width: "100%" }}
      >
        <Header />

        {/* point cards with scroll progress bar */}
        <div style={{ position: "relative" }}>
          <ProgressBar containerRef={sectionRef as React.RefObject<HTMLElement>} />
          {points.map((p, i) => (
            <PointCard key={p.k} point={p} index={i} isLast={i === points.length - 1} />
          ))}
        </div>

        <BottomStrip />
      </section>
    </>
  );
};

export default WhyVTech;