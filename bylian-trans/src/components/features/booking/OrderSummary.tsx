"use client";

import { useState, useEffect } from "react";
import { useBookingStore } from "@/store/useBookingStore";
import { formatIDR } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Clock, Info } from "lucide-react";
import { getEtaCorrection } from "@/actions/fleet";

export function OrderSummary() {
    const { searchData, selectedSeats, selectedScheduleId } = useBookingStore();
    const [etaData, setEtaData] = useState<any>(null);

    useEffect(() => {
        if (selectedScheduleId) {
            getEtaCorrection(selectedScheduleId).then(res => {
                if (res.success) setEtaData(res);
            });
        }
    }, [selectedScheduleId]);

    const basePrice = selectedSeats.reduce((acc, seat) => acc + (seat.price || 0), 0);
    const serviceFee = 5000;
    const total = basePrice > 0 ? basePrice + serviceFee : 0;

    return (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Ringkasan Pesanan</h3>

            {searchData && (
                <div className="mb-4 pb-4 border-b border-slate-200 text-sm">
                    <p className="text-slate-500 mb-1">Rute</p>
                    <p className="font-semibold">{searchData.origin} <span className="text-slate-400 mx-1">→</span> {searchData.destination}</p>
                    
                    <div className="flex justify-between items-start mt-4">
                        <div>
                            <p className="text-slate-500 mb-1">Tanggal Keberangkatan</p>
                            <p className="font-semibold">{new Date(searchData.date).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        {etaData && (
                            <div className="text-right">
                                <p className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1 justify-end">
                                    <Clock className="w-3 h-3" /> Info Traffic
                                </p>
                                <p className={`text-xs font-black ${etaData.intensityStatus === 'HEAVY_CONGESTION' ? 'text-red-500' : 'text-orange-500'}`}>
                                    +{etaData.trafficImpactMins} Menit
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-500">Harga Tiket ({selectedSeats.length} Kursi)</span>
                    <span className="font-semibold">{formatIDR(basePrice)}</span>
                </div>
                {selectedSeats.length > 0 && (
                    <div className="flex justify-between text-xs text-slate-500 pl-2 border-l-2 border-slate-200 ml-1">
                        <span>Kursi: {selectedSeats.map(s => s.seatNumber).join(", ")}</span>
                    </div>
                )}
                <div className="flex justify-between">
                    <span className="text-slate-500">Biaya Layanan</span>
                    <span className="font-semibold">{formatIDR(basePrice > 0 ? serviceFee : 0)}</span>
                </div>
            </div>

            <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold">Total Pembayaran</span>
                <span className="text-xl font-black text-primary">{formatIDR(total)}</span>
            </div>

            <div className="mt-6 bg-blue-50 text-blue-800 p-3 rounded-lg text-xs flex gap-2 items-start">
                <Info className="w-4 h-4 mt-0.5 shrink-0" />
                <p>Tiket tidak dapat di-refund jika pembatalan dilakukan kurang dari 12 jam sebelum keberangkatan.</p>
            </div>
        </div>
    );
}
