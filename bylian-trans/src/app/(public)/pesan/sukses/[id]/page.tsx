"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookingSuccessCard } from "@/components/features/booking/BookingSuccessCard";
import { useBookingStore } from "@/store/useBookingStore";

export default function PesanSuksesPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { resetBooking, selectedScheduleId } = useBookingStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Don't reset immediately so the success card can read some state if needed
        // But ideally, success page should fetch booking data from server based on params.id
        return () => {
            resetBooking();
        };
    }, [resetBooking]);

    if (!mounted) return null;

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4">
                <BookingSuccessCard booking={{ id: params.id || "BLT-TEST", status: "PAID" }} />
            </div>
        </div>
    );
}
