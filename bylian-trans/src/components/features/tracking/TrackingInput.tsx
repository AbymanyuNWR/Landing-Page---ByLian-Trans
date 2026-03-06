"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";

export function TrackingInput({ onSearch }: { onSearch: (code: string) => void }) {
    const [code, setCode] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.trim()) {
            onSearch(code.trim());
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto w-full">
            <div className="flex items-center gap-3 mb-4 text-primary">
                <MapPin className="w-6 h-6" />
                <h2 className="text-xl font-bold text-slate-800">Lacak Bus Anda</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">Masukkan Kode Booking atau Nomor Plat Bus untuk melihat posisi terkini (Live GPS).</p>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Contoh: BLT-123456 atau G 1234 AB"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                    />
                    <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                    type="submit"
                    disabled={!code.trim()}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                    Lacak
                </button>
            </form>
        </div>
    );
}
