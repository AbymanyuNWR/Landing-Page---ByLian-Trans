"use client";

import React, { useEffect, useState, useRef } from "react";
import { COMPANY_DATA } from "@/data/bylian.data";
import { Bus, Map, Users, Star, Award, Clock, Shield } from "lucide-react";

interface CounterProps {
    endValue: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ endValue, duration = 2000, suffix = "", prefix = "", decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            const easeOutQuart = 1 - Math.pow(1 - progress / duration, 4);
            const nextCount = Math.min(easeOutQuart * endValue, endValue);
            setCount(nextCount);

            if (progress < duration) {
                requestAnimationFrame(animateCount);
            }
        };

        requestAnimationFrame(animateCount);
    }, [isVisible, duration, endValue]);

    const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

    return (
        <div ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-2 tracking-tight">
            {prefix}{displayValue}{suffix}
        </div>
    );
};

export function StatsSection() {
    const stats = [
        {
            id: 1,
            label: "Armada Bus Premium",
            value: COMPANY_DATA.stats.totalFleet,
            suffix: "+",
            icon: <Bus size={28} />,
            bgColor: "from-blue-500 to-blue-600",
            description: "Bus berkualitas tinggi"
        },
        {
            id: 2,
            label: "Rute Perjalanan",
            value: COMPANY_DATA.stats.activeRoutes,
            suffix: "+",
            icon: <Map size={28} />,
            bgColor: "from-green-500 to-emerald-600",
            description: "Menghubungkan berbagai kota"
        },
        {
            id: 3,
            label: "Penumpang Puas",
            value: 50,
            suffix: "rb+",
            icon: <Users size={28} />,
            bgColor: "from-purple-500 to-violet-600",
            description: "Setiap bulannya"
        },
        {
            id: 4,
            label: "Rating Kepuasan",
            value: 4.9,
            suffix: "",
            decimals: 1,
            icon: <Star size={28} />,
            bgColor: "from-amber-500 to-orange-600",
            description: "Bintang dari pelanggan"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 overflow-hidden relative">
            {/* Abstract Background patterns */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -right-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-semibold mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        ANGKA KEBANGGAAN KAMI
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                        Telah Melayani <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400">Ribuan Pelanggan</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Angka-angka ini bukan sekadar statistik, tetapi bukti nyata kepercayaan pelanggan terhadap layanan kami.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat) => (
                        <div 
                            key={stat.id} 
                            className="group relative p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 hover:-translate-y-2"
                        >
                            {/* Gradient glow on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                            
                            <div className="relative z-10">
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${stat.bgColor} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="text-white">{stat.icon}</div>
                                </div>
                                
                                <AnimatedCounter
                                    endValue={stat.value}
                                    suffix={stat.suffix}
                                    decimals={stat.decimals || 0}
                                />
                                
                                <p className="text-white font-bold text-sm md:text-base mb-1">{stat.label}</p>
                                <p className="text-slate-400 text-xs">{stat.description}</p>
                            </div>

                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-3xl">
                                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/5 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

