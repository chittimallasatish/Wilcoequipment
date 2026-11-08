import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Phone, Mail, ArrowRight, ShieldCheck, Clock, FileText } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEquipment?: string;
}

export default function QuoteModal({ isOpen, onClose, initialEquipment = "" }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "Dairy & Food Processing",
    equipmentType: initialEquipment || "Process Skids & Piping",
    timeline: "Within 1-3 Months",
    notes: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `WILCO-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuoteId(generatedId);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-8"
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-400">
                  Engineering & Equipment Specifier
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tighter">
                Request a <span className="text-blue-500">Project Quote</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-lg font-medium">
                Direct consultation with our process piping engineers and certified millwright specialists.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-6">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                      Request Confirmed
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight mt-1">
                      Quote Request Received!
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
                      Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Our technical sales team has received your project parameters.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 max-w-sm mx-auto border border-slate-200 text-left">
                    <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                      <span className="font-bold uppercase tracking-wider">Tracking Reference:</span>
                      <span className="font-mono font-bold text-blue-600">{quoteId}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span className="font-bold uppercase tracking-wider">Service Scope:</span>
                      <span className="font-medium text-slate-800">{formData.equipmentType}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <a
                      href="tel:9038736700"
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black uppercase tracking-wider text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                    >
                      <Phone className="w-4 h-4" /> Call Direct: (903) 873-6700
                    </a>
                    <button
                      onClick={handleReset}
                      className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-black uppercase tracking-wider text-xs hover:bg-slate-200 transition-all"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Dairy Products"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(903) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        Equipment / Service Needed
                      </label>
                      <select
                        value={formData.equipmentType}
                        onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white transition-all font-medium text-slate-800"
                      >
                        <option value="Process Skids & Piping">Custom Process Skids & Piping</option>
                        <option value="Sanitary Pumps">Sanitary Pumps (Alfa Laval, Fristam)</option>
                        <option value="Sanitary Valves">Sanitary & Mixproof Valves</option>
                        <option value="CIP Clean-in-Place Skids">CIP Clean-in-Place Skids</option>
                        <option value="Instrumentation & Controls">Flow/Pressure Instrumentation</option>
                        <option value="Heavy Rigging & Millwright">Heavy Rigging & Millwright Installation</option>
                        <option value="Steam & Refrigeration">Steam & Refrigeration Specialties</option>
                        <option value="Full Line Card Distribution">Authorized Equipment Distribution</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        Industry Sector
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white transition-all font-medium text-slate-800"
                      >
                        <option value="Dairy & Food Processing">Dairy & Food Processing</option>
                        <option value="Brewery & Beverage">Brewery & Beverage</option>
                        <option value="Pharmaceutical & Biotech">Pharmaceutical & Biotech</option>
                        <option value="Cosmetics & Personal Care">Cosmetics & Personal Care</option>
                        <option value="Industrial & Chemical">Industrial & Chemical</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                      Project Notes / Specifications
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Include pipe sizes (e.g. 2-inch Tri-Clamp), flow rates, delivery target, or specific brands required..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Trust badges */}
                  <div className="flex items-center justify-between py-2 border-t border-slate-100 text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      ASME & 3-A Standards
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-600" />
                      Rapid 24-48h Response
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:gap-3"
                  >
                    Submit RFQ Specification <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
