"use client";

import React, { useState } from "react";
import { Map, Navigation, LocateFixed, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
                
                {/* Gradient orbs */}
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px]"></div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-blue-300 text-sm font-medium mb-6 border border-primary/30">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                            Real-Time Tracking
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
                            Pantau Posisi Bus{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400">
                                Secara Langsung
                            </span>
                        </h2>

                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Tidak perlu khawatir kapan bus tiba. Masukkan kode booking tiket Anda untuk melacak posisi bus secara real-time langsung di peta!
                        </p>

                        {/* Tracking Form */}
                        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 mb-8">
                            <div className="relative flex-1">
                                <Input
                                    value={bookingCode}
                                    onChange={(e) => setBookingCode(e.target.value)}
                                    placeholder="Masukkan Kode Booking"
                                    className="pl-4 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-2xl focus:bg-white/10 focus:border-primary/50 transition-all"
                                    required
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 shrink-0"
                            >
                                <LocateFixed className="mr-2 w-5 h-5" />
                                Lacak
                            </Button>
                        </form>

                        {/* Quick Links */}
                        <div className="flex flex-wrap gap-3">
                            <span className="text-sm text-slate-500">atau</span>
                            <Link href="/tracking" className="text-sm font-semibold text-primary hover:text-blue-400 transition-colors flex items-center gap-1">
                                Cek Jadwal Rute <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Right - Map Preview */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-4 lg:p-6 border border-slate-700/50 shadow-2xl relative overflow-hidden">
                            {/* Floating Badge */}
                            <div className="absolute top-0 right-4 -translate-y-1/2 z-10 bg-white text-slate-900 font-bold px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Navigation className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-semibold">Posisi Saat Ini</div>
                                    <div className="text-sm font-bold">Tol Pejagan KM 281</div>
                                </div>
                            </div>

                            {/* Map Visual */}
                            <div className="bg-slate-900 rounded-2xl aspect-[4/3] relative overflow-hidden border border-slate-800">
                                {/* Map placeholder with route */}
                                <div className="absolute inset-0 bg-[url('/images/hero/hero-bus.jpg')] bg-cover bg-center opacity-20"></div>
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/80"></div>
                                
                                {/* Map Grid Overlay */}
                                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3 }}></div>

                                {/* Center Map Icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-full bg-slate-800/80 backdrop-blur-sm flex items-center justify-center border border-slate-700">
                                        <Map className="w-12 h-12 text-slate-600" />
                                    </div>
                                </div>

                                {/* Route Progress */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700/50">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                <span className="text-slate-400 text-sm">Tegal</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-secondary" />
                                                <span className="text-slate-400 text-sm">Jakarta</span>
                                            </div>
                                        </div>
                                        
                                        {/* Progress Bar */}
                                        <div className="relative h-2 bg-slate-700 rounded-full mb-3">
                                            <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-blue-500 rounded-full w-[65%]"></div>
                                            {/* Current Position Marker */}
                                            <div className="absolute right-[35%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-4 border-primary shadow-[0_0_15px_rgba(29,78,216,0.8)]"></div>
                                        </div>

                                        {/* ETA */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400 text-xs">Estimasi Tiba</span>
                                            <span className="text-white font-bold flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                18:45 WIB
                                            </span>
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

