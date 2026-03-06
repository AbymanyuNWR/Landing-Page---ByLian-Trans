"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function KeunggulanSection() {
    const features = [
        {
            title: "Keamanan Terjamin",
            description: "Armada kami selalu dalam kondisi prima dengan pengecekan rutin dan dikemudikan oleh sopir profesional.",
            image: "/images/features/icon_security_3d_1772232872360.png",
        },
        {
            title: "Tepat Waktu",
            description: "Kami sangat menghargai waktu Anda. Jadwal keberangkatan dan kedatangan selalu diusahakan on-time.",
            image: "/images/features/icon_time_3d_1772232891113.png",
        },
        {
            title: "Kursi Nyaman",
            description: "Nikmati perjalanan jauh tanpa pegal dengan kursi kelas eksekutif yang ergonomis dan reclining.",
            image: "/images/features/icon_seat_3d_1772232911135.png",
        },
        {
            title: "Pesan Mudah Online",
            description: "Pesan tiket cukup dari smartphone, pilih kursi sendiri, dan dapatkan e-tiket langsung.",
            image: "/images/features/icon_online_3d_1772232946190.png",
        }
    ];

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
                        Kenapa Memilih Bylian Trans?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Kami menghadirkan pengalaman perjalanan darat terbaik untuk memastikan Anda sampai tujuan dengan selamat dan bahagia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <Card key={idx} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-slate-800">
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto w-24 h-24 mb-4 relative drop-shadow-xl">
                                    {/* Using next/image for auto-optimization of the 3D high quality icons */}
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <CardDescription className="text-base">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
