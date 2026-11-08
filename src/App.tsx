/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "motion/react";
import { 
  Settings, 
  Shield, 
  Users, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  Factory,
  Wrench,
  Cpu,
  Award,
  Filter,
  Thermometer,
  Wind,
  Snowflake,
  Search,
  Sparkles,
  Layers,
  Activity,
  Check,
  FileText,
  SlidersHorizontal
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ChatBot from "./components/ChatBot";
import QuoteModal from "./components/QuoteModal";
import InteractiveProcessExplorer from "./components/InteractiveProcessExplorer";
import ProjectTimeline from "./components/ProjectTimeline";
import TechnicalFAQ from "./components/TechnicalFAQ";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import WilcoLogo from "./components/WilcoLogo";

const equipmentCategories = [
  {
    title: "Pumps",
    icon: Wrench,
    brands: ["Alfa Laval", "Fristam", "SPX", "Wright Pumps", "Ampco Pumps", "Admix", "Murzan", "Axiflow", "Bell & Gossett"],
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Sanitary Valves",
    icon: Settings,
    brands: ["Alfa Laval", "Pentair", "GEA", "SPX", "Definox", "Tru-Flo", "Burkert", "Schubert & Salzer", "SVF", "Lumaco"],
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Instrumentation",
    icon: Cpu,
    brands: ["Anderson-Negele", "Micro Motion", "Endress+Hauser", "Chicago Stainless", "Lumenite", "Rosemount"],
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Skid Fabrication",
    icon: Factory,
    brands: ["CIP Skids", "Valve Matrix", "Flow Panels", "Pasteurizers", "Blending Skids", "Pump Skids"],
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800",
  },
];

const lineCardData = [
  {
    category: "Pumps",
    items: ["Centrifugal", "Positive", "Diaphragm", "Shear Mixer"],
    brands: ["Alfa Laval", "Fristam", "SPX", "Wright Pumps", "Ampco Pumps", "Admix", "Murzan", "Axiflow", "Bell & Gossett"]
  },
  {
    category: "Sanitary Valves",
    items: ["Butterfly", "Sanitary Seat", "Mixproof", "Diaphragm", "Ball", "Check"],
    brands: ["Alfa Laval", "Pentair-Sudmo-Keystone", "GEA-Tuchenhagen", "SPX", "Definox", "QMS/Tru-Flo", "Burkert", "Schubert & Salzer", "SVF Flow Controls", "Lumaco"]
  },
  {
    category: "Instrumentation",
    items: ["Pressure Transmitters", "Temperature Gauge", "Flow Meters"],
    brands: ["Anderson-Negele", "Micro Motion", "Endress Hauser", "Chicago Stainless Equipment", "Lumenite", "Pyromation", "Rosemount-Emerson"]
  },
  {
    category: "Pipe Installation",
    items: ["Sanitary Fittings", "Tubing", "Sampling"],
    brands: ["Alfa Laval", "VNE", "Top Line", "QMI", "United Industries", "Rath", "Wilco-Flow Panels", "AWI", "Strahman", "Ham-let", "Perlick"]
  },
  {
    category: "Steam & Refrigeration",
    items: ["Regulators", "Traps", "Condensate Recovery", "Valves", "Purgers", "Heat Exchangers"],
    brands: ["Spirax Sarco", "TLV", "Spence", "Armstrong", "Hansen", "Henry", "Phillips", "Vilter", "Alfa Laval"]
  },
  {
    category: "Industrial Valves",
    items: ["Ball Valves", "Check Valves", "Backflow Preventors", "Regulators", "Butterfly valves"],
    brands: ["QSM/Tru-Flo", "Sharpe", "Watts", "Flow-Line", "Keystone", "Bell & Gossett", "Burkert", "Schubert & Salzer", "Bray", "Conbraco"]
  },
  {
    category: "General Equipment",
    items: ["Homogenizers", "Mixers", "Strainers", "Filters", "Tanks", "Hose Assemblies"],
    brands: ["Alfa Laval", "Admix", "Ampco", "VNE", "Top Line", "QMI", "United Industries", "Rath", "Strahman"]
  }
];

const Tooltip = ({ children, text }: { children: React.ReactNode, text: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div 
      className="relative flex flex-col items-center group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-full mt-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg whitespace-nowrap pointer-events-none shadow-xl z-[60]"
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState("Process Skids & Piping");
  const [lineCardSearch, setLineCardSearch] = useState("");
  const [selectedLineCardCat, setSelectedLineCardCat] = useState("All");

  const handleOpenQuote = (service?: string) => {
    setQuoteService(service || "Process Skids & Piping");
    setIsQuoteOpen(true);
  };

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const processRef = useRef(null);
  const { scrollYProgress: processProgress } = useScroll({
    target: processRef,
    offset: ["start start", "end end"]
  });
  const smoothProcessProgress = useSpring(processProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const bgY = useTransform(smoothProgress, [0, 1], [0, -150]);
  const bgRotate = useTransform(smoothProgress, [0, 1], [0, 5]);

  // Hero Parallax & Zoom
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.2]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -100]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredLineCard = lineCardData.filter((section) => {
    const matchesCategory =
      selectedLineCardCat === "All" ||
      section.category.toLowerCase().includes(selectedLineCardCat.toLowerCase());

    const query = lineCardSearch.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesCatName = section.category.toLowerCase().includes(query);
    const matchesItem = section.items.some((item) => item.toLowerCase().includes(query));
    const matchesBrand = section.brands.some((brand) => brand.toLowerCase().includes(query));

    return matchesCategory && (matchesCatName || matchesItem || matchesBrand);
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-hidden">
      {/* Global Parallax Backdrop Layer */}
      <motion.div 
        style={{ y: bgY, rotate: bgRotate }}
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
      >
        <div className="absolute top-20 left-10 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-slate-900 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border-[40px] border-blue-600 rounded-full opacity-20" />
      </motion.div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <WilcoLogo scrolled={scrolled} />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Services", "Blueprint", "Equipment", "Line Card", "Timeline", "Reviews", "FAQ", "Contact"].map((item) => (
              <Tooltip key={item} text={`Go to ${item}`}>
                <a 
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className={`text-sm font-bold transition-colors hover:text-blue-600 uppercase tracking-widest ${scrolled ? "text-slate-600" : "text-white/90"}`}
                >
                  {item}
                </a>
              </Tooltip>
            ))}
            <Tooltip text="Request a Project Quote">
              <button 
                onClick={() => handleOpenQuote()}
                className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                Get a Quote
              </button>
            </Tooltip>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={scrolled ? "text-slate-900" : "text-white"} /> : <Menu className={scrolled ? "text-slate-900" : "text-white"} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t border-slate-100 py-6 px-4 flex flex-col gap-4"
          >
            {["Services", "Blueprint", "Equipment", "Line Card", "Timeline", "Reviews", "FAQ", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(" ", "")}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-bold text-slate-600 hover:text-blue-600 uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                handleOpenQuote();
              }}
              className="bg-blue-600 text-white text-center py-4 rounded-xl font-black uppercase tracking-widest cursor-pointer"
            >
              Request a Project Quote
            </button>
            <a href="tel:9038736700" className="bg-slate-900 text-white text-center py-3 rounded-xl font-black uppercase tracking-widest text-xs">
              Call (903) 873-6700
            </a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
            alt="Industrial Facility" 
            className="w-full h-full object-cover brightness-[0.3]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-blue-500" />
              <span className="text-blue-400 text-sm font-black uppercase tracking-[0.3em]">Established 1987</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 uppercase italic tracking-tighter">
              Precision <br />
              <span className="text-blue-500">Fabrication.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-xl font-medium">
              Turnkey process piping design and installation for the world's leading food and pharmaceutical brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#blueprint" className="bg-blue-600 text-white px-8 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-blue-600/40">
                Interactive Blueprint <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              <button 
                onClick={() => handleOpenQuote()}
                className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-8 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-white/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-5 h-5 text-blue-400" /> Request Quote
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Years Experience", value: "35+" },
              { label: "Safety Rating", value: "A-Rated" },
              { label: "Team Members", value: "50+" },
              { label: "Certifications", value: "10+" }
            ].map((stat, i) => (
              <div key={i} className="text-center border-r last:border-0 border-slate-100">
                <div className="text-4xl font-black text-blue-600 uppercase italic tracking-tighter mb-1">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {[
            "Alfa Laval", "Fristam", "Bürkert", "Anderson-Negele", "VNE", 
            "Endress+Hauser", "Pentair", "Spirax Sarco", "GEA", "Rosemount", 
            "Watts", "Keystone", "Wright Pumps", "Ampco Pumps", "Admix", "Murzan"
          ].map((brand, i) => (
            <span key={i} className="text-2xl font-black text-slate-300 uppercase italic tracking-tighter hover:text-blue-600 transition-colors cursor-default">
              {brand}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            "Alfa Laval", "Fristam", "Bürkert", "Anderson-Negele", "VNE", 
            "Endress+Hauser", "Pentair", "Spirax Sarco", "GEA", "Rosemount", 
            "Watts", "Keystone", "Wright Pumps", "Ampco Pumps", "Admix", "Murzan"
          ].map((brand, i) => (
            <span key={i + 100} className="text-2xl font-black text-slate-300 uppercase italic tracking-tighter hover:text-blue-600 transition-colors cursor-default">
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Scrollytelling Section: Our Process */}
      <section className="relative bg-slate-900" ref={processRef}>
        <div className="h-[400vh]">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative h-full flex items-center">
              
              {/* Background Text Layer (3D Parallax) */}
              <motion.div 
                style={{ 
                  x: useTransform(smoothProcessProgress, [0, 1], [500, -500]),
                  opacity: useTransform(smoothProcessProgress, [0, 0.1, 0.9, 1], [0, 0.1, 0.1, 0])
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span className="text-[20vw] font-black text-white uppercase italic tracking-tighter leading-none whitespace-nowrap">
                  PRECISION FLOW
                </span>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 items-center w-full relative z-10">
                <div className="space-y-8">
                  <h2 className="text-blue-500 text-sm font-black uppercase tracking-[0.4em]">The Wilco Way</h2>
                  <div className="relative h-[120px] overflow-hidden">
                    {[
                      { title: "Design & Engineering", step: "01" },
                      { title: "Precision Fabrication", step: "02" },
                      { title: "Sanitary Installation", step: "03" },
                      { title: "Quality Assurance", step: "04" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        style={{
                          y: useTransform(smoothProcessProgress, 
                            [i * 0.25, (i * 0.25) + 0.12, (i * 0.25) + 0.25], 
                            [100, 0, -100]
                          ),
                          opacity: useTransform(smoothProcessProgress, 
                            [i * 0.25, (i * 0.25) + 0.12, (i * 0.25) + 0.25], 
                            [0, 1, 0]
                          )
                        }}
                        className="absolute inset-0 flex items-center gap-6"
                      >
                        <span className="text-6xl font-black text-blue-600/20 italic">{item.step}</span>
                        <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter">{item.title}</h3>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-slate-400 text-lg max-w-md font-medium">
                    We follow a rigorous multi-step process to ensure every weld, valve, and skid meets the highest sanitary standards.
                  </p>
                </div>

                <div className="relative aspect-square">
                  {[
                    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=800"
                  ].map((img, i) => (
                    <motion.div
                      key={i}
                      style={{
                        scale: useTransform(smoothProcessProgress, 
                          [i * 0.25, (i * 0.25) + 0.12, (i * 0.25) + 0.25], 
                          [0.5, 1, 1.5]
                        ),
                        opacity: useTransform(smoothProcessProgress, 
                          [i * 0.25, (i * 0.25) + 0.12, (i * 0.25) + 0.25], 
                          [0, 1, 0]
                        ),
                        rotate: useTransform(smoothProcessProgress, 
                          [i * 0.25, (i * 0.25) + 0.12, (i * 0.25) + 0.25], 
                          [-10, 0, 10]
                        )
                      }}
                      className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
                    >
                      <img src={img} alt="Process" className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Build - Visual Gallery */}
      <section className="py-32 bg-white relative overflow-hidden">
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0.3, 0.6], [100, -100]) }}
          className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center"
        >
          <span className="text-[40vw] font-black text-slate-900 uppercase italic tracking-tighter leading-none whitespace-nowrap">
            EXPERTISE
          </span>
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            style={{ y: useTransform(smoothProgress, [0.3, 0.5], [30, -30]) }}
            className="text-center mb-20"
          >
            <h2 className="text-blue-600 text-sm font-black uppercase tracking-[0.4em] mb-4">Our Expertise</h2>
            <h3 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
              What We <span className="text-blue-600">Build.</span>
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Process Skids",
                desc: "Custom-engineered modular systems for blending, heating, and pumping.",
                img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Sanitary Piping",
                desc: "High-purity stainless steel orbital welding for food and pharma.",
                img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Valve Manifolds",
                desc: "Complex matrix designs for automated flow control and routing.",
                img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Utility Skids",
                desc: "Steam, water, and chemical delivery systems for plant infrastructure.",
                img: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "CIP Systems",
                desc: "Clean-In-Place solutions to ensure the highest sanitary standards.",
                img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Rigging & Install",
                desc: "Heavy equipment moving and precision placement in tight spaces.",
                img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-10">
                  <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">{item.title}</h4>
                  <p className="text-slate-300 font-medium text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Process Flow Blueprint Explorer */}
      <section id="blueprint" className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveProcessExplorer onOpenQuote={handleOpenQuote} />
        </div>
      </section>

      {/* Visual Equipment Catalog */}
      <section id="equipment" className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0.5, 0.8], [150, -150]) }}
          className="absolute inset-0 opacity-[0.05] pointer-events-none flex items-center justify-center"
        >
          <span className="text-[40vw] font-black text-white uppercase italic tracking-tighter leading-none whitespace-nowrap">
            CATALOG
          </span>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            style={{ y: useTransform(smoothProgress, [0.5, 0.7], [40, -40]) }}
            className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8"
          >
            <div className="max-w-2xl">
              <h2 className="text-blue-500 text-sm font-black uppercase tracking-[0.4em] mb-4">Equipment Catalog</h2>
              <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                What We <span className="text-slate-700">Build & Install</span>
              </h3>
            </div>
            <p className="text-slate-400 text-lg max-w-sm font-medium">
              A comprehensive range of sanitary equipment from the industry's most trusted manufacturers.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Category Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              {equipmentCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className={`w-full text-left p-8 rounded-3xl transition-all duration-500 flex items-center justify-between group ${activeCategory === idx ? "bg-blue-600 text-white shadow-2xl shadow-blue-600/40" : "bg-slate-800/50 text-slate-400 hover:bg-slate-800"}`}
                >
                  <div className="flex items-center gap-6">
                    <cat.icon className={`w-8 h-8 ${activeCategory === idx ? "text-white" : "text-blue-500"}`} />
                    <span className="text-2xl font-black uppercase italic tracking-tight">{cat.title}</span>
                  </div>
                  <ArrowRight className={`w-6 h-6 transition-transform ${activeCategory === idx ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:opacity-50"}`} />
                </button>
              ))}
            </div>

            {/* Category Display */}
            <div className="lg:col-span-8 relative min-h-[500px]">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800/30 rounded-[3rem] p-12 border border-slate-700/50 h-full flex flex-col md:flex-row gap-12"
              >
                <div className="flex-1 space-y-8">
                  <h4 className="text-4xl font-black uppercase italic text-blue-500 tracking-tighter">
                    {equipmentCategories[activeCategory].title} Brands
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {equipmentCategories[activeCategory].brands.map((brand, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-300 font-bold group">
                        <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform" />
                        {brand}
                      </div>
                    ))}
                  </div>
                  <div className="pt-8 border-t border-slate-700 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => handleOpenQuote(equipmentCategories[activeCategory].title)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-black uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                    >
                      Request {equipmentCategories[activeCategory].title} Quote <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a href="#linecard" className="text-blue-400 hover:text-white font-black uppercase tracking-widest text-xs flex items-center gap-1.5 transition-all">
                      View Full Line Card <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                <div className="flex-1 rounded-[2rem] overflow-hidden shadow-2xl">
                  <img 
                    src={equipmentCategories[activeCategory].image} 
                    alt={equipmentCategories[activeCategory].title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Line Card Categories */}
      <section className="py-32 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-blue-600 text-sm font-black uppercase tracking-[0.4em] mb-4">Equipment Types</h2>
            <h3 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter">
              The Full <span className="text-blue-600">Line Card</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Wrench, title: "Pumps", desc: "Centrifugal & Positive" },
              { icon: Settings, title: "Valves", desc: "Sanitary & Industrial" },
              { icon: Cpu, title: "Instrumentation", desc: "Flow & Pressure" },
              { icon: Factory, title: "Pipe Installation", desc: "Sanitary Fittings" },
              { icon: Filter, title: "Filtration", desc: "Strainers & Filters" },
              { icon: Thermometer, title: "Heat Transfer", desc: "Exchangers & Plates" },
              { icon: Wind, title: "Steam", desc: "Traps & Regulators" },
              { icon: Snowflake, title: "Refrigeration", desc: "Valves & Purgers" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center group"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                  <item.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-black uppercase italic text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-tight">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Master Line Card Grid */}
      <section id="linecard" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 text-sm font-black uppercase tracking-[0.4em] mb-4">Master Line Card</h2>
            <h3 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter">
              Authorized <span className="text-blue-600">Distributor</span>
            </h3>
            <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-xl mx-auto font-medium">
              Over 50 premium industrial fluid handling, sanitary valve, and process instrumentation brands in stock and supported.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="mb-14 max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={lineCardSearch}
                onChange={(e) => setLineCardSearch(e.target.value)}
                placeholder="Search brands (e.g. Alfa Laval, Fristam, Spirax Sarco) or equipment types..."
                className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm"
              />
              {lineCardSearch && (
                <button
                  onClick={() => setLineCardSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {[
                "All",
                "Pumps",
                "Sanitary Valves",
                "Instrumentation",
                "Pipe Installation",
                "Steam & Refrigeration",
                "Industrial Valves",
                "General Equipment"
              ].map((categoryName) => {
                const isSelected = selectedLineCardCat === categoryName;
                return (
                  <button
                    key={categoryName}
                    onClick={() => setSelectedLineCardCat(categoryName)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {categoryName}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-wider px-1">
              <span>
                Showing {filteredLineCard.length} of {lineCardData.length} Equipment Categories
              </span>
              {(lineCardSearch || selectedLineCardCat !== "All") && (
                <button
                  onClick={() => {
                    setLineCardSearch("");
                    setSelectedLineCardCat("All");
                  }}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {filteredLineCard.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h4 className="text-lg font-black uppercase tracking-tight text-slate-700">No matching equipment or brands found</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Try searching for another manufacturer like "Alfa Laval", "Fristam", or "Burkert", or contact us directly.
              </p>
              <button
                onClick={() => {
                  setLineCardSearch("");
                  setSelectedLineCardCat("All");
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-700"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLineCard.map((section, idx) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-slate-50 p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-2xl font-black uppercase italic text-slate-900 mb-6 group-hover:text-blue-600 transition-colors tracking-tight">
                      {section.category}
                    </h4>
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Equipment Types</span>
                        <div className="flex flex-wrap gap-2">
                          {section.items.map((item, i) => (
                            <span key={i} className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-600 border border-slate-200">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Major Brands</span>
                        <div className="flex flex-wrap gap-2.5">
                          {section.brands.map((brand, i) => (
                            <span key={i} className="text-xs font-black text-blue-600 uppercase italic tracking-tighter bg-white px-2.5 py-1 rounded-lg border border-blue-100 shadow-2xs">
                              {brand}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/80 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      OEM In-Stock
                    </span>
                    <button
                      onClick={() => handleOpenQuote(section.category)}
                      className="text-xs font-black uppercase tracking-wider text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors cursor-pointer group-hover:translate-x-1"
                    >
                      Request RFQ <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Showcase with 3D Parallax */}
      <section className="py-32 bg-slate-50 overflow-hidden perspective-1000">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              style={{ 
                rotateY: useTransform(smoothProgress, [0.7, 0.9], [15, -15]),
                rotateX: useTransform(smoothProgress, [0.7, 0.9], [5, -5])
              }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <motion.img 
                  style={{ y: useTransform(smoothProgress, [0.7, 0.9], [0, -50]) }}
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600" 
                  className="rounded-[2rem] shadow-2xl" 
                  referrerPolicy="no-referrer" 
                />
                <motion.img 
                  style={{ y: useTransform(smoothProgress, [0.7, 0.9], [0, 50]) }}
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=600" 
                  className="rounded-[2rem] shadow-2xl" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="space-y-6 pt-12">
                <motion.img 
                  style={{ y: useTransform(smoothProgress, [0.7, 0.9], [0, -80]) }}
                  src="https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=600" 
                  className="rounded-[2rem] shadow-2xl" 
                  referrerPolicy="no-referrer" 
                />
                <motion.img 
                  style={{ y: useTransform(smoothProgress, [0.7, 0.9], [0, 30]) }}
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600" 
                  className="rounded-[2rem] shadow-2xl" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            </motion.div>
            <div>
              <h2 className="text-blue-600 text-sm font-black uppercase tracking-[0.4em] mb-4">Our Work</h2>
              <h3 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter leading-none">
                Visualizing <br />
                <span className="text-blue-600">Excellence.</span>
              </h3>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                We don't just talk about quality; we show it. Our stainless steel process systems are built to the highest sanitary standards (3-A, ASME).
              </p>
              <div className="space-y-6">
                {["Sanitary Piping Systems", "Custom Skid Fabrication", "Heavy Equipment Rigging"].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-xl font-black text-slate-800 uppercase italic tracking-tight"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Timeline Section */}
      <ProjectTimeline onOpenQuote={handleOpenQuote} />

      {/* Technical FAQ & GEO Answer Section */}
      <TechnicalFAQ onOpenQuote={handleOpenQuote} />

      {/* Verified Client Testimonials Carousel */}
      <TestimonialsCarousel onOpenQuote={handleOpenQuote} />

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-600/40">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8">
                Ready to <span className="text-slate-900">Build?</span>
              </h3>
              <p className="text-2xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium">
                Get a professional quote for your next process piping or rigging project today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
                <button
                  onClick={() => handleOpenQuote()}
                  className="bg-white text-blue-600 px-10 py-5 rounded-3xl font-black text-lg uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-black/20"
                >
                  <FileText className="w-6 h-6" /> Online RFQ Specifier
                </button>
                <a href="tel:9038736700" className="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-lg uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                  <Phone className="w-6 h-6" /> (903) 873-6700
                </a>
                <a href="mailto:Kyle@wilcoequipmentco.com" className="bg-blue-700/60 text-white px-10 py-5 rounded-3xl font-black text-lg uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3 border border-white/20">
                  <Mail className="w-6 h-6" /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Trust Section */}
      <section className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {[
              { icon: Shield, title: "ISNetworld", desc: "A-Rated Safety Compliance" },
              { icon: Award, title: "3-A Sanitary", desc: "Certified Sanitary Standards" },
              { icon: CheckCircle2, title: "ASME Certified", desc: "Pressure Vessel Excellence" },
              { icon: Users, title: "SME Member", desc: "Industry Leading Expertise" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center border border-blue-600/20 group hover:bg-blue-600 transition-all duration-500">
                  <item.icon className="w-10 h-10 text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-lg mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-tight">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-16 mb-16">
            <div>
              <div className="mb-8">
                <WilcoLogo light size="lg" />
              </div>
              <p className="text-sm leading-relaxed font-medium">
                Professional process piping design, installation, and millwright services for the food, dairy, and pharmaceutical industries since 1987.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Quick Links</h4>
              <ul className="space-y-4 font-bold">
                {["Services", "Blueprint", "Equipment", "Line Card", "Timeline", "Reviews", "FAQ", "Contact"].map((item) => (
                  <li key={item}><a href={`#${item.toLowerCase().replace(" ", "")}`} className="hover:text-blue-500 transition-colors uppercase tracking-tight">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Contact Info</h4>
              <ul className="space-y-4 font-medium">
                <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-blue-500" /> 101 Blue Bird PKWY, Wills Point, TX</li>
                <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-blue-500" /> (903) 873-6700</li>
                <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-blue-500" /> Kyle@wilcoequipmentco.com</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-700">
              © 2026 Wilco Equipment Co., Inc. All Rights Reserved.
            </div>
            <div className="flex gap-8">
              {["SME", "ISNetworld", "3-A", "ASME"].map((cert) => (
                <span key={cert} className="text-xs font-black text-slate-800 uppercase italic tracking-widest">{cert}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialEquipment={quoteService}
      />

      <ChatBot onOpenQuote={handleOpenQuote} />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        html {
          scroll-behavior: smooth;
        }
        ::selection {
          background: #2563eb;
          color: white;
        }
      `}</style>
    </div>
  );
}
