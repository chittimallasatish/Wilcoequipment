import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Wrench, 
  Settings, 
  Factory, 
  Cpu, 
  Wind, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ArrowRight,
  Eye,
  Layers,
  Activity
} from "lucide-react";

interface ProcessNode {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  xPercent: number;
  yPercent: number;
  image: string;
  tagline: string;
  specs: { label: string; value: string }[];
  keyTypes: string[];
  brands: string[];
  standards: string[];
}

const processNodes: ProcessNode[] = [
  {
    id: "pumps",
    title: "Sanitary Pumps",
    subtitle: "High-Efficiency Hygienic Fluid Transfer",
    icon: Wrench,
    xPercent: 12,
    yPercent: 55,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=900",
    tagline: "Gentle product handling for high-viscosity foods, dairy creams, and sterile injectables.",
    specs: [
      { label: "Flow Rate Capacity", value: "Up to 1,200 GPM" },
      { label: "Surface Finish", value: "Ra < 20 μin Electropolished" },
      { label: "Material Grade", value: "316L Stainless Steel" },
      { label: "Standards", value: "3-A, FDA, EHEDG" }
    ],
    keyTypes: ["Centrifugal Pumps", "Positive Displacement", "Air Diaphragm", "High-Shear Mixers"],
    brands: ["Alfa Laval", "Fristam", "SPX Flow", "Wright Pumps", "Ampco Pumps", "Admix", "Murzan", "Axiflow", "Bell & Gossett"],
    standards: ["3-A Certified", "FDA Compliant", "USDA Accepted"]
  },
  {
    id: "valves",
    title: "Sanitary Valve Matrix",
    subtitle: "Fail-Safe Routing & Mixproof Automation",
    icon: Settings,
    xPercent: 32,
    yPercent: 30,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=900",
    tagline: "Zero-cross-contamination valve manifolds designed with pneumatic automation and feedback control.",
    specs: [
      { label: "Leak Detection", value: "Double Seat Cavity Venting" },
      { label: "Control Head", value: "IO-Link / AS-Interface" },
      { label: "Operating Pressure", value: "Up to 150 PSI" },
      { label: "Cleaning Method", value: "Full CIP / SIP Capable" }
    ],
    keyTypes: ["Mixproof Double-Seat", "Sanitary Seat Valves", "Butterfly Valves", "Aseptic Diaphragm", "Sampling Ports"],
    brands: ["Alfa Laval", "Pentair-Sudmo", "GEA Tuchenhagen", "SPX", "Definox", "Tru-Flo", "Burkert", "Schubert & Salzer", "SVF Flow", "Lumaco"],
    standards: ["ASME BPE", "3-A Sanitary", "ISO 9001"]
  },
  {
    id: "piping",
    title: "Orbital Welded Piping",
    subtitle: "High-Purity Pharmaceutical & Food Grade",
    icon: Layers,
    xPercent: 52,
    yPercent: 68,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=900",
    tagline: "Machine-welded closed chamber orbital TIG welding for crevice-free internal joint uniformity.",
    specs: [
      { label: "Weld Method", value: "Closed Chamber Orbital TIG" },
      { label: "Internal Inspection", value: "100% Video Borescope Logged" },
      { label: "Wall Thickness", value: "Schedule 5S / 10S / Sanitary Tube" },
      { label: "Passivation", value: "ASTM A967 Citric/Nitric" }
    ],
    keyTypes: ["Sanitary Tri-Clamp", "Orbital Tube Welds", "Bevel Seat", "Custom Slope Headers"],
    brands: ["Alfa Laval Fittings", "VNE", "Top Line", "QMI", "United Industries", "Rath", "Wilco Flow Panels", "AWI", "Strahman"],
    standards: ["ASME BPE", "AWS D18.1/D18.2", "3-A Accepted"]
  },
  {
    id: "skids",
    title: "Modular CIP Skids",
    subtitle: "Turnkey Clean-In-Place & Blending Units",
    icon: Factory,
    xPercent: 72,
    yPercent: 35,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=900",
    tagline: "Pre-assembled and pre-wired skid packages for pasteurization, chemical wash, and recipe dosing.",
    specs: [
      { label: "Tank Capacity", value: "100 to 3,000+ Gallons" },
      { label: "Automation", value: "Allen Bradley / Siemens PLC" },
      { label: "Heating", value: "Steam Heat Exchanger / Electric" },
      { label: "Footprint", value: "Compact Stainless Tubular Frame" }
    ],
    keyTypes: ["CIP Wash Skids", "Valve Matrix Panels", "HTST Pasteurizers", "Inline Blending Skids", "Booster Pump Packages"],
    brands: ["Wilco Engineered Skids", "Alfa Laval Plates", "Anderson Instrumentation", "Burkert Manifolds"],
    standards: ["UL 508A Panel Shop", "ASME Section IX", "3-A Certified"]
  },
  {
    id: "instrumentation",
    title: "Process Instrumentation",
    subtitle: "Coriolis Flow, Pressure & Analytical",
    icon: Cpu,
    xPercent: 88,
    yPercent: 65,
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=900",
    tagline: "Real-time mass flow, level, temperature, and conductivity tracking across critical sanitary lines.",
    specs: [
      { label: "Accuracy", value: "±0.05% Mass Flow" },
      { label: "Process Connection", value: "Tri-Clamp / Varivent" },
      { label: "Outputs", value: "4-20mA HART / Ethernet / IO-Link" },
      { label: "Ingress Protection", value: "IP69K Washdown Proof" }
    ],
    keyTypes: ["Coriolis Flowmeters", "Sanitary Pressure Transmitters", "Conductivity Sensors", "Turbidity & Brix Analyzers"],
    brands: ["Endress+Hauser", "Micro Motion Emerson", "Anderson-Negele", "Chicago Stainless", "Lumenite", "Rosemount"],
    standards: ["3-A Sanitary", "EHEDG", "FM Approved"]
  }
];

interface InteractiveProcessExplorerProps {
  onOpenQuote: (service?: string) => void;
}

export default function InteractiveProcessExplorer({ onOpenQuote }: InteractiveProcessExplorerProps) {
  const [selectedId, setSelectedId] = useState<string>("pumps");
  const activeNode = processNodes.find((n) => n.id === selectedId) || processNodes[0];

  return (
    <div className="relative w-full bg-slate-950 text-white rounded-[3rem] p-6 sm:p-10 lg:p-14 overflow-hidden border border-slate-800 shadow-2xl">
      {/* Background Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
          backgroundSize: "28px 28px"
        }}
      />

      {/* Decorative Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
              Interactive System Architecture
            </span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter text-white">
            Visual Process <span className="text-blue-500">Piping Blueprint</span>
          </h3>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl font-medium">
            Click any station on the sanitary flow diagram below to inspect equipment specs, engineering capabilities, and authorized brands.
          </p>
        </div>

        {/* Station Selectors on Mobile/Tablet */}
        <div className="flex flex-wrap gap-2">
          {processNodes.map((node) => {
            const Icon = node.icon;
            const isSelected = node.id === selectedId;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedId(node.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all duration-300 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                    : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {node.title.split(" ")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Blueprint Schematic Visualization */}
      <div className="relative z-10 bg-slate-900/60 rounded-3xl p-4 sm:p-8 border border-slate-800/90 mb-10 overflow-hidden">
        <div className="relative h-44 sm:h-56 md:h-64 w-full">
          {/* Animated SVG Pipeline Network */}
          <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="flowPulse" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
                <stop offset="50%" stopColor="#93c5fd" stopOpacity="1" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Base Pipe Line - Lower Path */}
            <path
              d="M 50 180 L 150 180 Q 200 180 200 120 L 200 100 Q 200 80 260 80 L 400 80 Q 450 80 450 160 L 450 200 Q 450 220 520 220 L 680 220 Q 720 220 720 110 L 800 110 Q 860 110 860 190 L 950 190"
              fill="none"
              stroke="#1e293b"
              strokeWidth="18"
              strokeLinecap="round"
            />
            {/* Inner Metallic Pipe Core */}
            <path
              d="M 50 180 L 150 180 Q 200 180 200 120 L 200 100 Q 200 80 260 80 L 400 80 Q 450 80 450 160 L 450 200 Q 450 220 520 220 L 680 220 Q 720 220 720 110 L 800 110 Q 860 110 860 190 L 950 190"
              fill="none"
              stroke="url(#pipeGradient)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Pulsing Fluid Flow Animation */}
            <path
              d="M 50 180 L 150 180 Q 200 180 200 120 L 200 100 Q 200 80 260 80 L 400 80 Q 450 80 450 160 L 450 200 Q 450 220 520 220 L 680 220 Q 720 220 720 110 L 800 110 Q 860 110 860 190 L 950 190"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="4"
              strokeDasharray="16 28"
              className="animate-flow-dash"
            />
          </svg>

          {/* Interactive Node Hotspots */}
          {processNodes.map((node) => {
            const Icon = node.icon;
            const isSelected = node.id === selectedId;
            return (
              <motion.button
                key={node.id}
                onClick={() => setSelectedId(node.id)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  left: `${node.xPercent}%`,
                  top: `${node.yPercent}%`
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20 focus:outline-none`}
              >
                <div className="relative">
                  {/* Ping effect when selected */}
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-2xl bg-blue-500/40 animate-ping" />
                  )}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-blue-600/50 ring-4 ring-blue-400/30 scale-110"
                        : "bg-slate-800 text-blue-400 hover:bg-slate-700 hover:text-white border border-slate-700"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                  <span
                    className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${
                      isSelected ? "text-blue-400 bg-slate-950/80 font-extrabold" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  >
                    {node.title}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Active Component Deep Dive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 grid lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Visual Render Column */}
          <div className="lg:col-span-5 relative group rounded-3xl overflow-hidden border border-slate-800 shadow-2xl min-h-[320px] lg:min-h-full">
            <img
              src={activeNode.image}
              alt={activeNode.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400 block mb-1">
                Visual Inspection
              </span>
              <h4 className="text-2xl font-black uppercase italic tracking-tight text-white mb-2">
                {activeNode.title}
              </h4>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                {activeNode.tagline}
              </p>
            </div>
          </div>

          {/* Details & Specs Column */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
                    System Specification
                  </span>
                  <div className="flex gap-2">
                    {activeNode.standards.map((std, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800/60"
                      >
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
                <h4 className="text-3xl font-black uppercase italic tracking-tight text-white">
                  {activeNode.subtitle}
                </h4>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                {activeNode.specs.map((spec, i) => (
                  <div key={i} className="border-l-2 border-blue-500 pl-3">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {spec.label}
                    </div>
                    <div className="text-sm font-black text-white italic tracking-tight">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Equipment Types */}
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                  Fabrication & Supply Configurations
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeNode.keyTypes.map((type, i) => (
                    <span
                      key={i}
                      className="bg-slate-800/80 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 text-blue-400" />
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Major Authorized Brands */}
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                  Authorized Manufacturers & OEM Partners
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeNode.brands.map((brand, i) => (
                    <span
                      key={i}
                      className="bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs font-black uppercase italic tracking-tight px-3 py-1 rounded-lg"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenQuote(activeNode.title)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
              >
                Request Quote For {activeNode.title} <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#linecard"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                Browse Full Line Card
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <style>{`
        @keyframes flowDash {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -88;
          }
        }
        .animate-flow-dash {
          animation: flowDash 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
