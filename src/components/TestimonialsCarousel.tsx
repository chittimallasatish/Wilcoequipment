import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  Sparkles,
  Pause,
  Play
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyType: string;
  location: string;
  scope: string;
  quote: string;
  metrics: { label: string; value: string }[];
  rating: number;
  badge: string;
}

const testimonials: Testimonial[] = [
  {
    id: "dairy-ops",
    name: "David Henderson",
    role: "Director of Plant Operations",
    companyType: "Grade-A Dairy & Fluid Milk Processing Facility",
    location: "Sulphur Springs, TX",
    scope: "Turnkey HTST Pasteurizer & Dual-Tank CIP Skid Installation",
    quote: "Wilco delivered our dual-tank automated CIP skid and 4-inch sanitary process lines two weeks ahead of our scheduled plant shutdown. Their orbital welds passed 100% video borescope inspection on the first run with zero leaks under hydro-test. They are the only mechanical contractor we trust on our raw and pasteurized product headers.",
    metrics: [
      { label: "Turnaround Time", value: "2 Weeks Early" },
      { label: "Hydro-Test Pass", value: "100% 1st Run" },
      { label: "Sanitary Rating", value: "3-A Certified" }
    ],
    rating: 5,
    badge: "Verified Dairy Facility"
  },
  {
    id: "beverage-matrix",
    name: "Sarah Montgomery",
    role: "Senior Project Engineering Manager",
    companyType: "High-Speed Beverage & Syrup Bottling Plant",
    location: "Dallas / Fort Worth, TX",
    scope: "48-Valve Automated Mixproof Matrix & Alfa Laval Pump Integration",
    quote: "Fitting an automated 48-valve mixproof matrix into our cramped existing plant footprint seemed impossible until Wilco modeled the 3D isometric spool drawings. They shop-fabricated and pre-wired the modular frame in Wills Point and rigged it in over a weekend. Our product changeover wash cycle dropped by 40% immediately.",
    metrics: [
      { label: "Wash Cycle Speed", value: "40% Faster" },
      { label: "Valve Configuration", value: "48 Mixproof Valves" },
      { label: "Production Downtime", value: "Zero Unscheduled" }
    ],
    rating: 5,
    badge: "Verified Bottling Plant"
  },
  {
    id: "biopharma-wfi",
    name: "Dr. Marcus Vance",
    role: "VP of Engineering & Facilities",
    companyType: "Sterile Injectables & Biopharmaceutical Manufacturer",
    location: "Austin, TX",
    scope: "High-Purity WFI Loop & ASME BPE Orbital Stainless Tubing",
    quote: "In sterile bio-pharma, Ra < 15 μin surface finish, helium leak testing, and ASTM A967 passivation logs are non-negotiable. Wilco’s orbital TIG technicians operate with surgical precision. Their QA weld binder was praised by our validation auditors. Unrivaled stainless craftsmanship.",
    metrics: [
      { label: "Surface Finish", value: "Ra < 15 μin" },
      { label: "Welding Code", value: "ASME BPE / Sec IX" },
      { label: "Audit Result", value: "100% Compliance" }
    ],
    rating: 5,
    badge: "Verified Bio-Pharma Client"
  },
  {
    id: "brewery-steam",
    name: "Tyler Robinson",
    role: "Master Brewer & Head of Operations",
    companyType: "Regional Craft Brewery & Packaging Hall",
    location: "East Texas",
    scope: "Brewhouse Steam Header, Glycol Lines & Cellar Manifolds",
    quote: "From properly sizing our Spirax Sarco clean steam traps to routing dual-jacketed glycol lines across 12 cellar fermentation tanks, Kyle and his crew treated our expansion like their own facility. Having their in-house stock of Alfa Laval pumps and Tri-Clamp fittings saved us over 8 weeks of OEM lead times.",
    metrics: [
      { label: "Fermenters Piped", value: "12 Cellar Vessels" },
      { label: "Lead Time Saved", value: "8 Weeks" },
      { label: "Piping Scope", value: "Clean Steam & Glycol" }
    ],
    rating: 5,
    badge: "Verified Brewery Partner"
  },
  {
    id: "specialty-foods",
    name: "Elena Ramos",
    role: "Director of Quality & Plant Safety",
    companyType: "Specialty Sauces & Commercial Food Processor",
    location: "Tyler, TX",
    scope: "Heavy Jacketed Kettle Rigging & Positive Displacement Lines",
    quote: "Wilco's ISNetworld A-rating gives us complete peace of mind on our active processing floor. Their millwright crew rigged two 10,000-gallon jacketed blend kettles into place through tight roof hatches without a single safety near-miss. Safe, professional, and knowledgeable down to the last bolt.",
    metrics: [
      { label: "Safety Record", value: "ISNetworld A-Rated" },
      { label: "Vessel Rigging", value: "2x 10,000 Gal Kettles" },
      { label: "Total Incidents", value: "Zero Recordables" }
    ],
    rating: 5,
    badge: "Verified Food Processor"
  }
];

interface TestimonialsCarouselProps {
  onOpenQuote: (service?: string) => void;
}

export default function TestimonialsCarousel({ onOpenQuote }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const currentItem = testimonials[currentIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % testimonials.length;
      }
      return (prev - 1 + testimonials.length) % testimonials.length;
    });
  };

  const jumpTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay timer
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        paginate(1);
      }, 7000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentIndex, isPaused]);

  return (
    <section 
      id="testimonials" 
      className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Anchor for #reviews navigation */}
      <div id="reviews" className="absolute -top-24 pointer-events-none" />

      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Background Graphic Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.25em] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Plant Manager & Engineer Reviews</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter leading-none text-white">
              Client <span className="text-blue-500">Feedback.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl font-medium leading-relaxed">
              Hear directly from dairy plant directors, beverage engineers, and quality assurance leads who rely on Wilco’s sanitary piping and skid systems.
            </p>
          </div>

          {/* Controls: Prev/Next & Autoplay Pause Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs font-bold uppercase tracking-wider">
              {isPaused ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-blue-400 animate-pulse" />}
              <span>{isPaused ? "Paused" : "Auto-cycling"}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => paginate(-1)}
                className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Card Container */}
        <div className="relative min-h-[460px] sm:min-h-[400px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentItem.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -direction * 50, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-slate-900/95 rounded-[3rem] p-8 sm:p-12 lg:p-14 border border-slate-800/90 shadow-2xl relative overflow-hidden backdrop-blur-xl"
            >
              {/* Giant Watermark Quote Icon in Background */}
              <Quote className="absolute top-6 right-8 w-32 h-32 sm:w-44 sm:h-44 text-slate-800/20 pointer-events-none -rotate-12" />

              <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Testimonial Content */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Top Badges & Stars */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(currentItem.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {currentItem.badge}
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/60">
                      {currentItem.location}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <blockquote className="text-lg sm:text-2xl font-medium text-slate-100 leading-relaxed italic">
                    "{currentItem.quote}"
                  </blockquote>

                  {/* Client Info & Project Scope */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-black uppercase italic tracking-tight text-white">
                        {currentItem.name}
                      </h4>
                      <p className="text-xs sm:text-sm font-bold text-blue-400 tracking-wide mt-0.5">
                        {currentItem.role} • <span className="text-slate-400 font-medium">{currentItem.companyType}</span>
                      </p>
                    </div>

                    <div className="text-xs font-medium text-slate-400 max-w-xs bg-slate-950/60 px-4 py-2.5 rounded-2xl border border-slate-800">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-0.5">
                        Project Scope Executed
                      </span>
                      <span className="text-slate-300 font-bold">{currentItem.scope}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Plant Verification Metrics Box */}
                <div className="lg:col-span-4 bg-slate-950/80 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="w-4 h-4 text-blue-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                        Facility Impact Metrics
                      </span>
                    </div>
                    <div className="space-y-4">
                      {currentItem.metrics.map((metric, idx) => (
                        <div key={idx} className="border-b border-slate-800/80 pb-3 last:border-0 last:pb-0">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                            {metric.label}
                          </span>
                          <span className="text-xl font-black uppercase italic tracking-tight text-white">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenQuote(currentItem.scope)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    Request Similar Scope <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots & Progress Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => jumpTo(index)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? "w-10 h-3 bg-blue-600 shadow-md shadow-blue-600/40"
                      : "w-3 h-3 bg-slate-800 hover:bg-slate-700"
                  }`}
                  aria-label={`Jump to review by ${item.name}`}
                />
              );
            })}
          </div>

          {/* Testimonial Count & Client Trust Seal */}
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span>
              Review {currentIndex + 1} of {testimonials.length}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="text-slate-400">
              35+ Years Certified Track Record
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
