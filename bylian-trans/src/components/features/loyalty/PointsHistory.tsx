"use client";

import { ArrowUpRight, ArrowDownLeft, Gift, Ticket } from "lucide-react";

interface Transaction {
    id: string;
    type: "EARNED" | "REDEEMED";
    amount: number;
    description: string;
    date: Date;
}

export function PointsHistory() {
    const dummyHistory: Transaction[] = [
        { id: "1", type: "EARNED", amount: 1500, description: "Pembelian Tiket Jakarta - Tegal (BLT-8X922A)", date: new Date("2024-03-10") },
        { id: "2", type: "REDEEMED", amount: 500, description: "Tukar Voucher Diskon 20k", date: new Date("2024-02-15") },
        { id: "3", type: "EARNED", amount: 1000, description: "Bonus Registrasi Pengguna Baru", date: new Date("2024-01-01") },
    ];

    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm h-full">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-lg text-slate-800">Riwayat Poin</h3>
                <span className="text-xs text-slate-500 font-medium">30 Hari Terakhir</span>
            </div>

            <div className="divide-y divide-slate-100">
                {dummyHistory.map((trx) => (
                    <div key={trx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                ${trx.type === "EARNED" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}
              `}>
                                {trx.type === "EARNED" ? <Ticket className="w-4 h-4" /> : <Gift className="w-4 h-4" />}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 line-clamp-1">{trx.description}</p>
                                <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">
                                    {trx.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <p className={`font-black flex items-center gap-1
                 ${trx.type === "EARNED" ? "text-green-600" : "text-red-500"}
               `}>
                                {trx.type === "EARNED" ? "+" : "-"}{trx.amount}
                                {trx.type === "EARNED" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownLeft className="w-3.5 h-3.5" />}
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium mt-1">Poin</p>
                        </div>
                    </div>
                ))}
                {dummyHistory.length === 0 && (
                    <div className="p-8 text-center text-slate-500 text-sm">
                        Belum ada riwayat transaksi poin.
                    </div>
                )}
            </div>
        </div>
    );
}
