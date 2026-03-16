"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Newspaper } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";

// Optional: Minimal local badge since we may not have built the shadcn one yet
const SimpleBadge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
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
            image: "/images/hero/hero-bus.jpg"
        },
        {
            id: 2,
            title: "Rekomendasi Kuliner Malam Sekitar Terminal Tegal",
            excerpt: "Sambil menunggu jadwal bus ke Jakarta, Anda bisa mencoba beberapa sate tegal dan jajanan malam yang...",
            category: "Kuliner",
            date: new Date(2025, 2, 5),
            readTime: "4 Menit Baca",
            image: "/images/hero/hero-bus.jpg"
        },
        {
            id: 3,
            title: "Peluncuran Armada Super Executive Baru Bylian Trans",
            excerpt: "Merespon tingginya minat masyarakat pada layanan premium, hari ini kami resmi meluncurkan 5 unit Scania K410 baru...",
            category: "Berita",
            date: new Date(2025, 1, 28),
            readTime: "3 Menit Baca",
            image: "/images/hero/hero-bus.jpg"
        }
    ];

    return (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                            <Newspaper className="w-3.5 h-3.5" />
                            ARTIKEL TERBARU
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-slate-900 dark:text-white leading-tight">
                            Kabar Terbaru dari{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                                Bylian Trans
                            </span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            Dapatkan informasi promo, berita seputar layanan, dan tips perjalanan antarkota yang bermanfaat.
                        </p>
                    </div>
                    <Link href="/blog" className="shrink-0">
                        <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300">
                            Lihat Semua Artikel <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {articles.map((article, idx) => (
                        <article 
                            key={article.id} 
                            className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 hover:border-primary/20 dark:hover:border-primary/30"
                        >
                            {/* Image */}
                            <div className="relative w-full h-56 overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                                
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <SimpleBadge className="bg-white/90 backdrop-blur-sm text-slate-800 font-bold shadow-sm">
                                        {article.category}
                                    </SimpleBadge>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Meta */}
                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {format(article.date, "dd MMM yyyy", { locale: id })}
                                    </div>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        {article.readTime}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="font-heading font-bold text-lg mb-3 text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
                                    <Link href={`/blog/${article.id}`}>
                                        {article.title}
                                    </Link>
                                </h3>

                                {/* Excerpt */}
                                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                                    {article.excerpt}
                                </p>

                                {/* Read More Link */}
                                <Link 
                                    href={`/blog/${article.id}`} 
                                    className="inline-flex items-center text-primary font-semibold text-sm group/link hover:gap-2 transition-all duration-300"
                                >
                                    Baca Selengkapnya 
                                    <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}

