"use client";

import { useState } from "react";
import Link from "next/link";
import { formatIDR, formatDate } from "@/lib/utils";
import { Ticket as TicketIcon, MapPin, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateRefundEligibilityAction } from "@/actions/refund";

export function TicketCard({ ticket }: { ticket: any }) {
    const isUpcoming = new Date(ticket.schedule.departureTime) > new Date() && ticket.status === "CONFIRMED";
    const isExpired = Date.now() > new Date(ticket.expiresAt).getTime() && ticket.status === "PENDING";

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <TicketIcon className="w-5 h-5 text-primary" />
                    <span className="font-bold font-mono text-slate-700">{ticket.bookingCode}</span>
                </div>
                <span className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-bold",
                    ticket.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                        ticket.status === "PENDING" && !isExpired ? "bg-amber-100 text-amber-700" :
                            "bg-slate-100 text-slate-500"
                )}>
                    {isExpired ? "KADAULARSA" : ticket.status === "CONFIRMED" ? "LUNAS" :
                        ticket.status === "PENDING" ? "MENUNGGU PEMBAYARAN" : ticket.status}
                </span>
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                        <h4 className="font-bold text-lg text-slate-800">{ticket.schedule.route.origin}</h4>
                        <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> Pool Keberangkatan
                        </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 mx-4" />
                    <div className="flex-1 text-right">
                        <h4 className="font-bold text-lg text-slate-800">{ticket.schedule.route.destination}</h4>
                        <span className="text-xs text-slate-500 flex items-center justify-end gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-red-500" /> Pool Kedatangan
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-semibold">Berangkat</p>
                        <p className="text-sm font-bold mt-0.5">{formatDate(ticket.schedule.departureTime)}</p>
                        <p className="text-sm flex items-center gap-1 text-slate-600 mt-0.5"><Clock className="w-3.5 h-3.5" /> 19:00 WIB</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-semibold">Penumpang</p>
                        <p className="text-sm font-bold mt-0.5">{ticket.passengers?.length || 1} Orang</p>
                        <p className="text-sm text-slate-600 mt-0.5">{formatIDR(ticket.totalAmount)}</p>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    {ticket.status === "CONFIRMED" && (
                        <Link
                            href={`/akun/tiket/${ticket.id}`}
                            className="flex-1 text-center bg-primary text-white py-2.5 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow shadow-primary/20"
                        >
                            Lihat E-Ticket
                        </Link>
                    )}
                    {ticket.status === "PENDING" && !isExpired && (
                        <Link
                            href={`/pesan/pembayaran?id=${ticket.id}`}
                            className="flex-1 text-center bg-amber-500 text-white py-2.5 rounded-xl font-bold hover:bg-amber-600 transition-colors shadow shadow-amber-500/20"
                        >
                            Bayar Sekarang
                        </Link>
                    )}
                    <Link
                        href={`/akun/tiket/${ticket.id}/detail`}
                        className="flex-1 text-center border-2 border-slate-200 text-slate-700 py-2.5 rounded-xl font-bold hover:border-primary hover:text-primary transition-colors"
                    >
                        Detail Pesanan
                    </Link>
                </div>

                {/* Task 69: Zenith Smart Refund Preview */}
                {ticket.status === "CONFIRMED" && (
                    <RefundPreview bookingId={ticket.id} />
                )}
            </div>
        </div>
    );
}

function RefundPreview({ bookingId }: { bookingId: string }) {
    const [preview, setPreview] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleCheck = async () => {
        if (show) { setShow(false); return; }
        setIsLoading(true);
        const res = await calculateRefundEligibilityAction(bookingId);
        if (res.success) {
            setPreview(res.data);
            setShow(true);
        }
        setIsLoading(false);
    };

    return (
        <div className="mt-4 pt-4 border-t border-slate-100">
            <button 
                onClick={handleCheck}
                disabled={isLoading}
                className="text-[10px] font-black uppercase text-slate-400 hover:text-primary transition-colors flex items-center gap-1"
            >
                <div className={`w-1.5 h-1.5 rounded-full ${show ? 'bg-primary' : 'bg-slate-300'}`}></div>
                {isLoading ? "Menghitung Estimasi..." : show ? "Tutup Estimasi Refund" : "Cek Estimasi Refund (Zenith Algorithm)"}
            </button>
            
            {show && preview && (
                <div className="mt-3 bg-amber-50 border border-amber-100 p-3 rounded-lg animate-in fade-in slide-in-from-top-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-amber-800 uppercase">Status Kelayakan</span>
                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${preview.refundPercentage > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                            {preview.status}
                        </span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[10px] text-amber-700">{preview.hoursToDeparture} jam sebelum berangkat</p>
                            <p className="text-sm font-black text-amber-900">{preview.refundPercentage}% Dana Kembali</p>
                        </div>
                        <p className="text-lg font-black text-amber-900 leading-none">
                            {formatIDR(preview.refundAmount)}
                        </p>
                    </div>
                    <p className="text-[9px] text-amber-600 mt-2 italic leading-tight">
                        * {preview.note}
                    </p>
                </div>
            )}
        </div>
    );
}
