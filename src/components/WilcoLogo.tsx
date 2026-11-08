import { useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface WilcoLogoProps {
  scrolled?: boolean;
  light?: boolean;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  animated?: boolean;
}

export default function WilcoLogo({
  scrolled = false,
  light = false,
  size = "md",
  showTagline = true,
  animated = true
}: WilcoLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();

  const rawY = useTransform(scrollY, [0, 600], [0, -8]);
  const rawRotate = useTransform(scrollY, [0, 600], [0, 2]);
  const y = useSpring(rawY, { stiffness: 120, damping: 25 });
  const rotate = useSpring(rawRotate, { stiffness: 120, damping: 25 });

  // Size dimensions
  const dimensions = {
    sm: { icon: 34, text: "text-xl", subText: "text-[7.5px]" },
    md: { icon: 42, text: "text-2xl", subText: "text-[9px]" },
    lg: { icon: 58, text: "text-4xl", subText: "text-xs" }
  }[size];

  return (
    <motion.div
      style={animated ? { y, rotate } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center gap-3.5 group cursor-pointer select-none"
      title="Wilco Equipment Co. - Sanitary Process Piping & Skid Fabrication"
    >
      {/* Precision Sanitary Emblem */}
      <div className="relative shrink-0">
        <div 
          className="relative rounded-2xl p-1.5 transition-all duration-500 shadow-xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            border: "1.5px solid rgba(59, 130, 246, 0.4)",
            boxShadow: isHovered 
              ? "0 0 25px rgba(37, 99, 235, 0.45), inset 0 0 15px rgba(59, 130, 246, 0.2)" 
              : "0 10px 20px -5px rgba(15, 23, 42, 0.5)"
          }}
        >
          {/* Subtle Shimmer Overlay on hover */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ${
              isHovered ? "translate-x-full" : "-translate-x-full"
            }`} 
          />

          <svg
            width={dimensions.icon}
            height={dimensions.icon}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform transition-transform duration-500 group-hover:scale-105"
          >
            <defs>
              {/* Metallic Stainless Steel Gradient */}
              <linearGradient id="stainlessSteel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="40%" stopColor="#cbd5e1" />
                <stop offset="70%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>

              {/* High-Pressure Liquid Flow Gradient */}
              <linearGradient id="processFluid" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>

              {/* Orbital Welding Glow Filter */}
              <filter id="weldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Blueprint Grid Lines */}
            <path d="M8 32H56" stroke="#334155" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.6" />
            <path d="M32 8V56" stroke="#334155" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.6" />

            {/* Outer Hexagonal Sanitary Pipe Flange Ring */}
            <polygon
              points="32,5 57,19 57,45 32,59 7,45 7,19"
              fill="none"
              stroke="#1e3a8a"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.8"
            />

            {/* Outer Process Pipe Tubes forming "W" with 90-degree Sanitary Radii */}
            {/* Left Pipe Leg */}
            <path
              d="M14 16 V38 C14 43 17 48 22 48 C27 48 30 43 32 37"
              fill="none"
              stroke="url(#stainlessSteel)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right Pipe Leg */}
            <path
              d="M50 16 V38 C50 43 47 48 42 48 C37 48 34 43 32 37"
              fill="none"
              stroke="url(#stainlessSteel)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inner Flow Core (The active fluid current running inside the sanitary line) */}
            <path
              d="M14 17 V38 C14 43 17 47 22 47 C27 47 30 42 32 37 C34 42 37 47 42 47 C47 47 50 43 50 38 V17"
              fill="none"
              stroke="url(#processFluid)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isHovered ? "animate-pulse" : ""}
            />

            {/* Tri-Clamp Sanitary Ferrules on Top Pipe Inlets (Signature Dairy/Pharma Fitting) */}
            {/* Left Tri-Clamp Flange */}
            <rect x="10" y="14" width="8" height="3.5" rx="1" fill="#e2e8f0" stroke="#0284c7" strokeWidth="0.8" />
            {/* Right Tri-Clamp Flange */}
            <rect x="46" y="14" width="8" height="3.5" rx="1" fill="#e2e8f0" stroke="#0284c7" strokeWidth="0.8" />

            {/* Bottom Elbow Weld Rings (Orbital TIG Weld Seams) */}
            <ellipse cx="22" cy="48" rx="2" ry="3" fill="#38bdf8" opacity="0.9" />
            <ellipse cx="42" cy="48" rx="2" ry="3" fill="#38bdf8" opacity="0.9" />

            {/* Central Mixproof Flow Hub & Impeller Core (The Heart of the System) */}
            <g transform="translate(32, 28)">
              {/* Outer Valve Seat Collar */}
              <circle r="7.5" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
              {/* Central Sanitary Rotary Hub */}
              <circle r="4" fill="#2563eb" />
              {/* 4-Way Impeller / Mixproof Flow Cross */}
              <path
                d="M-4.5 0 H4.5 M0 -4.5 V4.5"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={isHovered ? "animate-spin origin-center" : ""}
                style={{ transformOrigin: "0 0" }}
              />
              {/* Central Jewel / Welding Arc Core */}
              <circle r="1.5" fill="#38bdf8" filter="url(#weldGlow)" />
            </g>

            {/* Precision Dimension Tick Marks on side */}
            <line x1="10" y1="26" x2="6" y2="26" stroke="#60a5fa" strokeWidth="1" />
            <line x1="10" y1="34" x2="6" y2="34" stroke="#60a5fa" strokeWidth="1" />
            <line x1="54" y1="26" x2="58" y2="26" stroke="#60a5fa" strokeWidth="1" />
            <line x1="54" y1="34" x2="58" y2="34" stroke="#60a5fa" strokeWidth="1" />
          </svg>
        </div>

        {/* Small Active Process Indicator Dot */}
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-md shadow-blue-500/50">
          <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping" />
        </div>
      </div>

      {/* Typography Block */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span 
            className={`font-black ${dimensions.text} tracking-tighter uppercase italic transition-colors duration-300 font-sans ${
              light 
                ? "text-white group-hover:text-blue-400" 
                : (scrolled ? "text-slate-900 group-hover:text-blue-600" : "text-white group-hover:text-blue-400")
            }`}
          >
            WILCO
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500 italic bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
            CO.
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span 
              className={`font-black ${dimensions.subText} uppercase tracking-[0.28em] transition-colors ${
                light 
                  ? "text-blue-400" 
                  : (scrolled ? "text-slate-600" : "text-blue-400")
              }`}
            >
              PROCESS PIPING & SKIDS
            </span>
            <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
            <span className={`text-[8px] font-black tracking-widest ${light ? "text-slate-400" : (scrolled ? "text-slate-400" : "text-slate-300")}`}>
              EST. 1987
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
