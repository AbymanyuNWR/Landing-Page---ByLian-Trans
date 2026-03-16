"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { JadwalCard } from "@/components/features/booking/JadwalCard";
import { BookingStepIndicator } from "@/components/features/booking/BookingStepIndicator";
import { SearchBoxSection } from "@/components/sections/SearchBoxSection";
import { searchSchedules } from "@/actions/schedule";

export default function PencarianJadwalPage() {
    const router = useRouter();
    const { searchData, selectedScheduleId, setSelectedSchedule } = useBookingStore();
    const [schedules, setSchedules] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSchedules() {
            if (!searchData?.origin || !searchData?.destination || !searchData?.date) {
                setSchedules([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            const result = await searchSchedules({
                origin: searchData.origin,
                destination: searchData.destination,
                date: searchData.date instanceof Date ? searchData.date.toISOString() : (searchData.date as any)
            });

            if (result.success) {
                setSchedules(result.schedules || []);
            } else {
                setError(result.error || "Gagal mengambil jadwal");
            }
            setIsLoading(false);
        }

        fetchSchedules();
    }, [searchData]);

    const handleSelectSchedule = (schedule: any) => {
        setSelectedSchedule(schedule.id);
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
                            <SearchBoxSection compact={true} />
                        </div>
                    </div>

                    {/* Right Content - Results */}
                    <div className="w-full lg:w-2/3 xl:w-3/4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">
                                Jadwal Tersedia <span className="text-slate-500 font-normal text-sm">({schedules.length} Trip)</span>
                            </h2>
                            <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white text-sm font-medium">
                                <button className="px-3 py-1.5 bg-slate-100 text-primary">Termurah</button>
                                <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-50 border-l border-slate-200">Awal</button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-48 bg-white rounded-2xl border border-slate-200 animate-pulse"></div>
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="text-center p-12 bg-white rounded-2xl border border-red-100 text-red-500">
                                    {error}
                                </div>
                            ) : schedules.length > 0 ? (
                                schedules.map((schedule) => (
                                    <JadwalCard
                                        key={schedule.id}
                                        schedule={schedule}
                                        onSelect={() => handleSelectSchedule(schedule)}
                                    />
                                ))
                            ) : (
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
