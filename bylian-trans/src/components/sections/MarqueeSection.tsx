"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { ROUTES_DATA } from "@/data/bylian.data";
import { MapPin } from "lucide-react";

export function MarqueeSection() {
    // Extract unique destinations
    const destinations = Array.from(new Set(ROUTES_DATA.map(r => r.destination)));
    // Add more cities for visual density
    const allItems = [...destinations, "Semarang", "Yogyakarta", "Solo", "Purwokerto", "Cirebon", "Tegal", "Surabaya", "Malang"];

    return (
        <div className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900 py-4 border-y border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
            <div className="container mx-auto flex items-center">
                <div className="pr-6 font-bold text-slate-800 dark:text-white text-sm uppercase shrink-0 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    Melayani Rute:
                </div>
                <Marquee
                    gradient={false}
                    speed={35}
                    pauseOnHover={true}
                    className="flex-1"
                >
                    {allItems.map((city, idx) => (
                        <div
                            key={idx}
                            className="mx-6 md:mx-10 text-base font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider hover:text-primary transition-colors cursor-default"
                        >
                            {city}
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}

