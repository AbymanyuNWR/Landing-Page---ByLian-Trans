"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FLEET_DATA } from "@/data/bylian.data";
import { Check, ArrowRight, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ArmadaSection() {
    return (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                            <Bus className="w-3.5 h-3.5" />
                            KOLISI KAMI
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-slate-900 dark:text-white leading-tight">
                            Armada Premium Bylian Trans
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            Nikmati perjalanan mewah dengan armada bus terbaru yang dilengkapi fasilitas premium untuk kenyamanan maksimal Anda.
                        </p>
                    </div>
                    <Link href="/armada" className="shrink-0">
                        <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300">
                            Lihat Semua Armada <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {FLEET_DATA.map((fleet) => (
                        <div 
                            key={fleet.id} 
                            className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800"
                        >
                            <div className="flex flex-col lg:flex-row">

                                {/* Image Side */}
                                <div className="relative w-full lg:w-2/5 h-56 lg:h-80 overflow-hidden bg-slate-900">
                                    <Image
                                        src="/images/hero/hero-bus.jpg"
                                        alt={fleet.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                    
                                    {/* Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from--orange-500 textamber-500 to-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                            {fleet.class}
                                        </span>
                                    </div>

                                    {/* Specs Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-white/90 text-sm">
                                            <span className="flex items-center gap-1">
                                                <span className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs font-bold">{fleet.capacity}</span>
                                                Kursi
                                            </span>
                                            <span className="w-px h-4 bg-white/30"></span>
                                            <span>{fleet.config}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full lg:w-3/5 p-6 lg:p-8 flex flex-col">
                                    <div className="flex-1">
                                        <h3 className="font-heading font-bold text-xl lg:text-2xl mb-2 text-slate-900 dark:text-white">
                                            {fleet.name}
                                        </h3>
                                        <p className="text-slate-500 text-sm mb-6 flex items-center gap-2">
                                            <span className="font-semibold text-primary">{fleet.brand}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            <span>Konfigurasi {fleet.config}</span>
                                        </p>

                                        <div className="mb-6">
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                                Fasilitas Unggulan
                                            </p>
                                            <div className="grid grid-cols-2 gap-y-2.5 gap-x-3">
                                                {fleet.facilities.slice(0, 6).map((facility, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                                        <span className="truncate">{facility}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <Link href={`/armada/${fleet.id}`} className="mt-auto">
                                        <Button 
                                            variant="outline" 
                                            className="w-full justify-center sm:justify-between hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group/btn border-slate-200 dark:border-slate-700 rounded-xl h-12"
                                        >
                                            <span>Lihat Detail</span>
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

