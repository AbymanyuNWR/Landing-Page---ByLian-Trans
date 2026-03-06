"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { PassengerForm } from "@/components/features/booking/PassengerForm";
import { BookingStepIndicator } from "@/components/features/booking/BookingStepIndicator";
import { OrderSummary } from "@/components/features/booking/OrderSummary";

export default function DataPenumpangPage() {
    const router = useRouter();
    const { selectedSeats } = useBookingStore();

    useEffect(() => {
        if (selectedSeats.length === 0) {
            router.push("/pesan");
        }
    }, [selectedSeats, router]);

    if (selectedSeats.length === 0) return null;

    const handleSuccess = () => {
        router.push("/pesan/pembayaran");
    };

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <BookingStepIndicator />

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    <div className="w-full lg:w-2/3">
                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-slate-800">Isi Data Penumpang</h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Pastikan nama sesuai dengan identitas (KTP/SIM/Paspor) untuk kelancaran boarding.
                            </p>
                        </div>
                        <PassengerForm onSuccess={handleSuccess} />
                    </div>

                    <div className="w-full lg:w-1/3">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}
