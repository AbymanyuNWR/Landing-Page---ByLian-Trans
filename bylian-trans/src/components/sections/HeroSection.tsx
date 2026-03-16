"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Star, Bus, Map, Users } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";
import { SearchBoxSection } from "./SearchBoxSection";
import { COMPANY_DATA } from "@/data/bylian.data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
    const opacityHero = useTransform(scrollY, [0, 500], [0.6, 0]);

    return (
        <section ref={ref} className="relative w-full min-h-[90vh] flex flex-col justify-center pt-20 overflow-hidden bg-slate-900">

            {/* Background Image & Overlay */}
            <motion.div 
                className="absolute inset-0 z-0 overflow-hidden"
                style={{ y: yHero }}
            >
                <motion.div style={{ opacity: opacityHero }} className="absolute inset-0">
                    <Image
                        src="/images/hero/hero-bus.jpg"
                        alt="Bylian Trans Luxury Bus"
                        fill
                        priority
                        className="object-cover mix-blend-overlay scale-105"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-50 dark:to-slate-950"></div>
                
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 animate-pulse"></div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="container relative z-10 mx-auto px-4 text-center mt-10 md:mt-20 mb-40 md:mb-48 lg:mb-56">

                {/* Premium Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-white/20 text-white text-sm font-semibold mb-8 animate-fade-in-up shadow-lg">
                    <Bus size={18} className="text-accent" />
                    <span className="text-white/90">Transportasi Terpercaya dari Kota Tegal</span>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                </div>

                {/* Headings */}
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black mb-6 animate-fade-in-up animate-delay-100" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-lg">
                        {COMPANY_DATA.tagline}
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 font-medium animate-fade-in-up animate-delay-200 leading-relaxed">
                    {COMPANY_DATA.subTagline} <br />
                    <span className="text-white/60 text-lg">Nikmati perjalanan premium dengan harga terjangkau</span>
                </p>

                {/* Trust Badges - Premium Style */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-14 animate-fade-in-up animate-delay-300">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-lg">
                        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                            <Star className="text-accent fill-accent" size={20} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{COMPANY_DATA.stats.rating}</div>
                            <div className="text-xs text-white/60">Rating Pelanggan</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-lg">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                            <Bus className="text-blue-400" size={20} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{COMPANY_DATA.stats.totalFleet}</div>
                            <div className="text-xs text-white/60">Armada Bus</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-lg">
                        <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                            <Map className="text-sky-400" size={20} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{COMPANY_DATA.stats.activeRoutes}</div>
                            <div className="text-xs text-white/60">Rute Perjalanan</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-lg">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <Users className="text-green-400" size={20} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{(COMPANY_DATA.stats.monthlyPassengers / 1000).toFixed(1)}K+</div>
                            <div className="text-xs text-white/60">Penumpang/Bulan</div>
                        </div>
                    </div>
                </div>

                {/* CTAs - Premium Style */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animate-delay-400">
                    <Link href="/rute">
                        <Button className="btn-premium bg-primary hover:bg-primary/90 text-white h-14 px-8 text-lg rounded-xl shadow-glow">
                            Lihat Semua Rute
                        </Button>
                    </Link>
                    <Link href="/charter">
                        <Button variant="outline" className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white hover:text-slate-900 h-14 px-8 text-lg rounded-xl">
                            Charter Bus Rombongan
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
