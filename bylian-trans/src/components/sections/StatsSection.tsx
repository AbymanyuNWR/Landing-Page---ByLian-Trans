"use client";

import React, { useEffect, useState, useRef } from "react";
import { COMPANY_DATA } from "@/data/bylian.data";
import { Bus, Map, Users, Star } from "lucide-react";

interface CounterProps {
    endValue: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ endValue, duration = 2000, suffix = "", prefix = "" }) => {
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

            const nextCount = Math.min(Math.floor((progress / duration) * endValue), endValue);
            setCount(nextCount);

            if (progress < duration) {
                requestAnimationFrame(animateCount);
            }
        };

        requestAnimationFrame(animateCount);
    }, [isVisible, duration, endValue]);

    return (
        <div ref={ref} className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-2">
            {prefix}{count}{suffix}
        </div>
    );
};

export function StatsSection() {
    const stats = [
        {
            id: 1,
            label: "Armada Bus",
            value: COMPANY_DATA.stats.totalFleet,
            suffix: "+",
            icon: <Bus size={32} className="text-primary mb-4 mx-auto opacity-80" />
        },
        {
            id: 2,
            label: "Rute Aktif",
            value: COMPANY_DATA.stats.activeRoutes,
            suffix: "+",
            icon: <Map size={32} className="text-primary mb-4 mx-auto opacity-80" />
        },
        {
            id: 3,
            label: "Penumpang Puas",
            value: 15,
            suffix: "+ rb",
            icon: <Users size={32} className="text-primary mb-4 mx-auto opacity-80" />
        },
        {
            id: 4,
            label: "Rating Kepuasan",
            value: 4,
            suffix: ".8/5",
            icon: <Star size={32} className="text-primary mb-4 mx-auto opacity-80" />
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-slate-900 overflow-hidden relative">
            {/* Abstract Background patterns */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat) => (
                        <div key={stat.id} className="text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                {stat.icon}
                            </div>
                            <AnimatedCounter
                                endValue={stat.value}
                                suffix={stat.suffix}
                            />
                            <p className="text-blue-100 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
