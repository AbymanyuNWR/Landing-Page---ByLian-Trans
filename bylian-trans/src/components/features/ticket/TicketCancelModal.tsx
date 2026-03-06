"use client";

import { AlertTriangle, X } from "lucide-react";

interface TicketCancelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    bookingCode: string;
}

export function TicketCancelModal({ isOpen, onClose, onConfirm, bookingCode }: TicketCancelModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-black text-slate-800 mb-2">Batalkan Tiket?</h3>
                    <p className="text-slate-500 text-sm mb-6">
                        Anda yakin ingin membatalkan pesanan <strong className="text-slate-800">{bookingCode}</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left mb-6">
                        <h4 className="font-bold text-amber-800 text-xs uppercase mb-2 block">Kebijakan Refund</h4>
                        <ul className="text-xs text-amber-700 space-y-1.5 list-disc pl-4">
                            <li>Pembatalan &gt; 24 jam sebelum berangkat: <strong>Refund 75%</strong></li>
                            <li>Pembatalan 12-24 jam sebelum berangkat: <strong>Refund 50%</strong></li>
                            <li>Pembatalan &lt; 12 jam sebelum berangkat: <strong>Hangus (Tidak ada refund)</strong></li>
                        </ul>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                        >
                            Kembali
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="flex-1 py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition shadow-lg shadow-red-600/20"
                        >
                            Ya, Batalkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
