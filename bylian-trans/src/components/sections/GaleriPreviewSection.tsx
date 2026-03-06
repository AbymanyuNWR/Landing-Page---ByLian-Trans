"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ZoomIn, ArrowRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "@/components/ui/button";

export function GaleriPreviewSection() {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    // Using hero image generated as multiple placeholoders for gallery
    const photos = [
        { src: "/images/hero/hero-bus.jpg", title: "Eksterior Scania K410", span: "col-span-1 md:col-span-2 row-span-2" },
        { src: "/images/hero/hero-bus.jpg", title: "Interior Executive", span: "col-span-1 row-span-1" },
        { src: "/images/hero/hero-bus.jpg", title: "Fasilitas Toilet Bersih", span: "col-span-1 row-span-1" },
        { src: "/images/hero/hero-bus.jpg", title: "Kursi Reclining Mewah", span: "col-span-1 row-span-1" },
        { src: "/images/hero/hero-bus.jpg", title: "Crew Bylian Trans", span: "col-span-1 row-span-1" },
    ];

    const lightboxSlides = photos.map(p => ({ src: p.src, alt: p.title }));

    return (
        <section className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
                            Mengintip Kemewahan Bylian Trans
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Lihat lebih dekat kenyamanan fasilitas bus dan pengalaman perjalanan luar biasa bersama kami.
                        </p>
                    </div>
                    <Link href="/galeri">
                        <Button variant="outline" className="shrink-0 h-12 px-6 rounded-xl group/btn border-slate-200 dark:border-slate-800">
                            Lihat Semua Foto <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {/* Masonry-like Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
                    {photos.map((photo, i) => (
                        <div
                            key={i}
                            className={`relative rounded-2xl overflow-hidden group cursor-pointer ${photo.span}`}
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
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <ZoomIn className="text-white w-10 h-10 scale-50 group-hover:scale-100 transition-transform duration-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slate-900/90 to-transparent">
                                <div className="text-white font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
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
