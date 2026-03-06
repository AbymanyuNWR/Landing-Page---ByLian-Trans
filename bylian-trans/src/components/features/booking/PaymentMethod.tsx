"use client";

import { CreditCard, Wallet, Building2, Banknote } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PAYMENT_METHODS = [
    { id: "qris", name: "QRIS", icon: Wallet, desc: "Scan QR lewat m-banking/e-wallet" },
    { id: "bca_va", name: "BCA Virtual Account", icon: Building2, desc: "Bayar otomatis via BCA" },
    { id: "mandiri_va", name: "Mandiri Virtual Account", icon: Building2, desc: "Bayar otomatis via Mandiri" },
    { id: "cc", name: "Kartu Kredit/Debit", icon: CreditCard, desc: "Visa, Mastercard, JCB" },
    { id: "cstore", name: "Indomaret / Alfamart", icon: Banknote, desc: "Bayar tunai di minimarket" },
];

export function PaymentMethod({ onSelect, selectedId }: { onSelect: (id: string) => void, selectedId: string | null }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold mb-4">Pilih Metode Pembayaran</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PAYMENT_METHODS.map((method) => {
                    const isSelected = selectedId === method.id;
                    return (
                        <div
                            key={method.id}
                            onClick={() => onSelect(method.id)}
                            className={cn(
                                "border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-300",
                                isSelected
                                    ? "border-primary bg-primary/5 ring-1 ring-primary shadow-md"
                                    : "border-slate-200 hover:border-primary/50"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                            )}>
                                <method.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">{method.name}</h4>
                                <p className="text-xs text-slate-500">{method.desc}</p>
                            </div>
                            <div className="ml-auto">
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                                    isSelected ? "border-primary" : "border-slate-300"
                                )}>
                                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
