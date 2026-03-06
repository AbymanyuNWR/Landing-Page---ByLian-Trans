"use client";

import { useState } from "react";
import { X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-primary text-primary-foreground text-sm font-medium"
            >
                <div className="container flex items-center justify-center p-2 text-center relative max-w-7xl">
                    <span className="flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Promo Spesial: Diskon 20% Rute Tegal - Jakarta pakai kode <b>BYLIANHEMAT</b>
                    </span>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-4 p-1 rounded-md hover:bg-primary-dark transition-colors"
                        aria-label="Tutup Pengumuman"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
