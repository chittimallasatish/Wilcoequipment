import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Loader2, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2, 
  RotateCcw, 
  Sparkles,
  Phone,
  Mail,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import Markdown from "react-markdown";

interface Message {
  role: "user" | "model";
  text: string;
  action?: {
    type: "quote" | "call" | "email";
    label: string;
    payload?: string;
  };
}

interface ChatBotProps {
  onOpenQuote?: (service?: string) => void;
}

// Knowledge Base Engine for Wilco Equipment Co.
function getLocalKnowledgeResponse(query: string): { text: string; action?: Message["action"] } {
  const q = query.toLowerCase();

  // 1. Pump inquiries
  if (q.includes("pump") || q.includes("fristam") || q.includes("alfa laval pump") || q.includes("positive displacement") || q.includes("centrifugal")) {
    return {
      text: `### Sanitary & Industrial Pump Systems\nWilco distributes, sizes, and installs high-efficiency sanitary pumps for fluid transfer, CIP, and high-viscosity applications:\n\n* **Leading Brands:** **Alfa Laval**, **Fristam**, **SPX Flow / APV**, **Wright Pumps**, **Ampco**, **Admix**, **Murzan**, and **Axiflow**.\n* **Pump Configurations:**\n  * **Centrifugal Pumps:** Sanitary CIP return, fluid milk, beverage transfer, and washdown.\n  * **Positive Displacement (PD):** Rotary lobe, circumferential piston, and twin-screw for shear-sensitive or viscous products (creams, syrups, sauces).\n  * **Air-Operated Diaphragm & Shear Mixers:** High-solids and emulsification.\n\nNeed pump sizing assistance or replacement mechanical seals?`,
      action: { type: "quote", label: "Request Pump Specs & Quote", payload: "Pumps" }
    };
  }

  // 2. Valve inquiries
  if (q.includes("valve") || q.includes("mixproof") || q.includes("butterfly") || q.includes("seat valve") || q.includes("diaphragm")) {
    return {
      text: `### Sanitary Valves & Automated Mixproof Matrices\nWe carry an extensive inventory of sanitary 3-A and ASME-certified valves with pneumatic actuators and digital control tops:\n\n* **Valve Types:**\n  * **Double-Seat Mixproof Valves:** Prevent cross-contamination between product and CIP lines during active processing.\n  * **Single-Seat & Divert Valves:** Sanitary shutoff, flow diversion, and throttling.\n  * **Sanitary Butterfly & Ball Valves:** 1" to 6" Tri-Clamp manual or automated.\n  * **Diaphragm & Check Valves:** Sterile aseptic processing.\n* **Authorized Brands:** **Alfa Laval**, **Pentair (Südmo / Keystone)**, **GEA (Tuchenhagen)**, **SPX**, **Definox**, **Tru-Flo**, and **Burkert**.\n\nWe also shop-fabricate custom modular valve matrix skids pre-wired and pre-tested.`,
      action: { type: "quote", label: "Request Valve Matrix Quote", payload: "Sanitary Valves" }
    };
  }

  // 3. Skid Fabrication & CIP
  if (q.includes("skid") || q.includes("cip") || q.includes("clean-in-place") || q.includes("fabricat") || q.includes("modular") || q.includes("matrix") || q.includes("pasteuriz")) {
    return {
      text: `### Custom Modular Skid Fabrication\nAll Wilco modular skids are 3D modeled, shop-fabricated, and pre-commissioned at our Wills Point, TX facility to minimize customer on-site downtime:\n\n* **Automated CIP Systems:** Single, dual, and triple-tank Clean-In-Place units with automated chemical dosing, conductivity feedback, and heat exchangers.\n* **Valve Matrices & Flow Panels:** High-density automated manifolds engineered for seamless product changeovers.\n* **HTST Pasteurizers & Thermal Systems:** Skid-mounted plates, holding tubes, and diversion loops for dairy and beverage processing.\n* **Blending & Dosing Skids:** Precision ingredient incorporation and metering.\n\nSkids ship fully wired, passivated, hydro-tested, and ready for utility tie-in.`,
      action: { type: "quote", label: "Configure Skid Fabrication RFQ", payload: "Skid Fabrication" }
    };
  }

  // 4. Piping & Welding Standards (ASME, 3-A, Orbital)
  if (q.includes("pipe") || q.includes("piping") || q.includes("weld") || q.includes("orbital") || q.includes("borescope") || q.includes("stainless") || q.includes("passivat") || q.includes("316") || q.includes("tubing")) {
    return {
      text: `### Process Piping & Sanitary Orbital Welding\nWilco provides turnkey mechanical piping installation adhering to the strictest sanitary standards:\n\n* **Metallurgy:** ASTM A270 304L and 316L high-purity stainless tubing with Ra < 15–20 μin internal surface finishes.\n* **Welding Standards:** Automated orbital TIG welding in compliance with **ASME Section IX** and **ASME BPE** guidelines.\n* **Quality Verification:** 100% video borescope weld inspection, helium/hydrostatic leak testing, and ASTM A967 chemical passivation logs included in the handover turn-over binder.\n* **Services:** Pipe routing, overhead stainless rack fabrication, drop installation, and emergency shutdown tie-ins.`,
      action: { type: "quote", label: "Request Piping Installation Quote", payload: "Pipe Installation" }
    };
  }

  // 5. Instrumentation & Controls
  if (q.includes("instrument") || q.includes("sensor") || q.includes("meter") || q.includes("pressure") || q.includes("temperature") || q.includes("transmitter") || q.includes("anderson")) {
    return {
      text: `### Sanitary Process Instrumentation\nWe supply and calibrate instrumentation designed for hygienic processing and washdown environments:\n\n* **Level & Pressure:** Anderson-Negele hygienic pressure sensors, hydrostatic level transmitters, and differential gauges.\n* **Flow Measurement:** Micro Motion Coriolis mass flow meters, Endress+Hauser electromagnetic sanitary flowmeters, and sanitary vortex units.\n* **Temperature & Analytical:** Sanitary RTD probes, thermowells, inline turbidity monitors, and conductivity sensors for CIP verification.\n* **Brands:** **Anderson-Negele**, **Micro Motion (Emerson)**, **Endress+Hauser**, **Chicago Stainless**, and **Rosemount**.`,
      action: { type: "quote", label: "Request Instrumentation Specs", payload: "Instrumentation" }
    };
  }

  // 6. Steam & Refrigeration
  if (q.includes("steam") || q.includes("refrigerat") || q.includes("trap") || q.includes("glycol") || q.includes("spirax") || q.includes("boiler") || q.includes("heat exchanger")) {
    return {
      text: `### Clean Steam, Condensate & Utility Refrigeration\nProcess plants require reliable utility piping to maintain product temperature integrity:\n\n* **Clean Steam & Trapping:** Spirax Sarco, TLV, and Armstrong clean steam traps, pressure reducing stations, and condensate return pumps.\n* **Utility Valves:** Industrial butterfly valves, globe control valves, and backflow preventers.\n* **Refrigeration & Glycol Loops:** Piping for glycol chillers, ammonia headers, Hansen, Henry, Phillips, and Vilter valves.\n* **Plate & Tubular Heat Exchangers:** Alfa Laval sanitary and industrial heat exchangers.`,
      action: { type: "quote", label: "Request Steam & Utility Specs", payload: "Steam & Refrigeration" }
    };
  }

  // 7. Quote, RFQ, Pricing, Lead Time
  if (q.includes("quote") || q.includes("rfq") || q.includes("price") || q.includes("cost") || q.includes("bid") || q.includes("estimate") || q.includes("lead time")) {
    return {
      text: `### Online RFQ & Fast Project Estimates\nYou can request an engineering estimate in three quick ways:\n\n1. **Online RFQ Specifier:** Fill out our interactive form with your equipment category, pipe diameters, metallurgy, and timeline.\n2. **Direct Sales Contact:** Reach Kyle directly at **[Kyle@wilcoequipmentco.com](mailto:Kyle@wilcoequipmentco.com)** or call **[(903) 873-6700](tel:9038736700)**.\n3. **Turnaround Times:** Standard catalog components ship same or next business day from Wills Point stock; custom spool pieces and skids fast-tracked to meet your plant shutdown windows.`,
      action: { type: "quote", label: "Open Online RFQ Specifier", payload: "General RFQ" }
    };
  }

  // 8. Contact, Location, Hours, Phone
  if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("address") || q.includes("location") || q.includes("hours") || q.includes("where") || q.includes("kyle")) {
    return {
      text: `### Wilco Equipment Co., Inc. Contact Details\n* **Plant & Shop Address:** 101 Blue Bird PKWY, Wills Point, TX 75169\n* **Direct Phone:** **(903) 873-6700**\n* **Direct Email:** **Kyle@wilcoequipmentco.com**\n* **Hours of Operation:** Monday – Friday, 7:00 AM – 5:00 PM CST (24/7 on-call emergency shutdown dispatch available for active contract facilities).\n\nFeel free to call us directly or submit an RFQ online.`,
      action: { type: "call", label: "Call (903) 873-6700" }
    };
  }

  // 9. Safety, Certifications & Quality Record
  if (q.includes("safety") || q.includes("certif") || q.includes("isnetworld") || q.includes("3-a") || q.includes("asme") || q.includes("osha")) {
    return {
      text: `### Safety & Regulatory Accreditations\nWilco upholds rigorous safety and sanitary compliance standards across all client facilities:\n\n* **ISNetworld:** A-Rated mechanical contractor with verified OSHA logs and comprehensive site safety management.\n* **3-A Sanitary Standards:** Certified sanitary fabrication and installation for Grade-A dairy and food processing plants.\n* **ASME Section IX:** Qualified welding procedures and certified welders for high-purity pressure piping.\n* **SME Affiliation:** Active Society of Manufacturing Engineers member committed to advancing sanitary processing automation.`,
      action: { type: "quote", label: "Consult on Compliant Scope", payload: "Pipe Installation" }
    };
  }

  // Default / General Inquiries
  return {
    text: `### Wilco Equipment Technical Support\nWilco Equipment Co., Inc. (established 1987 in Wills Point, TX) specializes in turnkey sanitary process systems, high-purity piping, modular skid fabrication, and premium equipment distribution.\n\n**How can we assist your plant?**\n* **Pumps & Fluid Handling** (Alfa Laval, Fristam, SPX, Ampco)\n* **Sanitary & Mixproof Valves** (Pentair, GEA, Tru-Flo, Burkert)\n* **Modular Skids** (Automated CIP, Valve Matrices, Pasteurizers)\n* **High-Purity Process Piping** (ASME BPE Orbital Welding)\n* **Process Instrumentation & Steam Systems**\n\nType your question or choose an option below to get specifications and pricing.`,
    action: { type: "quote", label: "Submit Project RFQ", payload: "General" }
  };
}

export default function ChatBot({ onOpenQuote }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "model", 
      text: "Hello! Welcome to Wilco Equipment Co. I can help you with sanitary process equipment specs, pump sizing, valve matrix skids, or project quotes. What can I assist you with today?",
      action: { type: "quote", label: "Start an RFQ Specifier" }
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    // Simulate natural processing delay (350ms) for high-responsiveness and reliability
    setTimeout(() => {
      try {
        const responseData = getLocalKnowledgeResponse(userMessage);
        setMessages(prev => [
          ...prev, 
          { 
            role: "model", 
            text: responseData.text,
            action: responseData.action
          }
        ]);
      } catch (err) {
        console.warn("Local assistant fallback handling:", err);
        setMessages(prev => [
          ...prev, 
          { 
            role: "model", 
            text: "You can reach Kyle and our engineering team directly at **(903) 873-6700** or via email at **Kyle@wilcoequipmentco.com**.",
            action: { type: "call", label: "Call (903) 873-6700" }
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }, 350);
  };

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt);
  };

  const handleActionClick = (action: Message["action"]) => {
    if (!action) return;
    if (action.type === "quote" && onOpenQuote) {
      onOpenQuote(action.payload);
    } else if (action.type === "call") {
      window.location.href = "tel:9038736700";
    } else if (action.type === "email") {
      window.location.href = "mailto:Kyle@wilcoequipmentco.com";
    }
  };

  const clearChat = () => {
    setMessages([
      { 
        role: "model", 
        text: "Hello! Welcome to Wilco Equipment Co. I can help you with sanitary process equipment specs, pump sizing, valve matrix skids, or project quotes. What can I assist you with today?",
        action: { type: "quote", label: "Start an RFQ Specifier" }
      }
    ]);
  };

  const quickPrompts = [
    "What pump brands do you carry?",
    "Mixproof valves & valve matrix",
    "Automated CIP skids",
    "Orbital welding & ASME BPE",
    "How to request a quote?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "64px" : "600px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[360px] sm:w-[420px] max-w-[94vw] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all"
          >
            {/* Header */}
            <div className="bg-slate-950 p-4 flex items-center justify-between text-white border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black uppercase italic tracking-tighter text-sm flex items-center gap-2">
                    Wilco Assistant
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50">
                      Technical Spec
                    </span>
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                      Online • Wills Point, TX
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={clearChat}
                  title="Reset Conversation"
                  className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white cursor-pointer"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Container */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70"
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.role === "user" ? 15 : -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-2.5 max-w-[88%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                          msg.role === "user" ? "bg-blue-600 text-white" : "bg-slate-900 text-blue-400"
                        }`}>
                          {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                        </div>
                        <div className="space-y-2">
                          <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            msg.role === "user" 
                              ? "bg-blue-600 text-white rounded-tr-none shadow-sm" 
                              : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-none shadow-sm"
                          }`}>
                            <div className="prose prose-xs max-w-none text-slate-800 space-y-1.5 font-normal">
                              <Markdown>{msg.text}</Markdown>
                            </div>
                          </div>

                          {/* Quick Interactive Action Button */}
                          {msg.role === "model" && msg.action && (
                            <button
                              onClick={() => handleActionClick(msg.action)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200/80 transition-all hover:scale-105 cursor-pointer shadow-xs"
                            >
                              {msg.action.type === "quote" && <FileText className="w-3.5 h-3.5 text-blue-600" />}
                              {msg.action.type === "call" && <Phone className="w-3.5 h-3.5 text-blue-600" />}
                              {msg.action.type === "email" && <Mail className="w-3.5 h-3.5 text-blue-600" />}
                              <span>{msg.action.label}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2.5 max-w-[88%]">
                        <div className="w-7 h-7 rounded-lg bg-slate-900 text-blue-400 flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                        <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                          <span className="text-xs text-slate-500 font-medium">Checking engineering specs...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Prompts Chips */}
                <div className="px-3 py-2 bg-slate-50 border-t border-slate-200/70 flex gap-1.5 overflow-x-auto no-scrollbar">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(prompt)}
                      className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 px-2.5 py-1 rounded-full whitespace-nowrap transition-all shadow-2xs hover:shadow-xs shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-blue-500 shrink-0" />
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white border-t border-slate-100">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask about pumps, valves, CIP skids, or RFQs..."
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-800 placeholder-slate-400 outline-none"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1 font-semibold uppercase tracking-wider">
                    <span>Direct engineering support</span>
                    <span>(903) 873-6700</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <div className="relative group">
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center">
            <span className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-wider whitespace-nowrap border border-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-blue-400" />
              Need specs or a quote? Chat now
            </span>
            <div className="w-2 h-2 bg-slate-900 rotate-45 -ml-1 border-r border-t border-slate-800" />
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className={`relative w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-blue-700 shadow-blue-600/40 cursor-pointer ${
            isOpen ? "rotate-90 scale-0 opacity-0 pointer-events-none" : "rotate-0 scale-100 opacity-100"
          }`}
          aria-label="Open Technical Assistant"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
        </motion.button>
      </div>
    </div>
  );
}
