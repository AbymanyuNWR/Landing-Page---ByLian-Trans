"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Clock, Armchair, Smartphone } from "lucide-react";

const icons = {
    "Keamanan Terjamin": Shield,
    "Tepat Waktu": Clock,
    "Pesan Mudah Online": Smartphone,
};

export function KeunggulanSection() {
    const features = [
        {
            title: "Keamanan Terjamin",
            description: "Armada kami selalu dalam kondisi prima dengan pengecekan rutin dan dikemudikan oleh sopir profesional bersertifikat.",
            image: "/images/features/icon_security_3d_1772232872360.png",
            highlight: "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20",
            iconColor: "text-emerald-600 dark:text-emerald-400",
        },
        {
            title: "Tepat Waktu",
            description: "Kami sangat menghargai waktu Anda. Jadwal keberangkatan dan kedatangan selalu diusahakan tepat waktu.",
            image: "/images/features/icon_time_3d_1772232891113.png",
            highlight: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-800/20",
            iconColor: "text-blue-600 dark:text-blue-400",
        },
        {
            title: "Kursi Nyaman",
            description: "Nikmati perjalanan jauh tanpa pegal dengan kursi kelas eksekutif yang ergonomis dan reclining 150°.",
            image: "/images/features/icon_seat_3d_1772232911135.png",
            highlight: "bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20",
            iconColor: "text-purple-600 dark:text-purple-400",
        },
        {
            title: "Pesan Mudah Online",
            description: "Pesan tiket cukup dari smartphone, pilih kursi sendiri, dan dapatkan e-tiket langsung dalam hitungan menit.",
            image: "/images/features/icon_online_3d_1772232946190.png",
            highlight: "bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20",
            iconColor: "text-amber-600 dark:text-amber-400",
        }
    ];

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-dots-pattern opacity-50"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        KEUNGGULAN KAMI
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
                        Mengapa Memilih <span className="text-gradient">Bylian Trans?</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Kami menghadirkan pengalaman perjalanan darat terbaik dengan standar profesional untuk memastikan Anda sampai tujuan dengan selamat dan nyaman.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => {
                        const IconComponent = icons[feature.title as keyof typeof icons] || Shield;
                        return (
                            <Card 
                                key={idx} 
                                className={`group border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden ${feature.highlight}`}
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <CardHeader className="text-center pb-2 relative z-10">
                                    <div className="mx-auto w-28 h-28 mb-4 relative drop-shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-contain"
                                        />
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                                    </div>
                                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center relative z-10">
                                    <CardDescription className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                                
                                {/* Decorative corner */}
                                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
