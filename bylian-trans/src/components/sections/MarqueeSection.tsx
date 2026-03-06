"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { ROUTES_DATA } from "@/data/bylian.data";

export function MarqueeSection() {
    // Extract unique destinations
    const destinations = Array.from(new Set(ROUTES_DATA.map(r => r.destination)));
    // Add some more for visual density if too few
    const allItems = [...destinations, "Semarang", "Yogyakarta", "Solo", "Purwokerto", "Cirebon", "Tegal"];

    return (
        <div className="w-full bg-slate-100 dark:bg-slate-800/50 py-3 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="container mx-auto flex items-center">
                <div className="pr-6 font-semibold text-slate-500 text-sm uppercase shrink-0">
                    Melayani Rute:
                </div>
                <Marquee
                    gradient={false}
                    speed={40}
                    pauseOnHover={true}
                    className="flex-1"
                >
                    {allItems.map((city, idx) => (
                        <div
                            key={idx}
                            className="mx-6 md:mx-12 text-lg font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
                        >
                            {city}
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}
