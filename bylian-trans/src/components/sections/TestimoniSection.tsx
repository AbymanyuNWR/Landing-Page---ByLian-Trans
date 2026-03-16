"use client";

import React from "react";
import { Star, Quote, ThumbsUp } from "lucide-react";
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
            review: "Pesan tiket lewat websitenya gampang banget! Gak perlu repot ke agen lagi. Pas naik, bus executive nya memang top class. Kursinya memjakan badan banget untuk perjalanan malam."
        },
        {
            id: 3,
            name: "Deni Ramadhan",
            origin: "Bandung",
            route: "Bandung - Tegal",
            rating: 5,
            review: "Pengalaman pertama naik Bylian Trans rute Bandung. Sopirnya bawa bus halus, nggak ugal-ugalan jadi bisa tidur nyenyak. Toilet di dalam bus juga bersih. Mantap!"
        },
        {
            id: 4,
            name: "Lisa Permata",
            origin: "Jakarta",
            route: "Jakarta - Tegal",
            rating: 5,
            review: "Langganan tiap kali. Harga tiket sesuai pulang kampung ke Tegal banget sama fasilitas yang didapat. Ada colokan charger di tiap kursi jadi nggak takut HP lowbat."
        },
        {
            id: 5,
            name: "Ahmad Fauzi",
            origin: "Surabaya",
            route: "Surabaya - Tegal",
            rating: 5,
            review: "Pertama kali naik bus premium ini, awalnya ragu dengan harga. Tapi setelah mencoba, sangat worth it! Kursi bisa rebah hampir 180 derajat, dapat makan juga. Super nyaman!"
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-dots-pattern opacity-30"></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        TESTIMONI PENUMPANG
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
                        Apa Kata <span className="text-gradient">Pelanggan Kami?</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Terima kasih atas kepercayaan lebih dari <span className="font-bold text-primary">15.000+</span> pelanggan yang telah memilih Bylian Trans untuk perjalanan mereka.
                    </p>
                </div>

                {/* Rating Summary */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-8 py-4 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={24} className="fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">4.9</div>
                        <div className="text-sm text-slate-500">dari 5.000+ reviews</div>
                    </div>
                </div>

                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6 py-4">
                            {testimonials.map((testi) => (
                                <div key={testi.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6">
                                    <Card className="border-2 border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 h-full bg-white dark:bg-slate-900 relative overflow-hidden group">
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        <div className="absolute top-6 right-6 text-slate-200 dark:text-slate-700">
                                            <Quote size={56} className="rotate-180" />
                                        </div>

                                        <CardContent className="p-8 flex flex-col h-full relative z-10">
                                            <div className="flex gap-1 mb-6">
                                                {[...Array(testi.rating)].map((_, i) => (
                                                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>

                                            <p className="text-slate-700 dark:text-slate-300 mb-8 italic flex-1 text-base leading-relaxed">
                                                "{testi.review}"
                                            </p>

                                            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-primary/30">
                                                        {testi.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 dark:text-white">{testi.name}</h4>
                                                        <p className="text-xs text-slate-500 uppercase tracking-wide">
                                                            {testi.route}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                                                    <ThumbsUp size={16} />
                                                    <span>Suka</span>
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

