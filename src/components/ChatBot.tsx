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
  Sparkles
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

const SYSTEM_INSTRUCTION = `
You are the Wilco Equipment Co. AI Assistant. Your role is to help customers find industrial equipment and answer technical questions about our products and services.

Company Overview:
Wilco Equipment Co. specializes in high-purity process systems, sanitary piping, and industrial equipment for the food, dairy, beverage, and pharmaceutical industries.

Available Equipment & Brands:
1. Pumps:
   - Brands: Alfa Laval, Fristam, SPX, Wright Pumps, Ampco Pumps, Admix, Murzan, Axiflow, Bell & Gossett.
   - Types: Centrifugal, Positive Displacement, Diaphragm, Shear Mixers.

2. Sanitary Valves:
   - Brands: Alfa Laval, Pentair (Sudmo, Keystone), GEA (Tuchenhagen), SPX, Definox, Tru-Flo, Burkert, Schubert & Salzer, SVF, Lumaco.
   - Types: Butterfly, Sanitary Seat, Mixproof, Diaphragm, Ball, Check.

3. Instrumentation:
   - Brands: Anderson-Negele, Micro Motion, Endress+Hauser, Chicago Stainless, Lumenite, Rosemount.
   - Types: Pressure Transmitters, Temperature Gauges, Flow Meters.

4. Skid Fabrication:
   - Custom-engineered modular systems: CIP (Clean-In-Place) Skids, Valve Matrix, Flow Panels, Pasteurizers, Blending Skids, Pump Skids.

5. Pipe Installation:
   - Sanitary Fittings, Tubing, Sampling.
   - Brands: VNE, Top Line, QMI, United Industries, Rath, Wilco-Flow Panels, AWI, Strahman, Ham-let, Perlick.

6. Steam & Refrigeration:
   - Regulators, Traps, Condensate Recovery, Valves, Purgers, Heat Exchangers.
   - Brands: Spirax Sarco, TLV, Spence, Armstrong, Hansen, Henry, Phillips, Vilter, Alfa Laval.

7. Industrial Valves:
   - Ball Valves, Check Valves, Backflow Preventors, Regulators, Butterfly valves.
   - Brands: QSM/Tru-Flo, Sharpe, Watts, Flow-Line, Keystone, Bell & Gossett, Burkert, Schubert & Salzer, Bray, Conbraco.

8. General Equipment:
   - Homogenizers, Mixers, Strainers, Filters, Tanks, Hose Assemblies.

Services:
- Design & Engineering
- Precision Fabrication
- Sanitary Installation
- Quality Assurance (ASME, 3-A Standards)
- Rigging & Installation

Guidelines:
- Be professional, technical, and efficient.
- If a customer asks for a quote, suggest they use the "Request Quote" button or contact sales@wilcoequipment.com.
- Provide detailed descriptions of equipment when asked.
- If you don't know the answer, politely suggest they contact our technical support team.
- Use markdown for clear formatting.
`;

interface Message {
  role: "user" | "model";
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hello! I'm your Wilco Equipment assistant. How can I help you with your process system needs today?" }
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

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const response = await chat.sendMessage({ message: userMessage });
      const botResponse = response.text || "I'm sorry, I couldn't process that request.";
      
      setMessages(prev => [...prev, { role: "model", text: botResponse }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: "model", text: "I'm having trouble connecting right now. Please try again later or contact us directly at (903) 873-6700." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt);
  };

  const clearChat = () => {
    setMessages([
      { role: "model", text: "Hello! I'm your Wilco Equipment assistant. How can I help you with your process system needs today?" }
    ]);
  };

  const quickPrompts = [
    "What pump brands do you carry?",
    "Sanitary valves & mixproof options",
    "What modular skids do you fabricate?",
    "How do I request a custom piping quote?"
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
            className="mb-4 w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black uppercase italic tracking-tighter text-sm">Wilco Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={clearChat}
                  title="Reset Conversation"
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-300 hover:text-white"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                          msg.role === "user" ? "bg-blue-600" : "bg-slate-200"
                        }`}>
                          {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-slate-600" />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "user" 
                            ? "bg-blue-600 text-white rounded-tr-none" 
                            : "bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm"
                        }`}>
                          <div className="markdown-body">
                            <Markdown>{msg.text}</Markdown>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-slate-600" />
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-slate-200 rounded-tl-none shadow-sm">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Prompts Chips */}
                <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(prompt)}
                      className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 px-3 py-1.5 rounded-full whitespace-nowrap transition-all shadow-2xs hover:shadow-xs shrink-0 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-blue-500" />
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-slate-100">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask about pumps, valves, or services..."
                      className="w-full pl-4 pr-12 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-600 transition-all text-slate-800 placeholder-slate-400"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 text-center font-medium uppercase tracking-wider">
                    Powered by Wilco AI • Sanitary Process Experts
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <div className="relative group">
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center">
            <span className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-wider whitespace-nowrap border border-slate-800">
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
          className={`relative w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:bg-blue-700 shadow-blue-600/30 ${
            isOpen ? "rotate-90 scale-0 opacity-0 pointer-events-none" : "rotate-0 scale-100 opacity-100"
          }`}
          aria-label="Open AI Assistant"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
        </motion.button>
      </div>
    </div>
  );
}
