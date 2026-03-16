"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, TicketIcon, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_DATA } from "@/data/bylian.data";

export function CTASection() {
    return (
        <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
            {/* Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Gradient orbs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl opacity-40"></div>
                
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
                
                {/* Floating shapes */}
                <div className="absolute top-20 left-10 w-24 h-24 border border-white/5 rounded-2xl rotate-12 animate-float"></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 border border-white/5 rounded-full animate-float-delayed"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 max-w-6xl">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                        </span>
                        <span className="text-white/80 text-sm font-medium">Siap Melayani 24/7</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                        Wujudkan Perjalanan Impian Anda Bersama{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400">
                            Bylian Trans
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                        Ribuan pelanggan telah mempercayakan perjalanan mereka kepada kami. 
                        Nikmati pengalaman perjalanan yang nyaman, aman, dan tak terlupakan.
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {[
                            "Armada Premium",
                            "Driver Profesional",
                            "Garansi Tepat Waktu",
                            "CS Responsif"
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                {feature}
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link href="/pesan" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 rounded-2xl gap-2 transition-all duration-300 hover:-translate-y-1">
                                <TicketIcon className="w-5 h-5" /> 
                                Pesan Tiket Sekarang
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>

                        <a
                            href={`https://wa.me/${COMPANY_DATA.contacts.csWhatsApp}?text=Halo%20Bylian%20Trans,%20saya%20ingin%20tanya%20tiket`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <Button 
                                variant="outline" 
                                className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-white/5 hover:bg-white/10 text-white border-white/20 hover:border-white/40 rounded-2xl gap-2 transition-all duration-300 backdrop-blur-sm"
                            >
                                <MessageCircle className="w-5 h-5" /> 
                                Hubungi Kami
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

