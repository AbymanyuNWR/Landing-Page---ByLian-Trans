"use client";

import { useState } from "react";
import { Search, Tag, CheckCircle2 } from "lucide-react";
import { formatIDR } from "@/lib/utils";

const VOUCHERS = [
    { id: "v1", name: "Diskon Tiket Rp 50.000", pointsRequired: 1000, desc: "Potongan harga langsung untuk semua rute reguler." },
    { id: "v2", name: "Diskon Tiket Rp 100.000", pointsRequired: 2000, desc: "Potongan harga Rp 100rb, minimal transaksi Rp 300rb." },
    { id: "v3", name: "Tiket Gratis 1x Jalan", pointsRequired: 5000, desc: "Kelas Eksekutif (2-2) rute mana saja bebas pilih." },
];

export function RedeemPointsForm({ currentPoints = 2500 }: { currentPoints?: number }) {
    const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleRedeem = () => {
        if (!selectedVoucher) return;
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            setSelectedVoucher(null);
        }, 3000);
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm h-full">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-slate-50">
                <div>
                    <h3 className="font-bold text-lg text-slate-800">Tukar Poin</h3>
                    <p className="text-xs text-slate-500 mt-1">Poin Anda: <strong className="text-primary">{currentPoints.toLocaleString('id-ID')} Poin</strong></p>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari voucher..."
                        className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-auto"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {VOUCHERS.map((voucher) => {
                    const isEligible = currentPoints >= voucher.pointsRequired;
                    const isSelected = selectedVoucher === voucher.id;

                    return (
                        <div
                            key={voucher.id}
                            onClick={() => isEligible && setSelectedVoucher(voucher.id)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden
                ${isSelected ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : ''}
                ${isEligible && !isSelected ? 'border-slate-200 hover:border-primary/50 bg-white' : ''}
                ${!isEligible ? 'border-slate-100 bg-slate-50 cursor-not-allowed opacity-60' : ''}
              `}
                        >
                            <div className="flex gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm
                   ${isEligible ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}
                 `}>
                                    <Tag className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 leading-tight mb-1">{voucher.name}</h4>
                                    <p className="text-xs text-slate-500 line-clamp-2">{voucher.desc}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100/60 flex items-center justify-between">
                                <span className={`text-xs font-black px-2 py-1 rounded-md tracking-wider
                   ${isEligible ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-500'}
                `}>
                                    {voucher.pointsRequired} POIN
                                </span>

                                {!isEligible && (
                                    <span className="text-[10px] font-bold text-red-500">Poin tidak cukup</span>
                                )}
                                {isSelected && (
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between mt-auto">
                <div className="flex-1">
                    {success ? (
                        <p className="text-sm font-bold text-green-600 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Penukaran Berhasil! Voucher tersimpan.
                        </p>
                    ) : (
                        <p className="text-xs text-slate-500">Pilih voucher yang ingin ditukarkan.</p>
                    )}
                </div>
                <button
                    disabled={!selectedVoucher || success}
                    onClick={handleRedeem}
                    className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-primary-dark transition disabled:opacity-50"
                >
                    Tukarkan
                </button>
            </div>
        </div>
    );
}
