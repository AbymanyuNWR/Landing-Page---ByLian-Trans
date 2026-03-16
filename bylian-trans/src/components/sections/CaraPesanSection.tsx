"use client";

import React from "react";
import { Search, Armchair, FileText, CreditCard, ArrowRight, Check } from "lucide-react";

export function CaraPesanSection() {
    const steps = [
        {
            id: 1,
            title: "Cari Tiket",
            description: "Pilih rute asal tujuan, tanggal keberangkatan, dan jumlah penumpang sesuai kebutuhan Anda.",
            icon: <Search size={24} className="text-white" />,
            gradient: "from-blue-500 to-blue-600"
        },
        {
            id: 2,
            title: "Pilih Kursi",
            description: "Lihat denah bus secara interaktif dan pilih kursi favorit yang paling nyaman.",
            icon: <Armchair size={24} className="text-white" />,
            gradient: "from-purple-500 to-purple-600"
        },
        {
            id: 3,
            title: "Isi Data",
            description: "Lengkapi data diri penumpang sesuai dengan kartu identitas resmi.",
            icon: <FileText size={24} className="text-white" />,
            gradient: "from-emerald-500 to-emerald-600"
        },
        {
            id: 4,
            title: "Bayar & Selesai",
            description: "Pilih metode pembayaran favorit lalu e-tiket akan terbit secara instan.",
            icon: <CreditCard size={24} className="text-white" />,
            gradient: "from-amber-500 to-orange-600"
        }
    ];

    return (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        LANGKAH MUDAH
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-slate-900 dark:text-white leading-tight">
                        Cara Pesan Tiket dengan{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                            Mudah
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        Booking tiket Bylian Trans sekarang lebih praktis dan cepat langsung dari smartphone Anda tanpa harus antre di loket.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connecting line for Desktop */}
                    <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-[2px] bg-slate-200 dark:bg-slate-800 z-0">
                        <div className="h-full bg-gradient-to-r from-primary via-blue-500 to-secondary w-0 route-progress-line"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative z-10">
                        {steps.map((step, idx) => (
                            <div 
                                key={step.id} 
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Icon Circle */}
                                <div className="relative mb-6">
                                    {/* Glow effect on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-30 rounded-full blur-xl transition-all duration-500 scale-150`}></div>
                                    
                                    <div className="w-24 h-24 rounded-3xl bg-slate-50 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center relative mx-auto group-hover:scale-110 transition-transform duration-300 z-10">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                        <div className="relative z-10">{step.icon}</div>
                                        
                                        {/* Step Number Badge */}
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-slate-900">
                                            {step.id}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="font-heading font-bold text-lg mb-2 text-slate-900 dark:text-white">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-[280px]">
                                    {step.description}
                                </p>

                                {/* Arrow connector for mobile/tablet */}
                                {idx < steps.length - 1 && (
                                    <div className="lg:hidden absolute top-12 -right-3 z-10">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            <ArrowRight className="w-3 h-3 text-slate-400" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Pembayaran Aman
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Konfirmasi Instan
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            E-Tiket Digital
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
}

