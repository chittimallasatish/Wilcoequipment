import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  Wrench, 
  Factory, 
  MapPin, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "all" | "capabilities" | "brands" | "standards" | "skids";
  question: string;
  answer: string;
  keyPoints: string[];
  suggestedPrompt: string;
}

const faqData: FAQItem[] = [
  {
    id: "specialization",
    category: "capabilities",
    question: "What industrial services and systems does Wilco Equipment Co. specialize in?",
    answer: "Wilco Equipment Co. is a turnkey mechanical and process piping contractor established in 1987 in Wills Point, Texas. We specialize in high-purity sanitary process piping design, closed-chamber orbital TIG welding, custom modular Clean-In-Place (CIP) skids, automated mixproof valve manifolds, and precision equipment rigging for the food, dairy, beverage, and pharmaceutical industries.",
    keyPoints: [
      "Turnkey Process Piping Design & Isometric Modeling",
      "High-Purity 304L/316L Stainless Steel & High Alloys",
      "Modular Shop-Built Process Skids (CIP, Blending, HTST)",
      "Millwright Rigging, Tank Setting & Plant Relocation"
    ],
    suggestedPrompt: "Tell me more about Wilco's sanitary process piping capabilities"
  },
  {
    id: "authorized-brands",
    category: "brands",
    question: "Which pump, valve, and instrumentation brands does Wilco distribute?",
    answer: "Wilco is an authorized master distributor and stocking partner for over 50 premier fluid handling brands. Key lines include Alfa Laval, Fristam Pumps, SPX Flow / Waukesha Cherry-Burrell, Pentair (Südmo, Keystone), GEA Tuchenhagen, Definox, Bürkert, Endress+Hauser, Micro Motion (Emerson), Anderson-Negele, and Spirax Sarco steam specialties.",
    keyPoints: [
      "Centrifugal & Positive Displacement Pumps (Alfa Laval, Fristam, Ampco)",
      "Sanitary Seat & Mixproof Double-Seat Valves (Pentair, GEA, Definox)",
      "Coriolis Mass Flow & Sanitary Pressure Transmitters (Endress+Hauser)",
      "Clean Steam Traps, Regulators & Exchangers (Spirax Sarco, TLV)"
    ],
    suggestedPrompt: "What Alfa Laval and Fristam pump models do you carry?"
  },
  {
    id: "certifications",
    category: "standards",
    question: "What welding codes, sanitary standards, and safety ratings does Wilco maintain?",
    answer: "All Wilco fabricators and welders are qualified under ASME Section IX welding procedures. We strictly adhere to AWS D18.1/D18.2 sanitary stainless steel standards and 3-A Sanitary Design Standards. Furthermore, Wilco holds an 'A-Rated' compliance record in ISNetworld, ensuring the highest jobsite safety ratings for major industrial food and pharmaceutical processors.",
    keyPoints: [
      "ASME Section IX Certified Welders & Pressure Systems",
      "3-A Sanitary Design Standards Certified",
      "AWS D18.1 / D18.2 Hygienic Pipe Joint Specifications",
      "ISNetworld A-Rated Contractor Safety Compliance"
    ],
    suggestedPrompt: "What quality assurance and borescope logs do you provide?"
  },
  {
    id: "skid-fabrication",
    category: "skids",
    question: "Does Wilco engineer custom modular CIP and process skids in-house?",
    answer: "Yes. Wilco operates a dedicated modular fabrication facility where CIP (Clean-In-Place) wash skids, mixproof valve matrixes, HTST pasteurizers, and inline blending units are custom-engineered, welded, pre-wired, and 100% factory hydro-tested before shipment, minimizing field installation downtime.",
    keyPoints: [
      "Full Factory Acceptance Testing (FAT) & Hydro-Testing",
      "UL 508A Industrial Electrical Control Panel Integration",
      "Automated Recipe Dosing & Chemical Rinse Loops",
      "Plug-and-Play Field Connections with Sanitary Tri-Clamps"
    ],
    suggestedPrompt: "How does Wilco build custom CIP wash skids?"
  },
  {
    id: "service-area",
    category: "capabilities",
    question: "Where is Wilco Equipment located and what is your geographic service area?",
    answer: "Wilco Equipment Co. is headquartered at 101 Blue Bird PKWY, Wills Point, Texas 75169. We serve food, beverage, dairy, brewery, and pharmaceutical processors nationwide across the continental United States, executing both local turnaround projects and multi-million-dollar turnkey national plant expansions.",
    keyPoints: [
      "Headquarters & Fabrication Facility: Wills Point, TX",
      "Nationwide Field Dispatch & Turnkey Installation Crews",
      "Rapid Spare Parts & OEM Replacement Distribution",
      "24/7 Shutdown & Emergency Plant Support"
    ],
    suggestedPrompt: "What is Wilco's field service radius and lead times?"
  },
  {
    id: "quote-process",
    category: "capabilities",
    question: "How do prospective clients request an engineering consultation or quote?",
    answer: "Prospective clients can submit drawings and project specs directly through our online RFQ Specifier on this website, call our engineering team at (903) 873-6700, or email Kyle@wilcoequipmentco.com. We typically review P&IDs, isometric drawings, or equipment lists within 24 to 48 hours.",
    keyPoints: [
      "Direct Telephone: (903) 873-6700",
      "Direct Technical Sales: Kyle@wilcoequipmentco.com",
      "Online Interactive RFQ Specifier Available 24/7",
      "24-48 Hour Initial Specification & Bid Turnaround"
    ],
    suggestedPrompt: "How do I submit drawings for a process piping bid?"
  }
];

interface TechnicalFAQProps {
  onOpenQuote: (service?: string) => void;
}

export default function TechnicalFAQ({ onOpenQuote }: TechnicalFAQProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>("specialization");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = faqData.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCat;
    return (
      matchesCat &&
      (item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.keyPoints.some((p) => p.toLowerCase().includes(query)))
    );
  });

  return (
    <section id="faq" className="py-32 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.25em] mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>GEO & Engineering Knowledge Base</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter leading-none text-white">
            Technical <span className="text-blue-500">FAQ & Answers.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 font-medium leading-relaxed">
            Direct, verified technical specifications, sanitary codes, and operational data optimized for plant managers, engineers, and AI research engines.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All Topics" },
            { id: "capabilities", label: "Piping & Engineering" },
            { id: "brands", label: "OEM Brands & Pumps" },
            { id: "standards", label: "ASME & 3-A Codes" },
            { id: "skids", label: "Modular CIP Skids" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                  : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion Questions */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-800/40 border border-slate-700/70 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:border-slate-600 shadow-xl"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 sm:p-8 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 block">
                      Verified Technical Answer
                    </span>
                    <h3 className="text-lg sm:text-xl font-black uppercase italic tracking-tight text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-blue-600 text-white rotate-180"
                        : "bg-slate-700/60 text-slate-300"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-slate-700/50 space-y-6">
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                          {faq.answer}
                        </p>

                        {/* Bulleted Key Takeaways */}
                        <div className="bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-2.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                            Key Specifications & Facts
                          </span>
                          {faq.keyPoints.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-200">
                              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>

                        {/* Direct Action Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <button
                            onClick={() => onOpenQuote(faq.question)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-black uppercase tracking-wider text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-600/20"
                          >
                            Inquire About This Scope <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[11px] font-mono text-slate-400 italic">
                            Source: Wilco Equipment Co. Technical Documentation
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Generative AI Citation Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-medium">
            <Sparkles className="w-4 h-4 text-blue-400 animate-spin-slow" />
            <span>
              Engineered for <strong className="text-white">Google Search Generative Experience</strong>, <strong className="text-white">Perplexity</strong>, and <strong className="text-white">LLM Retrieval</strong>.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
