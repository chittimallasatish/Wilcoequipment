import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { 
  Calendar, 
  Award, 
  Factory, 
  ShieldCheck, 
  Wrench, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers,
  Flame,
  Gauge
} from "lucide-react";

interface Milestone {
  year: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  image: string;
  achievements: string[];
  stats?: { label: string; value: string };
}

const milestones: Milestone[] = [
  {
    year: "1987",
    badge: "Founding Era",
    title: "Established in Wills Point, Texas",
    subtitle: "Sanitary Process Piping & Field Millwright Roots",
    description: "Wilco Equipment Co. was founded to provide dedicated process piping installation and mechanical rigging for East Texas dairy farms, bottling plants, and food processors.",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    achievements: [
      "Founded in Wills Point, TX",
      "Specialized in Sanitary Dairy Piping",
      "Manual TIG Stainless Fabrication"
    ],
    stats: { label: "Legacy Established", value: "35+ Years" }
  },
  {
    year: "1996",
    badge: "Quality Accreditation",
    title: "ASME & 3-A Sanitary Standards",
    subtitle: "Purity Certification & Rigorous Welding QA",
    description: "Formally attained ASME Section IX qualification and strict 3-A Sanitary Standards compliance, positioning Wilco as a trusted contractor for regulated food grade and infant formula plants.",
    icon: Award,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
    achievements: [
      "ASME Section IX Welder Certification",
      "3-A Sanitary Design Standards",
      "Sterile Steam & Condensate Systems"
    ],
    stats: { label: "Inspection Pass Rate", value: "99.8%" }
  },
  {
    year: "2004",
    badge: "Engineering Evolution",
    title: "Modular Skid Fabrication Division",
    subtitle: "Custom Shop-Built CIP & Fluid Routing Units",
    description: "Expanded our manufacturing footprint to engineer shop-built modular Clean-In-Place (CIP) wash skids, mixproof valve manifolds, and high-flow blending stations delivered turnkey to plant floors.",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800",
    achievements: [
      "Dedicated Skid Fabrication Bay",
      "Custom Automated Valve Matrixes",
      "Pre-Wired & Factory Hydro-Tested"
    ],
    stats: { label: "Skids Commissioned", value: "500+" }
  },
  {
    year: "2012",
    badge: "OEM Master Distribution",
    title: "Authorized Distributor Network",
    subtitle: "Partnership with Alfa Laval & Leading Global Brands",
    description: "Established master distributorships with industry leaders including Alfa Laval, Fristam, SPX, and Bürkert, providing plant engineers with direct factory pricing, spares, and rapid service.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    achievements: [
      "Alfa Laval Master Distributorship",
      "Same-Day Pumps & Valve Spares",
      "50+ Premium OEM Line Card"
    ],
    stats: { label: "Catalog Brands", value: "50+" }
  },
  {
    year: "2018",
    badge: "High-Tech Automation",
    title: "Orbital TIG & Pharma Expansion",
    subtitle: "Computerized Closed-Chamber Welding & Video Borescope",
    description: "Invested in computer-controlled orbital welding systems and high-resolution video borescope logging, entering high-purity pharmaceutical, biotech, and high-potency API processing facilities.",
    icon: Gauge,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800",
    achievements: [
      "Closed-Chamber Orbital TIG Welding",
      "100% Digital Video Borescope Logs",
      "Surface Finish Ra < 15 μin Polish"
    ],
    stats: { label: "Weld Precision", value: "±0.01 mm" }
  },
  {
    year: "2026",
    badge: "Present & Future",
    title: "Next-Gen Sanitary Flow Systems",
    subtitle: "Integrated Digital Controls & Turnkey Plant Delivery",
    description: "Today, Wilco Equipment Co. stands as a premier design-build powerhouse, combining IoT instrumentation, smart flow networks, and master fabrication for the nation's leading industrial processors.",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=800",
    achievements: [
      "Turnkey Process Plant Architecture",
      "IO-Link & Coriolis Flow Integration",
      "ISNetworld A-Rated Safety Excellence"
    ],
    stats: { label: "Nationwide Reach", value: "Turnkey USA" }
  }
];

interface ProjectTimelineProps {
  onOpenQuote: (service?: string) => void;
}

export default function ProjectTimeline({ onOpenQuote }: ProjectTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const bgY = useTransform(smoothProgress, [0, 1], [-100, 100]);

  return (
    <section 
      id="timeline" 
      ref={containerRef}
      className="py-32 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Background Decorative Graphic & Parallax Text */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center select-none"
      >
        <span className="text-[35vw] font-black text-white uppercase italic tracking-tighter leading-none whitespace-nowrap">
          TIMELINE
        </span>
      </motion.div>

      {/* Subtle Glow Spheres */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.25em] mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Legacy & Evolution</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white">
            Project <span className="text-blue-500">Timeline.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg mt-6 font-medium leading-relaxed">
            From our founding in Wills Point in 1987 to today’s high-purity automated skid systems, explore the milestones that defined our engineering excellence.
          </p>
        </div>

        {/* Timeline Flow Container */}
        <div className="relative">
          {/* Central Vertical Track (Desktop Center, Mobile Left) */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-1 bg-slate-800 rounded-full overflow-hidden">
            {/* Animated Scroll-Triggered Progress Fill */}
            <motion.div 
              style={{ scaleY: smoothProgress, transformOrigin: "top" }}
              className="w-full h-full bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-600 shadow-[0_0_15px_#3b82f6]"
            />
          </div>

          {/* Milestones List */}
          <div className="space-y-16 sm:space-y-24 md:space-y-32">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.icon;

              return (
                <div 
                  key={item.year}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Central Node Marker */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="relative w-12 h-12 rounded-2xl bg-slate-900 border-2 border-blue-500/60 shadow-xl shadow-blue-500/20 flex items-center justify-center group"
                    >
                      <Icon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                      <div className="absolute -inset-1 rounded-2xl bg-blue-500/20 blur-xs -z-10 animate-pulse" />
                    </motion.div>
                  </div>

                  {/* Left Column (Desktop) */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.7, delay: 0.15 }}
                      className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl hover:border-slate-700 transition-all group"
                    >
                      {/* Year & Badge Header */}
                      <div className={`flex items-center gap-3 mb-4 ${isEven ? "md:justify-end" : "justify-start"}`}>
                        <span className="text-4xl sm:text-5xl font-black italic tracking-tighter text-blue-500 drop-shadow-sm font-mono">
                          {item.year}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-950 text-blue-300 border border-blue-800/60">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white mb-1 group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                        {item.subtitle}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mb-6">
                        {item.description}
                      </p>

                      {/* Achievements Checklist */}
                      <div className={`space-y-2 mb-6 ${isEven ? "md:flex md:flex-col md:items-end" : ""}`}>
                        {item.achievements.map((ach, i) => (
                          <div 
                            key={i} 
                            className={`flex items-center gap-2 text-xs font-bold text-slate-300 ${isEven ? "md:flex-row-reverse" : ""}`}
                          >
                            <div className="w-4 h-4 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                            </div>
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stat Footer */}
                      {item.stats && (
                        <div className={`pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs ${isEven ? "md:flex-row-reverse" : ""}`}>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            {item.stats.label}
                          </span>
                          <span className="font-black text-blue-400 italic text-sm tracking-tight">
                            {item.stats.value}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Right Column / Image Card (Desktop) */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 mt-6 md:mt-0 ${isEven ? "md:order-2 md:pl-16" : "md:pr-16"}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.7, delay: 0.25 }}
                      className="relative h-64 sm:h-72 md:h-80 rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl group"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-90"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      
                      {/* Year Watermark overlay */}
                      <div className="absolute bottom-4 right-6 pointer-events-none">
                        <span className="text-6xl sm:text-7xl font-black italic text-white/10 select-none tracking-tighter">
                          {item.year}
                        </span>
                      </div>
                      
                      <div className="absolute bottom-6 left-6 max-w-[80%]">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400 block mb-1">
                          Historical Milestone
                        </span>
                        <span className="text-lg font-black uppercase italic tracking-tight text-white block">
                          {item.title}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-28 p-8 sm:p-12 rounded-[3rem] bg-gradient-to-r from-blue-900/40 via-slate-900 to-blue-950/50 border border-blue-500/30 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400 block mb-2">
            Write the Next Chapter With Us
          </span>
          <h3 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-white mb-4">
            Bring 35+ Years of Sanitary Fabrication to Your Facility
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-medium mb-8">
            Whether retrofitting existing stainless piping or engineering a new modular skid system, trust Wilco's proven experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onOpenQuote("Turnkey Process Piping")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              Start Your Project Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:9038736700"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
            >
              Direct Line: (903) 873-6700
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
