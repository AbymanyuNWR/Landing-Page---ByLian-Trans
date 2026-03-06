"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Optional: Minimal local badge since we may not have built the shadcn one yet
const SimpleBadge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={`inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-semibold ${className}`}>
        {children}
    </span>
);

export function BlogPreviewSection() {
    const articles = [
        {
            id: 1,
            title: "5 Tips Nyaman Bepergian Jauh dengan Bus Malam",
            excerpt: "Perjalanan semalaman tidak selalu melelahkan jika Anda tahu trik dan persiapannya. Simak tips berikut untuk...",
            category: "Tips Perjalanan",
            date: new Date(2025, 2, 10),
            readTime: "5 Menit Baca",
            image: "/images/hero/hero-bus.jpg" // Using placeholder
        },
        {
            id: 2,
            title: "Rekomendasi Kuliner Malam Sekitar Terminal Tegal",
            excerpt: "Sambil menunggu jadwal bus ke Jakarta, Anda bisa mencoba beberapa sate tegal dan jajanan malam yang...",
            category: "Kuliner",
            date: new Date(2025, 2, 5),
            readTime: "4 Menit Baca",
            image: "/images/hero/hero-bus.jpg" // Using placeholder
        },
        {
            id: 3,
            title: "Peluncuran Armada Super Executive Baru Bylian Trans",
            excerpt: "Merespon tingginya minat masyarakat pada layanan premium, hari ini kami resmi meluncurkan 5 unit Scania K410 baru...",
            category: "Berita",
            date: new Date(2025, 1, 28),
            readTime: "3 Menit Baca",
            image: "/images/hero/hero-bus.jpg" // Using placeholder
        }
    ];

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
                            Kabar Terbaru dari Bylian Trans
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Dapatkan informasi promo, berita seputar layanan, dan tips perjalanan antarkota yang bermanfaat.
                        </p>
                    </div>
                    <Link href="/blog">
                        <Button variant="outline" className="shrink-0 h-12 px-6 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                            Semua Artikel <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Card key={article.id} className="overflow-hidden group hover:-translate-y-2 transition-transform duration-300 border-none shadow-md hover:shadow-xl bg-white dark:bg-slate-900">
                            <div className="relative w-full h-56 overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <SimpleBadge className="absolute top-4 left-4 bg-primary text-white font-bold backdrop-blur-md">
                                    {article.category}
                                </SimpleBadge>
                            </div>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {format(article.date, "dd MMM yyyy", { locale: id })}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        {article.readTime}
                                    </div>
                                </div>

                                <h3 className="font-heading font-bold text-xl mb-3 text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${article.id}`}>
                                        {article.title}
                                    </Link>
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6">
                                    {article.excerpt}
                                </p>

                                <Link href={`/blog/${article.id}`} className="inline-flex items-center text-primary font-medium text-sm hover:underline">
                                    Baca Selengkapnya <ArrowRight className="ml-1 w-4 h-4" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </section>
    );
}
