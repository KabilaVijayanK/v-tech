import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import slat from "@/assets/product-slat.jpg";
import roller from "@/assets/product-roller.jpg";
import belt from "@/assets/product-belt.jpg";
import modular from "@/assets/product-modular.jpg";
import turntable from "@/assets/product-turntable.jpg";
import cooling from "@/assets/product-cooling.jpg";

/* ─────────────────────────────────────────────
   THEME TOKENS  (white bg, full contrast)
───────────────────────────────────────────── */
const T = {
  bg:        "#ffffff",
  bgAlt:     "#f7f6f4",
  border:    "rgba(0,0,0,0.09)",
  borderMid: "rgba(0,0,0,0.15)",
  accent:    "#2039b5",
  ink:       "#111110",
  inkMid:    "#3a3835",
  inkBody:   "#5a5855",
  inkMute:   "#8a8784",
  inkFaint:  "#b0aeab",
  marquee:   "rgba(0,0,0,0.055)",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const products = [
  {
    num: "01",
    name: "Slat Chain Conveyors",
    tagline: "Heavy duty. Precision indexed.",
    desc: "Engineered for high-load applications where accurate positioning, durability and continuous motion are non-negotiable.",
    image: slat,
    specs: ["High Load", "Indexed Feed", "Continuous Run"],
    material: "Hardened Steel",
    capacity: "Up to 2,000 kg/m",
  },
  {
    num: "02",
    name: "Roller Conveyors",
    tagline: "Frictionless flow.",
    desc: "Powered and gravity roller systems that move products with minimal energy input and maximum reliability across long lines.",
    image: roller,
    specs: ["Powered", "Gravity", "Long Run"],
    material: "Galvanised Steel",
    capacity: "Up to 800 kg/m",
  },
  {
    num: "03",
    name: "Belt Conveyors",
    tagline: "Quiet. Smooth. Universal.",
    desc: "From food-grade to industrial belts, our belt conveyors deliver consistent throughput with the gentleness fragile loads require.",
    image: belt,
    specs: ["Food Grade", "Industrial", "Fragile-Safe"],
    material: "PVC / PU / SS",
    capacity: "Up to 500 kg/m",
  },
  {
    num: "04",
    name: "Modular Conveyors",
    tagline: "Curve, climb, configure.",
    desc: "Plastic modular belting that bends through your floor plan — turning corners, inclining, and adapting as your operation evolves.",
    image: modular,
    specs: ["Curved", "Incline", "Configurable"],
    material: "Plastic Modular Belt",
    capacity: "Up to 300 kg/m",
  },
  {
    num: "05",
    name: "Powerised Turn Tables",
    tagline: "Direction, redefined.",
    desc: "Compact rotation platforms that re-orient products mid-line — eliminating manual handling and keeping the line moving.",
    image: turntable,
    specs: ["360° Rotation", "Mid-Line", "Compact"],
    material: "Mild Steel / SS",
    capacity: "Up to 1,200 kg",
  },
  {
    num: "06",
    name: "Cooling & Drying Conveyors",
    tagline: "Engineered atmospheres.",
    desc: "Dedicated cooling and drying tunnels that hold precise dwell times and surface conditions across every cycle.",
    image: cooling,
    specs: ["Tunnel", "Dwell Control", "Thermal"],
    material: "SS 304 / Aluminium",
    capacity: "Custom dwell time",
  },
];

/* ─────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────── */
const Marquee = () => (
  <div
    style={{
      overflow: "hidden",
      borderTop: `1px solid ${T.border}`,
      borderBottom: `1px solid ${T.border}`,
      padding: "18px 0",
      background: T.bgAlt,
      pointerEvents: "none",
      userSelect: "none",
    }}
  >
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      style={{ display: "flex", whiteSpace: "nowrap" }}
    >
      {[...Array(2)].map((_, i) => (
        <span
          key={i}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(52px, 10vw, 88px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: T.marquee,
            lineHeight: 1,
            paddingRight: "4vw",
            textTransform: "uppercase",
          }}
        >
          MOTION&nbsp;&nbsp;·&nbsp;&nbsp;PRECISION&nbsp;&nbsp;·&nbsp;&nbsp;UPTIME&nbsp;&nbsp;·&nbsp;&nbsp;RELIABILITY&nbsp;&nbsp;·&nbsp;&nbsp;
        </span>
      ))}
    </motion.div>
  </div>
);

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
const SectionHeader = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} style={{ padding: "80px 60px 0", position: "relative", background: T.bg }}>
      {/* eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
          02
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
          The Range
        </span>
      </motion.div>

      {/* heading line 1 */}
      <div style={{ overflow: "hidden", marginBottom: 6 }}>
        <motion.h2
          initial={{ y: "110%" }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 900,
            letterSpacing: "-0.025em",
            lineHeight: 0.95,
            color: T.ink,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Six Families of
        </motion.h2>
      </div>

      {/* heading line 2 */}
      <div style={{ overflow: "hidden", marginBottom: 44 }}>
        <motion.h2
          initial={{ y: "110%" }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 900,
            letterSpacing: "-0.025em",
            lineHeight: 0.95,
            color: T.accent,
            fontStyle: "italic",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Conveyor Systems.
        </motion.h2>
      </div>

      {/* stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, auto)",
          justifyContent: "start",
          gap: "0 60px",
          paddingBottom: 56,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        {[
          { n: "6",    l: "System families" },
          { n: "100%", l: "Custom-engineered" },
          { n: "ISO",  l: "Certified mfg." },
        ].map((s) => (
          <div key={s.n}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 36,
                fontWeight: 800,
                color: T.ink,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: T.inkMute,
                textTransform: "uppercase",
                marginTop: 6,
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   PRODUCT PANEL
───────────────────────────────────────────── */
const ProductPanel = ({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY     = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.04]);

  const reverse = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: 520,
        borderBottom: `1px solid ${T.border}`,
        background: hovered ? T.bgAlt : T.bg,
        transition: "background 0.4s ease",
      }}
    >
      {/* ── IMAGE ── */}
      <div
        style={{
          order: reverse ? 2 : 1,
          position: "relative",
          overflow: "hidden",
          background: "#1a1917",
          minHeight: 360,
        }}
      >
        {/* accent slide line */}
        <motion.div
          animate={{ height: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 3,
            background: T.accent,
            zIndex: 10,
          }}
        />

        {/* number badge */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            zIndex: 8,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.75)",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.18)",
            padding: "5px 12px",
            textTransform: "uppercase",
          }}
        >
          {product.num}
        </div>

        {/* custom build tag */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            zIndex: 8,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase",
          }}
        >
          Custom Build
        </div>

        {/* parallax image */}
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            y: imgY,
            scale: imgScale,
            filter: hovered
              ? "brightness(0.62) saturate(0.9)"
              : "brightness(0.52) saturate(0.8)",
            transition: "filter 0.5s ease",
          }}
        />

        {/* overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: reverse
              ? "linear-gradient(225deg,rgba(0,0,0,0.4) 0%,transparent 55%)"
              : "linear-gradient(135deg,rgba(0,0,0,0.4) 0%,transparent 55%)",
            zIndex: 4,
          }}
        />

        {/* bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "38%",
            background: "linear-gradient(to top,rgba(0,0,0,0.45) 0%,transparent 100%)",
            zIndex: 5,
          }}
        />
      </div>

      {/* ── TEXT ── */}
      <div
        style={{
          order: reverse ? 1 : 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 56px",
          borderLeft:  reverse ? "none"              : `1px solid ${T.border}`,
          borderRight: reverse ? `1px solid ${T.border}` : "none",
        }}
      >
        {/* top block */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {/* eyebrow */}
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.28em",
                color: T.inkFaint,
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Product / {product.num}
            </div>

            {/* name */}
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(26px, 3.5vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: T.ink,
                textTransform: "uppercase",
                margin: "0 0 14px",
              }}
            >
              {product.name}
            </h3>

            {/* tagline */}
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(16px, 2vw, 22px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: T.accent,
                margin: "0 0 20px",
                letterSpacing: "0.01em",
              }}
            >
              {product.tagline}
            </p>

            {/* description */}
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.75,
                color: T.inkBody,
                maxWidth: 380,
                margin: 0,
              }}
            >
              {product.desc}
            </p>
          </motion.div>
        </div>

        {/* bottom block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          {/* spec table */}
          <div
            style={{
              borderTop: `1px solid ${T.border}`,
              paddingTop: 24,
              marginTop: 32,
              marginBottom: 20,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px 24px",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: T.inkFaint,
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Material
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.inkMid,
                  letterSpacing: "0.04em",
                }}
              >
                {product.material}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: T.inkFaint,
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Capacity
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.inkMid,
                  letterSpacing: "0.04em",
                }}
              >
                {product.capacity}
              </div>
            </div>
          </div>

          {/* spec pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 28 }}>
            {product.specs.map((s) => (
              <motion.span
                key={s}
                animate={{
                  borderColor: hovered ? T.accent              : T.border,
                  color:       hovered ? T.accent              : T.inkMute,
                  background:  hovered ? "rgba(200,90,42,0.07)" : "transparent",
                }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  border: `1px solid ${T.border}`,
                  padding: "5px 12px",
                  display: "inline-block",
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
            <motion.div
              animate={{
                background:  hovered ? T.accent : "transparent",
                borderColor: hovered ? T.accent : T.borderMid,
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: 36,
                height: 36,
                border: `1px solid ${T.borderMid}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path
                  d="M2 9L9 2M9 2H4.5M9 2V6.5"
                  stroke={hovered ? "#fff" : T.inkMid}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: T.inkMute,
              }}
            >
              Explore Specification
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   BOTTOM CTA BANNER
───────────────────────────────────────────── */
const BottomCTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "44px 60px",
        borderTop: `1px solid ${T.border}`,
        background: T.bgAlt,
        flexWrap: "wrap",
        gap: 24,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(18px, 3vw, 28px)",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: T.ink,
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Every system custom-engineered.
        </div>
        <div
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13,
            fontWeight: 400,
            color: T.inkBody,
          }}
        >
          No off-the-shelf compromises. No generic answers.
        </div>
      </div>

      <motion.button
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        animate={{
          background:  hov ? T.accent : T.ink,
          borderColor: hov ? T.accent : T.ink,
        }}
        transition={{ duration: 0.25 }}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          border: `1px solid ${T.ink}`,
          padding: "14px 32px",
          background: T.ink,
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        Request a Custom Build
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 8L8 2M8 2H4M8 2V6"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────── */
const Products = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,400;1,600;1,700;1,800;1,900&family=IBM+Plex+Sans:wght@300;400;500&display=swap');
    `}</style>

    <section
      id="products"
      style={{ position: "relative", background: "#ffffff", width: "100%" }}
    >
      <SectionHeader />
      <Marquee />
      <div>
        {products.map((p, i) => (
          <ProductPanel key={p.num} product={p} index={i} />
        ))}
      </div>
      <BottomCTA />
    </section>
  </>
);

export default Products;