"use client";

import { useBookingStore } from "@/store/useBookingStore";
import { formatIDR } from "@/lib/utils";
import { Bus, Clock, MapPin } from "lucide-react";

interface JadwalCardProps {
    schedule: {
        id: string;
        busName: string;
        busClass: string;
        departureTime: string;
        arrivalTime: string;
        departurePool: string;
        arrivalPool: string;
        price: number;
        availableSeats: number;
        duration: string;
        facilities: string[];
    };
    onSelect: () => void;
}

export function JadwalCard({ schedule, onSelect }: JadwalCardProps) {
    const { selectedScheduleId } = useBookingStore();
    const isSelected = selectedScheduleId === schedule.id;

    return (
        <div
            className={`relative border rounded-2xl p-5 mb-4 transition-all duration-300 ${isSelected ? 'border-primary ring-1 ring-primary shadow-md bg-primary/5' : 'border-slate-200 hover:border-primary/50 hover:shadow-sm bg-white'}`}
        >
            <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Left Side: Route and Time */}
                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-lg">{schedule.departureTime}</span>
                            <div className="h-10 border-l-2 border-dashed border-slate-300 my-1"></div>
                            <span className="font-bold text-lg">{schedule.arrivalTime}</span>
                        </div>
                        <div className="flex flex-col justify-between h-[84px]">
                            <div>
                                <span className="text-sm font-semibold flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" /> {schedule.departurePool}</span>
                            </div>
                            <div>
                                <span className="text-sm font-semibold flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-red-500" /> {schedule.arrivalPool}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Estimasi Perjalanan: {schedule.duration}
                    </div>
                </div>

                {/* Middle Side: Bus Info */}
                <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Bus className="w-5 h-5 text-primary" />
                            <h4 className="font-bold text-slate-800">{schedule.busName}</h4>
                        </div>
                        <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{schedule.busClass}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                        {schedule.facilities.map((fac, idx) => (
                            <span key={idx} className="text-[10px] text-slate-500 border border-slate-200 rounded-sm px-1.5 py-0.5">{fac}</span>
                        ))}
                    </div>
                </div>

                {/* Right Side: Price & Action */}
                <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between items-start md:items-end text-left md:text-right">
                    <div>
                        <span className="text-xs text-slate-500 block mb-1">Sisa {schedule.availableSeats} Kursi</span>
                        <p className="text-2xl font-black text-primary">{formatIDR(schedule.price)}</p>
                        <span className="text-xs text-slate-500">/ penumpang</span>
                    </div>
                    <button
                        onClick={onSelect}
                        className={`mt-4 w-full md:w-auto px-6 py-2.5 rounded-xl font-bold transition-all ${isSelected ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                        {isSelected ? "Terpilih" : "Pilih Kursi"}
                    </button>
                </div>
            </div>
        </div>
    );
}
