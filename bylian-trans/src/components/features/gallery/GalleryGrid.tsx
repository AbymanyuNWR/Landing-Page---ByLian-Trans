"use client";

import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";

interface GalleryItem {
    id: string;
    url: string;
    category: "EXTERIOR" | "INTERIOR" | "FASILITAS";
    alt: string;
}

export function GalleryGrid({ images }: { images: GalleryItem[] }) {
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((item) => (
                    <div
                        key={item.id}
                        className="group relative aspect-square bg-slate-200 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all"
                        onClick={() => setSelectedImage(item)}
                    >
                        <Image src={item.url} alt={item.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />

                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <ZoomIn className="w-8 h-8 text-white scale-50 group-hover:scale-100 transition-transform duration-300" />
                        </div>

                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-800">
                            {item.category}
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="max-w-5xl w-full h-[85vh] relative animate-in fade-in zoom-in-95 duration-200">
                        <Image src={selectedImage.url} alt={selectedImage.alt} fill className="object-contain mx-auto" sizes="100vw" />
                        <p className="absolute bottom-[-2rem] left-0 right-0 text-white text-center tracking-wide font-medium">{selectedImage.alt}</p>
                    </div>
                </div>
            )}
        </>
    );
}
