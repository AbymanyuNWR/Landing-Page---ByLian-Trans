"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Wifi } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { ROUTES_DATA } from "@/data/bylian.data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Let's create a minimal Badge component since we didn't specify one earlier
const SimpleBadge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
        {children}
    </span>
);

export function RuteUnggulanSection() {
    // Use first 6 or all routes
    const popularRoutes = ROUTES_DATA.slice(0, 6);

    return (
        <section className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
                            Rute Populer Bylian Trans
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Pilih rute perjalanan favorit Anda. Kami menyediakan berbagai kelas layanan sesuai dengan kebutuhan dan budget Anda.
                        </p>
                    </div>
                    <Link href="/rute">
                        <Button variant="outline" className="shrink-0 h-12 px-6 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                            Lihat Semua Rute <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularRoutes.map((route, idx) => (
                        <Card key={route.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-slate-100 dark:border-slate-800 flex flex-col h-full bg-slate-50 dark:bg-slate-900/50">

                            <CardHeader className="bg-gradient-to-r from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800 p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="bg-primary/10 text-primary p-2 rounded-lg">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                                            <circle cx="7" cy="17" r="2" />
                                            <path d="M9 17h6" />
                                            <circle cx="17" cy="17" r="2" />
                                        </svg>
                                    </div>
                                    <SimpleBadge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-none">
                                        Tersedia
                                    </SimpleBadge>
                                </div>

                                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mt-4 flex items-center gap-2">
                                    {route.origin} <ArrowRight className="w-5 h-5 text-slate-400" /> {route.destination}
                                </h3>
                            </CardHeader>

                            <CardContent className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6 font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <span>{route.estimatedDuration}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                            <span>{route.distanceKm} km</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kelas Tersedia</div>
                                        <div className="flex flex-wrap gap-2">
                                            {route.classes.map(cls => (
                                                <SimpleBadge key={cls} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-normal">
                                                    {cls}
                                                </SimpleBadge>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="text-sm text-slate-500 mb-1">Harga Mulai</div>
                                    <div className="font-bold text-2xl text-primary">{formatCurrency(route.startPrice)}</div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-0">
                                <Link href={`/pesan?asal=${route.origin}&tujuan=${route.destination}`} className="w-full">
                                    <Button className="w-full font-semibold h-12 shadow-md">
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
