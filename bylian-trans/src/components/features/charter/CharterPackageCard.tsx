"use client";

import { Bus, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import { getWhatsAppCharterUrl } from "@/lib/whatsapp";
import Image from "next/image";

interface CharterPackageProps {
    pkg: {
        id: string;
        title: string;
        destination: string;
        duration: string;
        busClass: string;
        capacity: string;
        startPrice: number;
        features: string[];
        image: string;
    }
}

export function CharterPackageCard({ pkg }: CharterPackageProps) {

    const handleBooking = () => {
        window.open(getWhatsAppCharterUrl(`Halo, saya tertarik dengan Paket Charter: ${pkg.title} (${pkg.busClass}). Boleh minta info lebih detail?`), "_blank");
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            <div className="relative h-48 overflow-hidden bg-slate-200">
                {/* Placeholder image structure */}
                {pkg.image ? (
                    <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition duration-700" sizes="(max-width: 1024px) 100vw, 33vw" />
                ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                        <Bus className="w-12 h-12 opacity-50" />
                    </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-xs font-black px-3 py-1.5 rounded-full shadow-sm">
                    {pkg.busClass}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-xl text-slate-800 mb-2 leading-tight">{pkg.title}</h3>

                <div className="flex flex-wrap gap-4 mt-2 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5" /> {pkg.destination}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5" /> {pkg.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Bus className="w-3.5 h-3.5" /> {pkg.capacity}
                    </div>
                </div>

                <div className="space-y-2 mb-6 flex-1">
                    {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-end justify-between mt-auto">
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Mulai Dari</p>
                        <p className="text-lg font-black text-primary">{formatIDR(pkg.startPrice)}</p>
                    </div>
                    <button
                        onClick={handleBooking}
                        className="bg-slate-100 hover:bg-primary hover:text-white text-slate-800 px-5 py-2.5 rounded-xl font-bold transition-colors text-sm"
                    >
                        Pesan via WA
                    </button>
                </div>
            </div>
        </div>
    );
}
