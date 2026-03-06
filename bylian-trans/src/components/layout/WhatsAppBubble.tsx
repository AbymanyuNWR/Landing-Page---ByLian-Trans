"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppCsUrl } from "@/lib/whatsapp";

export function WhatsAppBubble() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;
        window.open(getWhatsAppCsUrl(message), "_blank");
        setMessage("");
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-80 mb-4 overflow-hidden"
                    >
                        <div className="bg-[#25D366] p-4 text-white flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg leading-none">Bylian Trans CS</h3>
                                <p className="text-sm opacity-90 mt-1">Kami membalas dalam beberapa menit</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-950 h-48 overflow-y-auto flex flex-col gap-3">
                            <div className="bg-white dark:bg-slate-900 self-start py-2 px-4 rounded-2xl rounded-tl-sm shadow-sm text-sm border border-slate-100 dark:border-slate-800 max-w-[85%]">
                                Halo! Ada yang bisa kami bantu seputar tiket atau rute Bylian Trans?
                            </div>
                        </div>

                        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Ketik pesan..."
                                className="flex-1 bg-slate-100 dark:bg-slate-950 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#25D366]"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!message.trim()}
                                className="bg-[#25D366] text-white p-2 rounded-full cursor-pointer hover:bg-[#20bd5a] transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4 ml-0.5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105 relative z-50 flex items-center justify-center animate-pulse-ring"
            >
                <span className="sr-only">Hubungi Kami via WhatsApp</span>
                {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
            </button>
        </div>
    );
}
