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
  accent:    "#2a3ac8",
  accentLight: "rgba(200,90,42,0.08)",
  ink:       "#111110",
  inkMid:    "#3a3835",
  inkBody:   "#5a5855",
  inkMute:   "#8a8784",
  inkFaint:  "#b0aeab",
};

/* ─────────────────────────────────────────────
   GRID TEXTURE (subtle dot grid)
───────────────────────────────────────────── */
const DotGrid = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage:
        "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />
);

/* ─────────────────────────────────────────────
   SECTION NAV ROW
───────────────────────────────────────────── */
const NavRow = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6 }}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "32px 60px",
      borderBottom: `1px solid ${T.border}`,
      position: "relative",
      zIndex: 1,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
        04
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
        Vision & Mission
      </span>
    </div>
    <span
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.22em",
        color: T.inkFaint,
        textTransform: "uppercase",
      }}
    >
      What drives us forward
    </span>
  </motion.div>
);

/* ─────────────────────────────────────────────
   STATEMENT HERO
───────────────────────────────────────────── */
const StatementHero = ({ isInView }: { isInView: boolean }) => (
  <div
    style={{
      padding: "80px 60px 72px",
      borderBottom: `1px solid ${T.border}`,
      position: "relative",
      zIndex: 1,
      overflow: "hidden",
    }}
  >
    {/* large decorative quote mark */}
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        top: 32,
        left: 44,
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "clamp(120px, 18vw, 220px)",
        fontWeight: 900,
        lineHeight: 1,
        color: "rgba(200,90,42,0.07)",
        userSelect: "none",
        pointerEvents: "none",
        letterSpacing: "-0.05em",
      }}
    >
      "
    </motion.div>

    {/* statement text */}
    <div style={{ overflow: "hidden", marginBottom: 6 }}>
      <motion.h2
        initial={{ y: "105%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(32px, 5.5vw, 68px)",
          fontWeight: 900,
          letterSpacing: "-0.025em",
          lineHeight: 0.95,
          color: T.ink,
          textTransform: "uppercase",
          margin: 0,
          maxWidth: 900,
        }}
      >
        We believe the world's hardest
      </motion.h2>
    </div>
    <div style={{ overflow: "hidden", marginBottom: 6 }}>
      <motion.h2
        initial={{ y: "105%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(32px, 5.5vw, 68px)",
          fontWeight: 900,
          letterSpacing: "-0.025em",
          lineHeight: 0.95,
          color: T.ink,
          textTransform: "uppercase",
          margin: 0,
          maxWidth: 900,
        }}
      >
        industries deserve conveyors that
      </motion.h2>
    </div>
    <div style={{ overflow: "hidden" }}>
      <motion.h2
        initial={{ y: "105%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(32px, 5.5vw, 68px)",
          fontWeight: 900,
          letterSpacing: "-0.025em",
          lineHeight: 0.95,
          color: T.accent,
          fontStyle: "italic",
          textTransform: "uppercase",
          margin: 0,
          maxWidth: 900,
        }}
      >
        never let them down.
      </motion.h2>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   ANIMATED DIVIDER (scroll-driven)
───────────────────────────────────────────── */
const ScrollDivider = ({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement>;
}) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center center"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "relative",
        height: 1,
        background: T.border,
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <motion.div
        style={{
          scaleX,
          transformOrigin: "left",
          position: "absolute",
          inset: 0,
          background: T.accent,
        }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────
   VISION + MISSION SPLIT
───────────────────────────────────────────── */
const VisionMission = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: `1px solid ${T.border}`,
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* ── VISION ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          padding: "64px 60px",
          borderRight: `1px solid ${T.border}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        {/* label */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: T.accent,
              textTransform: "uppercase",
            }}
          >
            — Vision
          </span>
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              fontStyle: "italic",
              color: T.inkFaint,
            }}
          >
            No.01
          </span>
        </div>

        {/* vision text */}
        <div>
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(22px, 3vw, 36px)",
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: T.inkMid,
              margin: "0 0 24px",
            }}
          >
            To be the most{" "}
            <span
              style={{
                fontWeight: 800,
                color: T.ink,
                fontStyle: "normal",
              }}
            >
              trusted supplier
            </span>{" "}
            and brand of industrial conveyors — recognised globally for quality,
            reliability, and engineering integrity.
          </p>

          {/* animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 56 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 2, background: T.accent, borderRadius: 1 }}
          />
        </div>

        {/* vision stat row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
            borderTop: `1px solid ${T.border}`,
            paddingTop: 28,
          }}
        >
          {[
            { n: "2002", l: "Est." },
            { n: "Global", l: "Reach" },
          ].map((s, i) => (
            <div
              key={s.n}
              style={{
                borderRight: i === 0 ? `1px solid ${T.border}` : "none",
                paddingRight: i === 0 ? 24 : 0,
                paddingLeft: i === 1 ? 24 : 0,
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: T.ink,
                  lineHeight: 1,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: T.inkFaint,
                  textTransform: "uppercase",
                  marginTop: 5,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── MISSION ── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{
          padding: "64px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 40,
          background: T.bgAlt,
        }}
      >
        {/* label */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: T.accent,
              textTransform: "uppercase",
            }}
          >
            — Mission
          </span>
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              fontStyle: "italic",
              color: T.inkFaint,
            }}
          >
            No.02
          </span>
        </div>

        {/* mission text */}
        <div>
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(22px, 3vw, 36px)",
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: T.inkMid,
              margin: "0 0 28px",
            }}
          >
            Without fail, we solve our customers' industrial conveying
            challenges with{" "}
            <span
              style={{
                fontWeight: 800,
                color: T.ink,
                fontStyle: "italic",
              }}
            >
              systems built to last.
            </span>
          </p>

          {/* tags */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Built in-house", "Engineered to spec", "Delivered on time"].map(
              (tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
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
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      color: T.inkMute,
                      textTransform: "uppercase",
                    }}
                  >
                    {tag}
                  </span>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* bordered commitment card */}
        <div
          style={{
            border: `1px solid ${T.borderMid}`,
            padding: "20px 24px",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            background: T.bg,
          }}
        >
          <div
            style={{
              width: 3,
              alignSelf: "stretch",
              background: T.accent,
              borderRadius: 1,
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 13,
              fontWeight: 400,
              lineHeight: 1.7,
              color: T.inkBody,
              margin: 0,
            }}
          >
            Every conveyor we build is a commitment — to uptime, to precision,
            and to the engineers who depend on it every shift.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   BOTTOM DARK STRIP
───────────────────────────────────────────── */
const BottomStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const pillars = [
    { icon: "◈", label: "Quality First" },
    { icon: "◉", label: "Engineering Integrity" },
    { icon: "◆", label: "Reliability" },
    { icon: "◎", label: "Customer Trust" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      style={{
        background: T.bgDark,
        padding: "0",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* top micro label */}
      <div
        style={{
          padding: "24px 60px 0",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.3em",
            color: "rgba(242,237,232,0.25)",
            textTransform: "uppercase",
          }}
        >
          Core pillars
        </span>
        <span
          style={{
            height: 1,
            flex: 1,
            background: "rgba(255,255,255,0.07)",
            display: "block",
          }}
        />
      </div>

      {/* pillars grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          marginTop: 20,
        }}
      >
        {pillars.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            style={{
              padding: "36px 40px",
              borderRight:
                i < pillars.length - 1
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "none",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <span
              style={{
                fontSize: 20,
                color: T.accent,
                lineHeight: 1,
                fontFamily: "monospace",
              }}
            >
              {p.icon}
            </span>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "rgba(242,237,232,0.75)",
                textTransform: "uppercase",
              }}
            >
              {p.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* bottom quote strip */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "28px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(13px, 2vw, 18px)",
            fontWeight: 700,
            letterSpacing: "-0.005em",
            color: "rgba(242,237,232,0.5)",
            textTransform: "uppercase",
          }}
        >
          Built to run.{" "}
          <span style={{ color: T.accent, fontStyle: "italic", fontWeight: 400 }}>
            Engineered to last.
          </span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {["ISO 9001:2015", "CE Marked"].map((b) => (
            <span
              key={b}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "rgba(242,237,232,0.3)",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: T.accent,
                  display: "inline-block",
                }}
              />
              {b}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────── */
const Vision = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,400;1,600;1,700;1,800;1,900&family=IBM+Plex+Sans:wght@300;400;500&display=swap');
      `}</style>

      <section
        id="vision"
        ref={sectionRef}
        style={{ position: "relative", background: T.bg, width: "100%", overflow: "hidden" }}
      >
        {/* dot grid texture — only on upper portion */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <DotGrid />
        </div>

        <div ref={headerRef}>
          <NavRow isInView={isInView} />
          <StatementHero isInView={isInView} />
        </div>

        <ScrollDivider sectionRef={sectionRef as React.RefObject<HTMLElement>} />

        <VisionMission />
        
      </section>
    </>
  );
};

export default Vision;