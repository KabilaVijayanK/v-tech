"use client";

const items = [
  "Custom Engineering",
  "In-House Manufacturing",
  "High Uptime Systems",
  "Low Maintenance",
  "On-Time Delivery",
  "Lifetime Partnership",
];

const Marquee = () => {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-[#e0dbd0] bg-[#f7f5f0] py-[18px] select-none group">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#f7f5f0] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#f7f5f0] to-transparent pointer-events-none z-10" />

      {/* Scrolling track */}
      <div className="flex w-max animate-scroll-x group-hover:[animation-play-state:paused]">
        {repeated.map((text, i) => (
          <div key={i} className="inline-flex items-center px-8 shrink-0">
            <span
              className="text-[1.45rem] font-semibold tracking-[0.06em] text-[#1a1814] hover:text-[#8b6c42] transition-colors duration-300 whitespace-nowrap"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {text}
            </span>
            <span className="w-[5px] h-[5px] rounded-full bg-[#b89a6a] shrink-0 ml-8" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;