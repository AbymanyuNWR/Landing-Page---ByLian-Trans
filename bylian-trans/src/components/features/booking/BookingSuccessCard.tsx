"use client";

import { CheckCircle2, FileText, Share2, Download } from "lucide-react";
import Link from "next/link";
import { formatIDR } from "@/lib/utils";

export function BookingSuccessCard({ booking }: { booking?: any }) {
    // Dummy data fallback
    const data = booking || {
        bookingCode: "BLT-8X9A2K",
        route: "Tegal → Jakarta",
        date: "17 Agustus 2024, 19:00",
        passengers: 2,
        total: 300000,
        email: "budi.santoso@example.com"
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-lg mx-auto border border-slate-100">
            <div className="bg-[#16a34a] p-8 text-center text-white relative flex justify-center pb-12">
                <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10" />
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg ring-4 ring-white/30 animate-pulse-ring">
                        <CheckCircle2 className="w-12 h-12 text-[#16a34a]" />
                    </div>
                    <h2 className="text-2xl font-black mb-1">Pemesanan Berhasil!</h2>
                    <p className="opacity-90 text-sm">E-Ticket telah dikirim ke Email & WhatsApp Anda.</p>
                </div>
            </div>

            <div className="p-8 -mt-6 bg-white rounded-t-3xl relative z-10 text-center">
                <p className="text-slate-500 text-sm uppercase tracking-wider mb-1">Kode Booking</p>
                <p className="text-4xl font-black text-slate-800 tracking-widest mb-6 font-mono">{data.bookingCode}</p>

                <div className="bg-slate-50 p-4 rounded-2xl text-left text-sm space-y-3 mb-8 border border-slate-100">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-500">Rute</span>
                        <span className="font-semibold">{data.route}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-500">Keberangkatan</span>
                        <span className="font-semibold">{data.date}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-500">Penumpang</span>
                        <span className="font-semibold">{data.passengers} Orang</span>
                    </div>
                    <div className="flex justify-between pt-1">
                        <span className="text-slate-500">Total Dibayar</span>
                        <span className="font-bold text-primary">{formatIDR(data.total)}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 flex justify-center items-center gap-2 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition shadow-lg shadow-primary/20">
                        <Download className="w-4 h-4" /> Unduh E-Ticket
                    </button>
                    <button className="flex-1 flex justify-center items-center gap-2 bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition">
                        <Share2 className="w-4 h-4" /> Bagikan
                    </button>
                </div>

                <div className="mt-8 text-sm">
                    <Link href="/" className="text-primary font-semibold hover:underline">Kembali ke Beranda</Link>
                </div>
            </div>
        </div>
    );
}
