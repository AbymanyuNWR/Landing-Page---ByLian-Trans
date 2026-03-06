"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { SeatMap } from "@/components/features/booking/SeatMap";
import { BookingStepIndicator } from "@/components/features/booking/BookingStepIndicator";
import { OrderSummary } from "@/components/features/booking/OrderSummary";
import { generateDummySeats } from "@/data/bylian.data"; // Assuming you have a dummy generator, or just inline it

// Simplified Dummy Generator
const generateSeats = (layout: "2-2" | "2-1") => {
    const seats = [];
    const letters = layout === "2-2" ? ["A", "B", "C", "D"] : ["A", "B", "C"];
    const rows = 10;
    for (let r = 1; r <= rows; r++) {
        for (let c = 0; c < letters.length; c++) {
            const isBooked = Math.random() > 0.8;
            seats.push({
                id: `${r}${letters[c]}`,
                seatNumber: `${r}${letters[c]}`,
                status: isBooked ? 'BOOKED' : 'AVAILABLE' as any,
                price: layout === "2-2" ? 150000 : 210000
            });
        }
    }
    return seats;
};

export default function PilihKursiPage() {
    const router = useRouter();
    const { selectedScheduleId, selectedSeats, searchData } = useBookingStore();

    useEffect(() => {
        if (!selectedScheduleId) {
            router.push("/pesan");
        }
    }, [selectedScheduleId, router]);

    if (!selectedScheduleId) return null;

    const seats = generateSeats("2-2"); // Based on schedule class. Hardcoded for UI demo.
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
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Pilih Kursi</h2>
                            <p className="text-sm text-slate-500 mb-8 max-w-lg mx-auto">
                                Pilih {requiredSeats} kursi yang tersedia untuk perjalanan Anda. Kursi bagian depan dan dekat jendela biasanya lebih cepat penuh.
                            </p>
                            <SeatMap seats={seats} layout="2-2" pricePerSeat={150000} />
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
