"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { JadwalCard } from "@/components/features/booking/JadwalCard";
import { BookingStepIndicator } from "@/components/features/booking/BookingStepIndicator";
import { SearchBoxSection } from "@/components/sections/SearchBoxSection";

// Dummy schedules
const SCHEDULES = [
    { id: "sch_1", busName: "BYL-081", busClass: "Eksekutif (2-2)", departureTime: "19:00", arrivalTime: "04:30", departurePool: "Tegal (Pool Pusat)", arrivalPool: "Jakarta (Pulo Gebang)", price: 150000, availableSeats: 12, duration: "9 Jam 30 Menit", facilities: ["AC", "Reclining Seat", "Toilet", "Snack"] },
    { id: "sch_2", busName: "BYL-082", busClass: "Super Eksekutif (2-1)", departureTime: "19:30", arrivalTime: "04:00", departurePool: "Tegal (Pool Pusat)", arrivalPool: "Jakarta (Pulo Gebang)", price: 210000, availableSeats: 5, duration: "8 Jam 30 Menit", facilities: ["AC", "Legrest", "Toilet", "Makan Malam", "Bantal Selimut"] },
    { id: "sch_3", busName: "BYL-075", busClass: "Bisnis AC (2-2)", departureTime: "20:00", arrivalTime: "05:30", departurePool: "Slawi", arrivalPool: "Jakarta (Rambutan)", price: 120000, availableSeats: 18, duration: "9 Jam 30 Menit", facilities: ["AC", "Reclining Seat"] },
];

export default function PencarianJadwalPage() {
    const router = useRouter();
    const { searchData, selectedScheduleId, setSchedule } = useBookingStore();

    const handleSelectSchedule = (schedule: any) => {
        setSchedule(schedule.id);
    };

    const handleNext = () => {
        if (selectedScheduleId) {
            router.push("/pesan/kursi");
        }
    };

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <BookingStepIndicator />

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    {/* Left Sidebar - Search Params */}
                    <div className="w-full lg:w-1/3 xl:w-1/4">
                        <div className="sticky top-24">
                            <SearchBoxSection />
                        </div>
                    </div>

                    {/* Right Content - Results */}
                    <div className="w-full lg:w-2/3 xl:w-3/4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">
                                Jadwal Tersedia <span className="text-slate-500 font-normal text-sm">({SCHEDULES.length} Trip)</span>
                            </h2>
                            <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white text-sm font-medium">
                                <button className="px-3 py-1.5 bg-slate-100 text-primary">Termurah</button>
                                <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-50 border-l border-slate-200">Awal</button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {SCHEDULES.map((schedule) => (
                                <JadwalCard
                                    key={schedule.id}
                                    schedule={schedule}
                                    onSelect={() => handleSelectSchedule(schedule)}
                                />
                            ))}

                            {SCHEDULES.length === 0 && (
                                <div className="text-center p-12 bg-white rounded-2xl border border-slate-200">
                                    <p className="text-slate-500">Maaf, tidak ada jadwal yang sesuai dengan pencarian Anda.</p>
                                </div>
                            )}
                        </div>

                        {selectedScheduleId && (
                            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 lg:hidden">
                                <button
                                    onClick={handleNext}
                                    className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition"
                                >
                                    Lanjut Pilih Kursi
                                </button>
                            </div>
                        )}

                        {selectedScheduleId && (
                            <div className="mt-8 text-right hidden lg:block">
                                <button
                                    onClick={handleNext}
                                    className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition shadow-lg shadow-primary/20"
                                >
                                    Lanjut Pilih Kursi &rarr;
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
