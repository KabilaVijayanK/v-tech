"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

/* ─── Floating Label Input ─────────────────────────────────────── */
const FloatingInput = ({
  label,
  type = "text",
  as = "input",
}: {
  label: string;
  type?: string;
  as?: "input" | "textarea";
}) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const shared = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className:
      "w-full bg-transparent border-0 border-b border-[#D1D5DB] outline-none pt-6 pb-2 text-[15px] font-light text-[#0A0A0A] focus:border-[#0A0A0A] transition-colors duration-400 resize-none placeholder-transparent",
  };

  return (
    <div className="relative">
      <motion.label
        animate={{
          y: active ? -18 : 0,
          fontSize: active ? "10px" : "14px",
          color: active ? "#0A0A0A" : "#9CA3AF",
          letterSpacing: active ? "0.18em" : "0.04em",
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-[6px] pointer-events-none font-mono uppercase"
      >
        {label}
      </motion.label>

      {as === "textarea" ? (
        <textarea rows={3} {...shared} />
      ) : (
        <input type={type} {...shared} />
      )}

      <motion.div
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 -bottom-[1px] h-[1.5px] bg-[#0A0A0A] origin-left"
      />
    </div>
  );
};

/* ─── 3-D tilt card wrapper ─────────────────────────────────────── */
const TiltCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mx.set((e.clientX - left) / width - 0.5);
    my.set((e.clientY - top) / height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Animated mesh-grid background (pure CSS) ──────────────────── */
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.045]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="eng-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0A0A0A" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#eng-grid)" />
    </svg>
    {/* accent corner marks */}
    {[
      "top-0 left-0",
      "top-0 right-0 rotate-90",
      "bottom-0 right-0 rotate-180",
      "bottom-0 left-0 -rotate-90",
    ].map((pos, i) => (
      <div key={i} className={`absolute ${pos} w-8 h-8`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 2 30 L 2 2 L 30 2" stroke="#0A0A0A" strokeWidth="1.5" opacity="0.15" />
        </svg>
      </div>
    ))}
  </div>
);

/* ─── Floating 3-D blueprint cube ──────────────────────────────── */
const BlueprintCube = () => {
  return (
    <div className="absolute right-[-40px] top-[-60px] w-48 h-48 opacity-[0.06] pointer-events-none"
      style={{ perspective: 600 }}>
      <motion.div
        animate={{ rotateX: [20, 40, 20], rotateY: [0, 360] }}
        transition={{ rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotateY: { duration: 14, repeat: Infinity, ease: "linear" } }}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%", position: "relative" }}
      >
        {/* 6 faces */}
        {[
          { transform: "translateZ(48px)" },
          { transform: "rotateY(180deg) translateZ(48px)" },
          { transform: "rotateY(90deg) translateZ(48px)" },
          { transform: "rotateY(-90deg) translateZ(48px)" },
          { transform: "rotateX(90deg) translateZ(48px)" },
          { transform: "rotateX(-90deg) translateZ(48px)" },
        ].map((style, i) => (
          <div
            key={i}
            className="absolute inset-0 border border-[#0A0A0A] bg-transparent"
            style={{ ...style, backfaceVisibility: "hidden" }}
          />
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Counter (animates numbers on view) ────────────────────────── */
const AnimatedStat = ({ value, label }: { value: string; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="border-l border-[#E5E7EB] pl-5"
  >
    <div className="text-[28px] font-bold tracking-tight text-[#0A0A0A] leading-none">{value}</div>
    <div className="mt-1 text-[11px] font-mono tracking-[0.2em] uppercase text-[#9CA3AF]">{label}</div>
  </motion.div>
);

/* ─── Main Contact section ──────────────────────────────────────── */
const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="relative bg-white overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <GridBackground />

      {/* top rule */}
      <div className="relative border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 py-5">
            <span className="font-mono text-[10px] tracking-[0.35em] text-[#9CA3AF] uppercase">06 — Contact</span>
            <div className="flex-1 h-[0.5px] bg-[#E5E7EB]" />
            <span className="font-mono text-[10px] tracking-[0.35em] text-[#9CA3AF] uppercase">V·TECH Industries</span>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pb-28 pt-16">
        <div className="grid grid-cols-12 gap-x-8 gap-y-20">

          {/* ── LEFT COLUMN ─────────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-14">

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2
                className="text-[44px] md:text-[58px] font-bold leading-[1.01] tracking-[-0.03em] text-[#0A0A0A]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Let's engineer{" "}
                <span
                  className="italic font-light"
                  style={{
                    background: "linear-gradient(110deg,#0A0A0A 30%,#6B7280 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  your next line.
                </span>
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed text-[#6B7280] max-w-sm">
                Tell us about your operation. Our engineering team will respond within one business day.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex gap-8"
            >
              <AnimatedStat value="24hrs" label="Response time" />
              <AnimatedStat value="200+" label="Projects delivered" />
              <AnimatedStat value="12yrs" label="Engineering" />
            </motion.div>

            {/* Contact info cards — tilt 3D */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-4"
            >
              {[
                {
                  tag: "Location",
                  body: (
                    <>
                      62/1, Mettuthangal, Thirumazhisai<br />
                      Chennai — 600124, Tamil Nadu, India
                    </>
                  ),
                },
                {
                  tag: "Phone",
                  body: (
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      <a href="tel:+917845922919" className="hover:text-[#0A0A0A] transition-colors">
                        +91 78459 22919
                      </a>
                      <span className="text-[#D1D5DB]">/</span>
                      <a href="tel:+919840890919" className="hover:text-[#0A0A0A] transition-colors">
                        +91 98408 90919
                      </a>
                    </div>
                  ),
                },
                {
                  tag: "Email",
                  body: (
                    <a
                      href="mailto:vignesh@vtechindustries.co.in"
                      className="hover:text-[#0A0A0A] transition-colors underline underline-offset-4 decoration-[#D1D5DB]"
                    >
                      vignesh@vtechindustries.co.in
                    </a>
                  ),
                },
              ].map(({ tag, body }) => (
                <TiltCard key={tag}>
                  <div
                    className="relative border border-[#E5E7EB] rounded-xl p-5 bg-white group hover:border-[#9CA3AF] transition-colors duration-300 overflow-hidden"
                    style={{ transform: "translateZ(0)" }}
                  >
                    {/* subtle inner highlight on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(ellipse at 10% 50%,rgba(0,0,0,0.02) 0%,transparent 70%)" }} />
                    <div className="font-mono text-[9px] tracking-[0.3em] text-[#9CA3AF] uppercase mb-2">{tag}</div>
                    <div className="text-[14px] font-light text-[#6B7280] leading-relaxed">{body}</div>
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — form ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-6 lg:col-start-7"
          >
            <TiltCard className="h-full">
              <div
                className="relative border border-[#E5E7EB] rounded-2xl p-8 md:p-12 bg-white overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* decorative blueprint cube */}
                <BlueprintCube />

                {/* subtle ruled lines in background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 h-[0.5px] bg-[#0A0A0A]"
                      style={{ top: `${14 + i * 12}%`, opacity: 0.025 }}
                    />
                  ))}
                </div>

                {/* form label */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[#0A0A0A] uppercase">
                    Start a conversation
                  </span>
                </div>

                {!sent ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="space-y-9"
                  >
                    <FloatingInput label="Full name" />
                    <FloatingInput label="Company" />
                    <FloatingInput label="Email address" type="email" />
                    <FloatingInput label="Tell us about your project" as="textarea" />

                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative inline-flex items-center gap-5 px-7 py-4 rounded-full bg-[#0A0A0A] text-white overflow-hidden"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* shimmer sweep */}
                        <motion.div
                          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500"
                          style={{ mixBlendMode: "overlay" }}
                        />
                        <span className="relative text-[13px] font-medium tracking-wide">Send enquiry</span>
                        <span className="relative flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white text-base transition-transform duration-500 group-hover:rotate-45">
                          →
                        </span>
                      </motion.button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-start gap-4 py-12"
                  >
                    <div className="w-12 h-12 rounded-full border border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A] text-xl">
                      ✓
                    </div>
                    <div>
                      <div
                        className="text-[26px] font-bold tracking-tight text-[#0A0A0A]"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        Message sent.
                      </div>
                      <p className="mt-2 text-[14px] font-light text-[#6B7280]">
                        We'll get back to you within one business day.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* bottom corner mark */}
                <div className="absolute bottom-4 right-4 opacity-10">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M 2 26 L 2 26 L 26 26 L 26 2" stroke="#0A0A0A" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* bottom rule */}
      <div className="border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#C9CDD4] uppercase">
            © 2024 V·TECH Industries Pvt. Ltd.
          </span>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#C9CDD4] uppercase">
            Chennai, Tamil Nadu
          </span>
        </div>
      </div>

      {/* Google fonts (load in your _document or layout) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');
      `}</style>
    </section>
  );
};

export default Contact;