"use client";

import React from "react";
import Image from "next/image";
import { Star, Bus, Map, Users } from "lucide-react";
import { SearchBoxSection } from "./SearchBoxSection";
import { COMPANY_DATA } from "@/data/bylian.data";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col justify-center pt-20">

            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
                <Image
                    src="/images/hero/hero-bus.jpg"
                    alt="Bylian Trans Luxury Bus"
                    fill
                    priority
                    className="object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-50 dark:to-slate-900"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center mt-10 md:mt-20 mb-32">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 animate-fade-in-up">
                    <Bus size={16} className="text-accent" />
                    <span>Transportasi Terpercaya dari Kota Tegal</span>
                </div>

                {/* Headings */}
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200 drop-shadow-sm">
                        {COMPANY_DATA.tagline}
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 font-medium animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    {COMPANY_DATA.subTagline}
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
                    <div className="flex items-center gap-2 text-white/90 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <Star className="text-accent fill-accent" size={18} />
                        <span className="font-semibold">{COMPANY_DATA.stats.rating}/5</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <Bus className="text-blue-400" size={18} />
                        <span className="font-semibold">{COMPANY_DATA.stats.totalFleet} Armada</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <Map className="text-blue-400" size={18} />
                        <span className="font-semibold">{COMPANY_DATA.stats.activeRoutes} Rute</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <Users className="text-blue-400" size={18} />
                        <span className="font-semibold">{COMPANY_DATA.stats.monthlyPassengers} Penumpang</span>
                    </div>
                </div>

                {/* Secondary CTAs */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                    <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-slate-900 rounded-xl h-12 px-6">
                        Lihat Semua Rute
                    </Button>
                    <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-slate-900 rounded-xl h-12 px-6">
                        Charter Bus Rombongan
                    </Button>
                </div>

            </div>

            <SearchBoxSection />

        </section>
    );
}
