"use client";

import { CheckCircle2, ChevronLeft } from "lucide-react";

export function CharterSuccessMessage({ onReset }: { onReset: () => void }) {
    return (
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#16a34a] to-[#22c55e]" />

            <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-green-100 animate-ping opacity-20" />
                <CheckCircle2 className="w-12 h-12 relative z-10" />
            </div>

            <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Permintaan Terkirim!</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
                Terima kasih telah mempercayakan perjalanan Anda kepada PT Bylian Trans. Tim Sales kami akan menghubungi Anda melalui WhatsApp atau Email untuk memberikan penawaran terbaik dalam waktu maksimal 1x24 Jam Kerja.
            </p>

            <button
                onClick={onReset}
                className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold transition-colors"
            >
                <ChevronLeft className="w-4 h-4" /> Kembali
            </button>
        </div>
    );
}
