"use client";

import { useState } from "react";
// Remove metadata export since this is a client component.
// Metadata should be moved to a layout.tsx if SEO is strictly required for this page, or make this page a server component that imports a client form component.
// For now, removing metadata export to fix Next.js build error.
import { CharterForm } from "@/components/features/charter/CharterForm";
import { CharterPackageCard } from "@/components/features/charter/CharterPackageCard";
import { CharterSuccessMessage } from "@/components/features/charter/CharterSuccessMessage";
import { CharterFAQ } from "@/components/features/charter/CharterFAQ";
import { MapPin, Users, CalendarDays, ShieldCheck } from "lucide-react";

// Dummy pre-made packages
const PACKAGES = [
    {
        id: "p1",
        title: "Ziarah Wali Songo (Jawa-Bali)",
        destination: "Jawa - Madura - Bali",
        duration: "7 Hari 6 Malam",
        busClass: "Eksekutif 32 Seat",
        capacity: "32 Orang",
        startPrice: 15000000,
        features: ["BBM & Driver Utama", "Audio/Video Karaoke", "Bantal Selimut", "Toilet & Dispenser"],
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "p2",
        title: "City Tour Jakarta - Bandung",
        destination: "Jakarta & Bandung",
        duration: "3 Hari 2 Malam",
        busClass: "Bisnis 40 Seat",
        capacity: "40 Orang",
        startPrice: 5500000,
        features: ["BBM & Driver Utama", "Media Hiburan Lengkap", "Full AC", "Kapasitas Besar"],
        image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=800&auto=format&fit=crop"
    }
];

export default function CharterPage() {
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <div className="pt-24 pb-20">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <span className="inline-block px-4 py-1.5 bg-primary/20 border border-primary/50 text-white rounded-full font-bold text-sm tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(29,78,216,0.5)]">Layanan Sewa Bus Pariwisata</span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Jelajahi Nusantara Bersama Rombongan Anda</h1>
                    <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
                        Pilihan tepat untuk study tour, gathering kantor, ziarah wali, maupun perjalanan dinas. Armada premium dengan fasilitas lengkap siap melayani Anda.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-200">
                        <span className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Kapasitas 22 - 50 Seat</span>
                        <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Bebas Pilih Rute</span>
                        <span className="flex items-center gap-2"><CalendarDays className="w-5 h-5 text-primary" /> Jadwal Fleksibel</span>
                    </div>
                </div>
            </section>

            {/* Intro & Packages */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-800">Paket Populer</h2>
                        <p className="text-slate-500 mt-2">Pilihan paket perjalanan wisata yang paling sering diminati.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                        {PACKAGES.map(pkg => (
                            <CharterPackageCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section id="form-quotation" className="py-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-12 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-black text-slate-800">Minta Penawaran Kustom</h2>
                        <p className="text-slate-500 mt-3">Tidak menemukan paket yang sesuai? Isi formulir di bawah ini
                            dan kami akan mengirimkan quotation harga terbaik sesuai kebutuhan perjalanan acara Anda.</p>
                    </div>

                    {isSuccess ? (
                        <CharterSuccessMessage onReset={() => setIsSuccess(false)} />
                    ) : (
                        <CharterForm onSuccess={() => setIsSuccess(true)} />
                    )}
                </div>
            </section>

            {/* Attributes */}
            <section className="py-16 bg-white border-y border-slate-100">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-8">Mengapa Sewa Bus di Bylian Trans?</h3>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex flex-col items-center max-w-[200px]">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4"><ShieldCheck className="w-8 h-8" /></div>
                            <h4 className="font-bold text-slate-800 mb-2">Terjamin Aman</h4>
                            <p className="text-xs text-slate-500">Izin resmi pariwisata dan asuransi Jasa Raharja untuk setiap penumpang.</p>
                        </div>
                        <div className="flex flex-col items-center max-w-[200px]">
                            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4"><Users className="w-8 h-8" /></div>
                            <h4 className="font-bold text-slate-800 mb-2">Kru Berpengalaman</h4>
                            <p className="text-xs text-slate-500">Supir dan Co-Driver yang mengetahui medan jalan dengan sangat baik.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <CharterFAQ />
                </div>
            </section>
        </div>
    );
}
