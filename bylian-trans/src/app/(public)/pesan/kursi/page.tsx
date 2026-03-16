"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { SeatMap } from "@/components/features/booking/SeatMap";
import { BookingStepIndicator } from "@/components/features/booking/BookingStepIndicator";
import { OrderSummary } from "@/components/features/booking/OrderSummary";
import { BookingCountdown } from "@/components/features/booking/BookingCountdown";
import { getScheduleSeats } from "@/actions/schedule";

export default function PilihKursiPage() {
    const router = useRouter();
    const { selectedScheduleId, selectedSeats, searchData } = useBookingStore();
    const [seats, setSeats] = useState<any[]>([]);
    const [layout, setLayout] = useState<"2-2" | "2-1">("2-2");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!selectedScheduleId) {
            router.push("/pesan");
            return;
        }

        async function fetchSeats() {
            setIsLoading(true);
            const result = await getScheduleSeats(selectedScheduleId!);
            if (result.success) {
                setSeats(result.seats || []);
                setLayout((result.layout as any) || "2-2");
            }
            setIsLoading(false);
        }

        fetchSeats();
    }, [selectedScheduleId, router]);

    if (!selectedScheduleId) return null;

    const requiredSeats = searchData?.passengers || 1;
    const isComplete = selectedSeats.length === requiredSeats;

    const handleNext = () => {
        if (isComplete) {
            router.push("/pesan/data-penumpang");
        }
    };

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <BookingStepIndicator />

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-10 mb-6 text-center">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-800">Pilih Kursi</h2>
                                <BookingCountdown />
                            </div>
                            <p className="text-sm text-slate-500 mb-8 max-w-lg mx-auto">
                                Pilih {requiredSeats} kursi yang tersedia untuk perjalanan Anda. Kursi bagian depan dan dekat jendela biasanya lebih cepat penuh.
                            </p>
                             {isLoading ? (
                                <div className="h-96 flex flex-col items-center justify-center space-y-4">
                                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-slate-500 font-medium">Buka Denah Kursi...</p>
                                </div>
                             ) : (
                                <SeatMap seats={seats} layout={layout} pricePerSeat={seats[0]?.price || 0} />
                             )}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3">
                        <OrderSummary />

                        <button
                            disabled={!isComplete}
                            onClick={handleNext}
                            className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none"
                        >
                            {isComplete ? "Isi Data Penumpang" : `Pilih ${requiredSeats - selectedSeats.length} Kursi Lagi`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
