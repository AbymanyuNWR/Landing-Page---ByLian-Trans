"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ZoomIn, ArrowRight, Camera, Grid3X3 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "@/components/ui/button";

export function GaleriPreviewSection() {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    // Using hero image generated as multiple placeholders for gallery
    const photos = [
        { src: "/images/hero/hero-bus.jpg", title: "Eksterior Scania K410", span: "col-span-1 md:col-span-2 row-span-2" },
        { src: "/images/hero/hero-bus.jpg", title: "Interior Executive", span: "col-span-1 row-span-1" },
        { src: "/images/hero/hero-bus.jpg", title: "Fasilitas Toilet Bersih", span: "col-span-1 row-span-1" },
        { src: "/images/hero/hero-bus.jpg", title: "Kursi Reclining Mewah", span: "col-span-1 row-span-1" },
        { src: "/images/hero/hero-bus.jpg", title: "Crew Bylian Trans", span: "col-span-1 row-span-1" },
    ];

    const lightboxSlides = photos.map(p => ({ src: p.src, alt: p.title }));

    return (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                            <Camera className="w-3.5 h-3.5" />
                            GALERI KAMI
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-slate-900 dark:text-white leading-tight">
                            Mengintip Kemewahan{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                                Bylian Trans
                            </span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            Lihat lebih dekat kenyamanan fasilitas bus dan pengalaman perjalanan luar biasa bersama kami.
                        </p>
                    </div>
                    <Link href="/galeri" className="shrink-0">
                        <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300">
                            <Grid3X3 className="mr-2 w-4 h-4" />
                            Lihat Semua Foto 
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                {/* Masonry-like Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[500px] md:h-[600px]">
                    {photos.map((photo, i) => (
                        <div
                            key={i}
                            className={`relative rounded-2xl overflow-hidden group cursor-pointer ${photo.span} shadow-lg hover:shadow-2xl transition-all duration-500`}
                            onClick={() => {
                                setIndex(i);
                                setOpen(true);
                            }}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                    <ZoomIn className="text-white w-8 h-8" />
                                </div>
                            </div>
                            
                            {/* Title Badge */}
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent">
                                <div className="text-white font-medium text-sm translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    {photo.title}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    index={index}
                    slides={lightboxSlides}
                />

            </div>
        </section>
    );
}

