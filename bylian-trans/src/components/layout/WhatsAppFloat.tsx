"use client";

import React, { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { COMPANY_DATA } from "@/data/bylian.data";

export function WhatsAppFloat() {
    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
        // Show bubble after 5 seconds
        const timer = setTimeout(() => {
            const hasSeenBubble = localStorage.getItem("bylian_wa_bubble_seen");
            if (!hasSeenBubble) {
                setShowBubble(true);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleCloseBubble = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowBubble(false);
        localStorage.setItem("bylian_wa_bubble_seen", "true");
    };

    const handleWhatsAppClick = () => {
        const text = encodeURIComponent("Halo Bylian Trans, saya ingin bertanya tentang...");
        window.open(`https://wa.me/${COMPANY_DATA.contacts.csWhatsApp}?text=${text}`, "_blank");
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">

            {/* WA Bubble Popup */}
            {showBubble && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 w-72 mb-2 animate-fade-in-up border border-slate-100 dark:border-slate-700 relative">
                    <button
                        onClick={handleCloseBubble}
                        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                        <X size={16} />
                    </button>
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <span className="text-xl">👩🏻‍💼</span>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-800 dark:text-white text-sm">Admin Bylian Trans</p>
                            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">Halo! Ada yang bisa kami bantu? 😊</p>
                        </div>
                    </div>
                    <button
                        onClick={handleWhatsAppClick}
                        className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-colors text-sm"
                    >
                        Chat Sekarang
                    </button>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={handleWhatsAppClick}
                className="group relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:pr-32 hover:w-auto transition-all duration-300 overflow-hidden"
                aria-label="Hubungi via WhatsApp"
            >
                <div className="absolute w-full h-full rounded-full animate-pulse-sonar bg-green-500/50 pointer-events-none"></div>

                <div className="flex items-center h-full w-full">
                    <div className="w-14 h-14 flex items-center justify-center shrink-0">
                        <MessageCircle className="text-white fill-white" size={28} />
                    </div>
                    <span className="text-white font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-4">
                        Hubungi CS
                    </span>
                </div>
            </button>
        </div>
    );
}
