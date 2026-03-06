"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";

export function TestimoniSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start"
    });

    const testimonials = [
        {
            id: 1,
            name: "Budi Santoso",
            origin: "Tegal",
            route: "Tegal - Jakarta",
            rating: 5,
            review: "Busnya sangat nyaman, bersih dan wangi. AC nya dingin pas mantap, ditambah lagi perjalanan tepat waktu sampai di Jakarta sesuai estimasi. Pelayanan crew juga sangat ramah. Recommended PO dari Tegal!"
        },
        {
            id: 2,
            name: "Asti Wijaya",
            origin: "Semarang",
            route: "Semarang - Tegal",
            rating: 5,
            review: "Pesan tiket lewat websitenya gampang banget! Gak perlu repot ke agen lagi. Pas naik, bus executive nya memang top class. Kursinya memanjakan badan banget untuk perjalanan malam."
        },
        {
            id: 3,
            name: "Deni Ramadhan",
            origin: "Bandung",
            route: "Bandung - Tegal",
            rating: 4,
            review: "Pengalaman pertama naik Bylian Trans rute Bandung. Sopirnya bawa bus halus, nggak ugal-ugalan jadi bisa tidur nyenyak. Toilet di dalam bus juga bersih. Mantap!"
        },
        {
            id: 4,
            name: "Lisa Permata",
            origin: "Jakarta",
            route: "Jakarta - Tegal",
            rating: 5,
            review: "Langganan tiap kali pulang kampung ke Tegal. Harga tiket sesuai banget sama fasilitas yang didapat. Ada colokan charger di tiap kursi jadi nggak takut HP lowbat."
        }
    ];

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 mb-6 text-accent">
                        <Star className="fill-accent" size={24} />
                        <Star className="fill-accent" size={24} />
                        <Star className="fill-accent" size={24} />
                        <Star className="fill-accent" size={24} />
                        <Star className="fill-accent" size={24} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
                        Apa Kata Penumpang Kami
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Terima kasih atas lebih dari 15.000 ulasan positif dari penumpang setia Bylian Trans setiap bulannya.
                    </p>
                </div>

                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6 py-4">
                            {testimonials.map((testi) => (
                                <div key={testi.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6">
                                    <Card className="border-none shadow-lg h-full bg-white dark:bg-slate-900 relative">
                                        <div className="absolute top-6 right-6 text-slate-100 dark:text-slate-800">
                                            <Quote size={48} className="rotate-180" />
                                        </div>

                                        <CardContent className="p-8 flex flex-col h-full relative z-10">
                                            <div className="flex gap-1 mb-6 text-accent">
                                                {[...Array(testi.rating)].map((_, i) => (
                                                    <Star key={i} size={16} className="fill-accent" />
                                                ))}
                                            </div>

                                            <p className="text-slate-700 dark:text-slate-300 mb-8 italic flex-1 text-lg">
                                                "{testi.review}"
                                            </p>

                                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl shrink-0">
                                                    {testi.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 dark:text-white">{testi.name}</h4>
                                                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                                                        Penumpang {testi.route}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
