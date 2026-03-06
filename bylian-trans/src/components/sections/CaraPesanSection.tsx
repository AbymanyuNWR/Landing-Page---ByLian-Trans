"use client";

import React from "react";
import { Search, Armchair, FileText, CreditCard } from "lucide-react";

export function CaraPesanSection() {
    const steps = [
        {
            id: 1,
            title: "Cari Tiket",
            description: "Pilih rute asan tujuan, tanggal keberangkatan, dan jumlah penumpang.",
            icon: <Search size={28} className="text-white" />
        },
        {
            id: 2,
            title: "Pilih Kursi",
            description: "Lihat denah bus secara interaktif dan pilih kursi yang paling nyaman untuk Anda.",
            icon: <Armchair size={28} className="text-white" />
        },
        {
            id: 3,
            title: "Isi Data Penumpang",
            description: "Lengkapi data diri penumpang sesuai dengan kartu identitas resmi.",
            icon: <FileText size={28} className="text-white" />
        },
        {
            id: 4,
            title: "Bayar & Selesai",
            description: "Pilih metode pembayaran (Transfer, E-Wallet, QRIS) lalu e-tiket akan terbit seketika.",
            icon: <CreditCard size={28} className="text-white" />
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4">

                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
                        Cara Pesan Tiket dengan Mudah
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Booking tiket Bylian Trans sekarang lebih praktis dan cepat langsung dari smartphone Anda tanpa harus antre di loket agen.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting line for Desktop */}
                    <div className="hidden lg:block absolute top-[50px] left-[10%] right-[10%] h-[2px] bg-slate-200 dark:bg-slate-800 z-0">
                        <div className="h-full bg-primary w-0 route-progress-line"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
                        {steps.map((step, idx) => (
                            <div key={step.id} className="relative flex flex-col items-center text-center group">
                                <div className="w-24 h-24 rounded-full bg-slate-50 dark:bg-slate-800 border-[8px] border-white dark:border-slate-900 shadow-xl flex items-center justify-center relative mb-6 isolate z-10 mx-auto group-hover:scale-110 transition-transform duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full -z-10 group-hover:rotate-180 transition-transform duration-500"></div>
                                    {step.icon}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {step.id}
                                    </div>
                                </div>

                                <h3 className="font-heading font-bold text-xl mb-3 text-slate-900 dark:text-white">{step.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-[250px]">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
