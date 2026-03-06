"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { PaymentMethod } from "@/components/features/booking/PaymentMethod";
import { BookingStepIndicator } from "@/components/features/booking/BookingStepIndicator";
import { OrderSummary } from "@/components/features/booking/OrderSummary";
import { ShieldAlert, Clock } from "lucide-react";

export default function PembayaranPage() {
    const router = useRouter();
    const { passengerData, selectedScheduleId } = useBookingStore();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!passengerData || !selectedScheduleId) {
            router.push("/pesan");
        }
    }, [passengerData, selectedScheduleId, router]);

    if (!passengerData || !selectedScheduleId) return null;

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment process
        setTimeout(() => {
            // In real app, create order in DB here and get booking ID
            router.push(`/pesan/sukses/BLT${Math.floor(1000 + Math.random() * 9000)}`);
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <BookingStepIndicator />

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    <div className="w-full lg:w-2/3">
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 mb-6">
                            <Clock className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                            <div>
                                <p className="font-bold text-amber-800 text-sm">Selesaikan Pembayaran dalam Waktu 15:00</p>
                                <p className="text-xs text-amber-700 mt-1">Kursi Anda telah kami simpan. Jika melewati batas waktu, pesanan akan otomatis dibatalkan.</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-slate-800">Pilih Metode Pembayaran</h2>
                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                <ShieldAlert className="w-4 h-4 text-green-600" /> Transaksi 100% aman dan terenkripsi
                            </p>
                        </div>
                        <PaymentMethod />
                    </div>

                    <div className="w-full lg:w-1/3">
                        <OrderSummary />

                        <button
                            disabled={isProcessing}
                            onClick={handlePayment}
                            className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                "Bayar Sekarang"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
