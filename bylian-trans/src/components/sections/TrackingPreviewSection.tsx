"use client";

import React, { useState } from "react";
import { Map, Navigation, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function TrackingPreviewSection() {
    const [bookingCode, setBookingCode] = useState("");
    const router = useRouter();

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (bookingCode.trim()) {
            router.push(`/tracking?kode=${bookingCode}`);
        }
    };

    return (
        <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
            {/* Abstract Map Background Simulation */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} className="w-full h-full"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    <div className="w-full lg:w-1/2">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-blue-300 text-sm font-medium mb-6 border border-primary/30">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                            Update Real-Time Tiap 30 Detik
                        </div>

                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                            Pantau Posisi Bus Kamu Sepanjang Perjalanan
                        </h2>

                        <p className="text-slate-300 text-lg mb-10 max-w-lg">
                            Tidak perlu khawatir kapan bus tiba. Masukkan kode booking tiket Anda untuk melacak posisi bus secara real-time langsung di rute peta!
                        </p>

                        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 max-w-md">
                            <div className="relative flex-1">
                                <Input
                                    value={bookingCode}
                                    onChange={(e) => setBookingCode(e.target.value)}
                                    placeholder="Masukkan Kode Booking (ex: BY-12345)"
                                    className="pl-4 h-14 bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-xl focus:bg-white/20"
                                    required
                                />
                            </div>
                            <Button type="submit" className="h-14 px-8 rounded-xl bg-accent hover:bg-accent-foreground text-white font-bold text-lg shadow-lg shadow-accent/20 shrink-0">
                                Lacak <LocateFixed className="ml-2 w-5 h-5" />
                            </Button>
                        </form>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <div className="bg-slate-800 rounded-3xl p-4 border border-slate-700 shadow-2xl relative">
                            <div className="absolute top-0 right-10 -translate-y-1/2 bg-white text-slate-900 font-bold px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in-up">
                                <Navigation className="text-primary w-6 h-6" />
                                <div>
                                    <div className="text-xs text-slate-500 uppercase">Posisi Saat Ini</div>
                                    <div className="text-sm">Tol Pejagan - Pemalang KM 281</div>
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-2xl aspect-video md:aspect-[4/3] relative overflow-hidden flex items-center justify-center border border-slate-800">
                                <Map className="w-32 h-32 text-slate-700" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-sm">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-slate-300">Estimasi Tiba:</span>
                                            <span className="text-white font-bold text-lg">18:45 WIB</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
                                            <div className="bg-primary h-2 rounded-full w-[70%] relative">
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-primary shadow-[0_0_10px_rgba(29,78,216,0.8)]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
