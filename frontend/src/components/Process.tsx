"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";

/* ─── Types ─────────────────────────────────────────── */
interface Step {
  num: string;
  title: string;
  body: string;
  phase: string;
  animDelay: string;
}

interface Stat {
  value: string;
  label: string;
  countTarget: number | null;
  suffix: string;
  icon: JSX.Element;
}

/* ─── Data ──────────────────────────────────────────── */
const steps: Step[] = [
  {
    num: "01",
    title: "Design",
    body: "Deep discovery of your operation, layout and load profile to establish a precise performance baseline.",
    phase: "Phase one",
    animDelay: "0ms",
  },
  {
    num: "02",
    title: "Engineering",
    body: "3D modelling, simulation and component-level specification validated against real-world tolerances.",
    phase: "Phase two",
    animDelay: "140ms",
  },
  {
    num: "03",
    title: "Manufacturing",
    body: "Fabrication and assembly executed entirely within our ISO-certified facility under one roof.",
    phase: "Phase three",
    animDelay: "280ms",
  },
  {
    num: "04",
    title: "Delivery",
    body: "Installation, commissioning and lifetime engineering support from the same team that built it.",
    phase: "Phase four",
    animDelay: "420ms",
  },
];

const stats: Stat[] = [
  {
    value: "98%",
    label: "On-time delivery rate",
    countTarget: 98,
    suffix: "%",
    icon: (
      <svg viewBox="0 0 14 14" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" style={{ width: 14, height: 14 }}>
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" />
      </svg>
    ),
  },
  {
    value: "40+",
    label: "Years engineering excellence",
    countTarget: 40,
    suffix: "+",
    icon: (
      <svg viewBox="0 0 14 14" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" style={{ width: 14, height: 14 }}>
        <circle cx="7" cy="7" r="5" stroke="currentColor" />
        <path d="M7 4v3l2 2" stroke="currentColor" />
      </svg>
    ),
  },
  {
    value: "ISO",
    label: "Certified manufacturing facility",
    countTarget: null,
    suffix: "",
    icon: (
      <svg viewBox="0 0 14 14" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" style={{ width: 14, height: 14 }}>
        <path d="M7 2l1.5 3 3.5.5-2.5 2.5.5 3.5L7 10l-3 1.5.5-3.5L2 5.5 5.5 5z" stroke="currentColor" />
      </svg>
    ),
  },
];

/* ─── Sub-components ─────────────────────────────────── */

const Cube = ({ delayOffset }: { delayOffset: string }) => (
  <div style={{ width: 72, height: 72, marginBottom: 28, perspective: 240, perspectiveOrigin: "60% 40%" }}>
    <div
      style={{
        width: 52,
        height: 52,
        position: "relative",
        transformStyle: "preserve-3d",
        animation: `processCubeSpin 10s linear infinite`,
        animationDelay: delayOffset,
      }}
    >
      {(["front", "back", "left", "right", "top", "bottom"] as const).map((face) => {
        const faceStyles: Record<string, React.CSSProperties> = {
          front:  { transform: "translateZ(26px)",                  background: "rgba(192,57,43,0.10)", border: "1px solid rgba(192,57,43,0.25)" },
          back:   { transform: "rotateY(180deg) translateZ(26px)",   background: "rgba(192,57,43,0.04)", border: "1px solid rgba(192,57,43,0.12)" },
          left:   { transform: "rotateY(-90deg) translateZ(26px)",   background: "rgba(192,57,43,0.07)", border: "1px solid rgba(192,57,43,0.18)" },
          right:  { transform: "rotateY(90deg)  translateZ(26px)",   background: "rgba(192,57,43,0.07)", border: "1px solid rgba(192,57,43,0.18)" },
          top:    { transform: "rotateX(90deg)  translateZ(26px)",   background: "rgba(192,57,43,0.14)", border: "1px solid rgba(192,57,43,0.30)" },
          bottom: { transform: "rotateX(-90deg) translateZ(26px)",   background: "rgba(192,57,43,0.03)", border: "1px solid rgba(192,57,43,0.08)" },
        };
        return (
          <div
            key={face}
            style={{ position: "absolute", width: 52, height: 52, ...faceStyles[face] }}
          />
        );
      })}
    </div>
  </div>
);

const StepCard = ({ step, index }: { step: Step; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* Scroll reveal */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), index * 140);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  /* 3D tilt */
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const y = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    inner.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };

  const handleMouseLeave = () => {
    if (innerRef.current) {
      innerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
    setHovered(false);
  };

  const cubeDelays = ["0s", "-2.5s", "-5s", "-7.5s"];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRight: index < 3 ? "1.5px solid #111" : "none",
        padding: "44px 36px 68px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        background: hovered ? "#f8f6f3" : "#fff",
        transition: "background 0.3s ease",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(50px)",
        transitionProperty: "opacity, transform, background",
        transitionDuration: "0.75s",
        transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        perspective: 800,
      }}
    >
      {/* Red accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 3,
          background: "#2b3fc0",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Ghost number */}
      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 96,
          fontWeight: 900,
          color: hovered ? "rgba(192,57,43,0.07)" : "rgba(0,0,0,0.05)",
          lineHeight: 1,
          position: "absolute",
          top: 10, right: 16,
          pointerEvents: "none",
          userSelect: "none",
          transition: "color 0.3s",
          letterSpacing: "-0.02em",
        }}
      >
        {step.num}
      </span>

      {/* Card inner — tilt target */}
      <div
        ref={innerRef}
        style={{ transformStyle: "preserve-3d", transition: "transform 0.35s ease", position: "relative", zIndex: 1 }}
      >
        {/* Badge */}
        <div
          style={{
            width: 48, height: 48,
            border: "1.5px solid #111",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 32,
            background: hovered ? "#111" : "transparent",
            transition: "background 0.3s",
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 13, fontWeight: 700,
              color: hovered ? "#fff" : "#111",
              letterSpacing: "0.06em",
              transition: "color 0.3s",
            }}
          >
            {step.num}
          </span>
        </div>

        {/* 3D Cube */}
        <Cube delayOffset={cubeDelays[index]} />

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 30, fontWeight: 800,
            color: hovered ? "#2b4ec0" : "#111",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            marginBottom: 14,
            transition: "color 0.2s",
          }}
        >
          {step.title}
        </h3>

        {/* Body */}
        <p
          style={{
            fontSize: 14,
            color: "#777",
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: 220,
          }}
        >
          {step.body}
        </p>
      </div>

      {/* Card footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          padding: "16px 36px",
          borderTop: hovered ? "1px solid rgba(192,57,43,0.2)" : "1px solid #f0ece8",
          display: "flex", alignItems: "center", gap: 10,
          transition: "border-color 0.3s",
        }}
      >
        <span
          style={{
            width: 5, height: 5,
            borderRadius: "50%",
            background: "#1a1a8c",
            transform: hovered ? "scale(1)" : "scale(0)",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 10, fontWeight: 600,
            letterSpacing: "0.28em",
            color: "#bbb",
            textTransform: "uppercase",
          }}
        >
          {step.phase}
        </span>
      </div>
    </div>
  );
};

const StatItem = ({ stat, index }: { stat: Stat; index: number }) => {
  const [displayVal, setDisplayVal] = useState(stat.value);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || stat.countTarget === null) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const target = stat.countTarget as number;
          let current = 0;
          const stepVal = target / 40;
          const interval = setInterval(() => {
            current = Math.min(current + stepVal, target);
            setDisplayVal(Math.round(current) + stat.suffix);
            if (current >= target) clearInterval(interval);
          }, 25);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px 36px",
        borderRight: index < 2 ? "1.5px solid #111" : "none",
        position: "relative",
        overflow: "hidden",
        background: hovered ? "#fafaf9" : "#fff",
        transition: "background 0.3s",
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 2,
          background: "#c0392b",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 48, fontWeight: 900,
          color: "#111",
          letterSpacing: "-0.02em",
          display: "block",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {displayVal}
      </span>
      <span
        style={{
          fontSize: 11,
          color: "#999",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 400,
          display: "block",
        }}
      >
        {stat.label}
      </span>

      {/* Icon circle */}
      <div
        style={{
          position: "absolute",
          right: 28, bottom: 28,
          width: 36, height: 36,
          border: hovered ? "1px solid #c0392b" : "1px solid #e8e4df",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: hovered ? "rgba(192,57,43,0.06)" : "transparent",
          transition: "border-color 0.3s, background 0.3s",
          color: hovered ? "#c0392b" : "#bbb",
        }}
      >
        {stat.icon}
      </div>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────── */
const Process = () => {
  const [activeDot, setActiveDot] = useState(0);
  const [ctaHovered, setCtaHovered] = useState(false);

  /* Cycling dot indicator */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,700;1,800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes processFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes processCubeSpin {
          0%   { transform: rotateX(15deg) rotateY(0deg); }
          100% { transform: rotateX(15deg) rotateY(360deg); }
        }
        @keyframes processScanDown {
          0%   { top: 0; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes processDrawLine {
          to { stroke-dashoffset: 0; }
        }

        .process-eyebrow  { opacity: 0; transform: translateY(18px); animation: processFadeUp 0.6s ease forwards 0.1s; }
        .process-headline { opacity: 0; transform: translateY(28px); animation: processFadeUp 0.8s ease forwards 0.25s; }
        .process-flow     { opacity: 0; transform: translateY(10px); animation: processFadeUp 0.6s ease forwards 0.5s; }
        .process-stats    { opacity: 0; transform: translateY(20px); animation: processFadeUp 0.7s ease forwards 1.4s; }
        .process-strip    { opacity: 0; transform: translateY(10px); animation: processFadeUp 0.6s ease forwards 1.6s; }

        .process-flow-path {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: processDrawLine 2s cubic-bezier(0.4,0,0.2,1) forwards 0.9s;
        }
        .process-scan-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(192,57,43,0.4), transparent);
          z-index: 1;
          animation: processScanDown 6s ease-in-out infinite;
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .process-steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .process-headline-wrap { flex-direction: column !important; }
          .process-headline-meta { width: 100% !important; max-width: 480px; }
          .process-stat-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .process-section { padding: 60px 20px 0 !important; }
          .process-steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        className="process-section"
        id="process"
        style={{
          background: "#ffffff",
          padding: "120px 64px 0",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Blueprint grid */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Scan line */}
        <div className="process-scan-line" />

        {/* Corner marks */}
        {(["tl", "tr", "bl", "br"] as const).map((pos) => {
          const borderMap: Record<string, React.CSSProperties> = {
            tl: { top: 28, left: 28,  borderWidth: "2px 0 0 2px" },
            tr: { top: 28, right: 28, borderWidth: "2px 2px 0 0" },
            bl: { bottom: 0, left: 28,  borderWidth: "0 0 2px 2px" },
            br: { bottom: 0, right: 28, borderWidth: "0 2px 2px 0" },
          };
          return (
            <div
              key={pos}
              style={{
                position: "absolute",
                width: 56, height: 56,
                borderColor: "#111", borderStyle: "solid",
                zIndex: 1,
                ...borderMap[pos],
              }}
            />
          );
        })}

        {/* Inner container */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto" }}>

          {/* Eyebrow */}
          <div
            className="process-eyebrow"
            style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}
          >
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", color: "#c0392b", textTransform: "uppercase" }}>
              05
            </span>
            <span style={{ width: 44, height: 1.5, background: "#c0392b", display: "block" }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.35em", color: "#999", textTransform: "uppercase" }}>
              The Process
            </span>
          </div>

          {/* Headline + meta */}
          <div
            className="process-headline process-headline-wrap"
            style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 48, marginBottom: 72 }}
          >
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(56px, 7.5vw, 100px)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-0.01em",
                color: "#111",
                textTransform: "uppercase",
                maxWidth: 820,
                flex: 1,
              }}
            >
              From idea to
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "#352bc0", display: "block" }}>
                installed system,
              </em>
              in four moves.
            </h2>

            <div
              className="process-headline-meta"
              style={{ flexShrink: 0, width: 240, paddingTop: 12 }}
            >
              <p style={{ fontSize: 14, color: "#666", fontWeight: 300, lineHeight: 1.8, marginBottom: 28 }}>
                A disciplined engineering sequence from initial discovery through to commissioning — no gaps, no handoffs, no surprises.
              </p>
              <button
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: ctaHovered ? "#fff" : "#111",
                  border: "1.5px solid #111",
                  padding: "12px 24px",
                  cursor: "pointer",
                  background: ctaHovered ? "#111" : "transparent",
                  transition: "background 0.25s, color 0.25s",
                }}
              >
                Start a project
                <span style={{ position: "relative", display: "inline-block" }}>
                  <span
                    style={{
                      display: "block",
                      width: ctaHovered ? 22 : 16,
                      height: 1,
                      background: "currentColor",
                      transition: "width 0.25s",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        content: "''",
                        position: "absolute",
                        right: 0, top: -3,
                        width: 6, height: 6,
                        borderRight: "1.5px solid currentColor",
                        borderTop: "1.5px solid currentColor",
                        transform: "rotate(45deg)",
                        display: "block",
                      }}
                    />
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* Animated flow line */}
          <div className="process-flow" style={{ position: "relative", marginBottom: 0 }}>
            <svg
              style={{ width: "100%", height: 48, overflow: "visible", display: "block" }}
              viewBox="0 0 1200 48"
              preserveAspectRatio="none"
            >
              <line x1="300" y1="14" x2="300" y2="34" stroke="#ddd" strokeWidth="1" />
              <line x1="600" y1="14" x2="600" y2="34" stroke="#ddd" strokeWidth="1" />
              <line x1="900" y1="14" x2="900" y2="34" stroke="#ddd" strokeWidth="1" />
              <path
                className="process-flow-path"
                d="M 0 24 L 1170 24"
                fill="none"
                stroke="#111"
                strokeWidth="1"
              />
              <polygon points="1185,24 1166,17 1166,31" fill="#111" />
              {[
                { x: 150,  label: "DESIGN" },
                { x: 450,  label: "ENGINEERING" },
                { x: 750,  label: "MANUFACTURING" },
                { x: 1050, label: "DELIVERY" },
              ].map(({ x, label }) => (
                <text
                  key={label}
                  x={x} y={42}
                  fontFamily="'Barlow Condensed',sans-serif"
                  fontSize="9"
                  fill="#bbb"
                  letterSpacing="3"
                  textAnchor="middle"
                  fontWeight="600"
                >
                  {label}
                </text>
              ))}
              <circle cx="300" cy="24" r="3" fill="#c0392b" opacity="0.5" />
              <circle cx="600" cy="24" r="3" fill="#c0392b" opacity="0.5" />
              <circle cx="900" cy="24" r="3" fill="#c0392b" opacity="0.5" />
            </svg>
          </div>

          {/* Steps grid */}
          <div
            className="process-steps-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              border: "1.5px solid #111",
              borderBottom: "none",
              position: "relative",
            }}
          >
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>

          {/* Stats row */}
          <div
            className="process-stats process-stat-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              border: "1.5px solid #111",
              borderTop: "none",
            }}
          >
            {stats.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} index={i} />
            ))}
          </div>

          {/* Bottom strip */}
          <div
            className="process-strip"
            style={{
              border: "1.5px solid #111",
              borderTop: "none",
              padding: "20px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.3em", color: "#bbb", textTransform: "uppercase" }}>
              Engineering · Manufacturing · Delivery
            </span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 6, height: 6,
                    borderRadius: "50%",
                    background: activeDot === i ? "#c0392b" : "#e0dbd5",
                    display: "inline-block",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.3em", color: "#bbb", textTransform: "uppercase" }}>
              © 2025 — All rights reserved
            </span>
          </div>

        </div>
      </section>
    </>
  );
};

export default Process;