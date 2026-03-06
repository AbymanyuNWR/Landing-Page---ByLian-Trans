"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FLEET_DATA } from "@/data/bylian.data";
import { Check, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ArmadaSection() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
                            Armada Mewah Bylian Trans
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                            Perjalanan jarak jauh kini lebih memanjakan dengan armada bus terbaru kami yang dilengkapi fasilitas premium.
                        </p>
                    </div>
                    <Link href="/armada">
                        <Button variant="outline" className="shrink-0 h-12 px-6 rounded-xl">
                            Lihat Semua Armada <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {FLEET_DATA.map((fleet) => (
                        <Card key={fleet.id} className="overflow-hidden group border-none shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="flex flex-col lg:flex-row h-full">

                                {/* Image Side */}
                                <div className="relative w-full lg:w-2/5 h-64 lg:h-auto overflow-hidden bg-slate-900">
                                    <Image
                                        src="/images/hero/hero-bus.jpg" // using the hero bus image as a placeholder for armada
                                        alt={fleet.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                                    />
                                    <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                                        {fleet.class}
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full lg:w-3/5 p-8 flex flex-col justify-between bg-white dark:bg-slate-900">
                                    <div>
                                        <h3 className="font-heading font-bold text-2xl mb-2 text-slate-900 dark:text-white">
                                            {fleet.name}
                                        </h3>
                                        <p className="text-slate-500 text-sm mb-6 flex items-center gap-2">
                                            <span className="font-semibold">{fleet.brand}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            <span>Kapasitas {fleet.capacity} Kursi</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            <span>Seat {fleet.config}</span>
                                        </p>

                                        <div className="space-y-3 mb-8">
                                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                                                Fasilitas Unggulan:
                                            </div>
                                            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                                {fleet.facilities.slice(0, 6).map((facility, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                                                        <span className="truncate">{facility}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <Link href={`/armada/${fleet.id}`}>
                                        <Button variant="ghost" className="w-full justify-between hover:bg-slate-50 dark:hover:bg-slate-800 group/btn border border-slate-200 dark:border-slate-800">
                                            Detail Armada
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>

                            </div>
                        </Card>
                    ))}
                </div>

            </div>
        </section>
    );
}
