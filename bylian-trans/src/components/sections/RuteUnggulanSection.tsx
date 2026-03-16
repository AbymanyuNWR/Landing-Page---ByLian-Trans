"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Wifi, Coffee, Music } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { ROUTES_DATA } from "@/data/bylian.data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const facilityIcons: Record<string, React.ElementType> = {
    Wifi,
    Coffee,
    Music,
};

export function RuteUnggulanSection() {
    const popularRoutes = ROUTES_DATA.slice(0, 6);

    return (
        <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

            <div className="container mx-auto px-4 relative z-10">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            RUTE POPULER
                        </div>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
                            Jelajahi Rute <span className="text-gradient">Favorit Anda</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Pilih rute perjalanan favorit Anda. Kami menyediakan berbagai kelas layanan premium sesuai dengan kebutuhan dan budget Anda.
                        </p>
                    </div>
                    <Link href="/rute-harga">
                        <Button variant="outline" className="shrink-0 h-12 px-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-primary/5 font-semibold transition-all duration-300">
                            Lihat Semua Rute <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularRoutes.map((route, idx) => (
                        <Card 
                            key={route.id} 
                            className="group overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50"
                        >
                            {/* Card Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <CardHeader className="relative bg-gradient-to-r from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800 p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-white">
                                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                                            <circle cx="7" cy="17" r="2" />
                                            <path d="M9 17h6" />
                                            <circle cx="17" cy="17" r="2" />
                                        </svg>
                                    </div>
                                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green/30">
                                        Tersedia
                                    </span>
                                </div>

                                <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white flex items-center gap-3">
                                    {route.origin} 
                                    <ArrowRight className="w-6 h-6 text-primary" /> 
                                    {route.destination}
                                </h3>
                            </CardHeader>

                            <CardContent className="p-6 flex-1 flex flex-col justify-between relative z-10">
                                <div>
                                    <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-6 font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <span className="font-semibold">{route.estimatedDuration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                                <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            </div>
                                            <span className="font-semibold">{route.distanceKm} km</span>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Kelas Tersedia</div>
                                        <div className="flex flex-wrap gap-2">
                                            {route.classes.map(cls => (
                                                <span 
                                                    key={cls} 
                                                    className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm"
                                                >
                                                    {cls}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-baseline justify-between">
                                        <div>
                                            <div className="text-xs text-slate-500 mb-1">Harga Mulai</div>
                                            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                                                {formatCurrency(route.startPrice)}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-slate-500">per orang</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-0 relative z-10">
                                <Link href={`/pesan?asal=${route.origin}&tujuan=${route.destination}`} className="w-full">
                                    <Button className="w-full font-bold h-12 text-base rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary">
                                        Pilih Jadwal
                                    </Button>
                                </Link>
                            </CardFooter>

                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
