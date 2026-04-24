const items = [
  "Custom Engineering",
  "In-House Manufacturing",
  "High Uptime Systems",
  "Low Maintenance",
  "On-Time Delivery",
  "Lifetime Partnership",
];

const Marquee = () => {
  return (
    <div className="relative py-8 md:py-10 border-y border-border bg-secondary/60 overflow-hidden">
      <div className="flex animate-scroll-x whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-10 px-10 shrink-0">
            <span className="font-display font-semibold text-2xl md:text-4xl text-foreground/85 tracking-tight">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-secondary via-secondary/60 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-secondary via-secondary/60 to-transparent pointer-events-none" />
    </div>
  );
};

export default Marquee;
