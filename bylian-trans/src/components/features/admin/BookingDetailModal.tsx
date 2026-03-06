"use client";

import { X, Calendar, MapPin, User, Ticket, CreditCard } from "lucide-react";
import { formatIDR } from "@/lib/utils";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: any;
}

export function BookingDetailModal({ isOpen, onClose, booking }: BookingModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

            <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">Detail Pemesanan <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-mono">{booking?.code || 'BLT-TEST'}</span></h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="flex items-center gap-1.5 text-slate-500 font-medium mb-1"><User className="w-4 h-4" /> Informasi Pemesan</p>
                            <p className="font-bold text-slate-800">Muhamad Budi</p>
                            <p className="text-slate-600 mt-1">budi@test.com</p>
                            <p className="text-slate-600">081234567890</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="flex items-center gap-1.5 text-slate-500 font-medium mb-1"><CreditCard className="w-4 h-4" /> Pembayaran</p>
                            <p className="font-bold text-green-600">LUNAS - BCA VA</p>
                            <p className="text-slate-600 mt-1">Total: <span className="font-bold text-slate-800">{formatIDR(150000)}</span></p>
                            <p className="text-slate-400 text-xs mt-1">1 Okt 2024, 14:30 WIB</p>
                        </div>
                    </div>

                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="bg-slate-100 p-3 font-semibold text-slate-700 text-sm flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Detail Perjalanan
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-4 text-sm relative">
                            <div>
                                <p className="text-xs text-slate-500 font-medium mb-1">Keberangkatan</p>
                                <p className="font-bold">Tegal (Pool Pusat)</p>
                                <p className="text-slate-600">10 Okt 2024, 19:00 WIB</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium mb-1">Kedatangan</p>
                                <p className="font-bold">Jakarta (Pulo Gebang)</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-3 border-t border-slate-100 text-xs font-medium text-slate-600">
                            Armada: <span className="font-bold text-primary">Eksekutif (BYL-081)</span> | Supir: <span className="font-bold">Ahmad</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2"><Ticket className="w-4 h-4" /> Daftar Penumpang (1)</h3>
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-left align-middle">
                                <thead className="bg-slate-50 text-slate-500 text-xs border-b border-slate-200">
                                    <tr>
                                        <th className="py-2 px-4">Kursi</th>
                                        <th className="py-2 px-4">Nama Penumpang</th>
                                        <th className="py-2 px-4 hidden sm:table-cell">NIK/ID</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="py-3 px-4 font-bold text-primary">1A</td>
                                        <td className="py-3 px-4 font-semibold text-slate-700">Muhamad Budi (L)</td>
                                        <td className="py-3 px-4 text-slate-500 hidden sm:table-cell text-xs">33280123456789</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button className="px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-semibold hover:bg-slate-100 text-slate-700">Cetak E-Ticket</button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark shadow-sm">Kirim Ulang Notifikasi</button>
                </div>
            </div>
        </div>
    );
}
