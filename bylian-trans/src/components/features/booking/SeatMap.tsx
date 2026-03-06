"use client";

import { useState } from "react";
import { useBookingStore } from "@/store/useBookingStore";
import { SeatDetail } from "@/types";

interface SeatMapProps {
    seats: SeatDetail[];
    layout: "2-2" | "2-1";
    pricePerSeat: number;
}

export function SeatMap({ seats, layout, pricePerSeat }: SeatMapProps) {
    const { selectedSeats, addSeat, removeSeat, searchData } = useBookingStore();
    const maxSeats = searchData?.passengers || 4;

    const handleSeatClick = (seat: SeatDetail) => {
        if (seat.status !== 'AVAILABLE') return;

        const isSelected = selectedSeats.some(s => s.id === seat.id);
        if (isSelected) {
            removeSeat(seat.id);
        } else {
            if (selectedSeats.length < maxSeats) {
                addSeat({ ...seat, price: pricePerSeat });
            } else {
                alert(`Anda hanya memesan untuk ${maxSeats} penumpang.`);
            }
        }
    };

    // Organize seats into rows based on layout. Simplified Mock setup for layout styling.
    const letters = layout === "2-2" ? ["A", "B", "C", "D"] : ["A", "B", "C"];
    const rowsCount = Math.ceil(seats.length / letters.length);

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-sm mx-auto">
            <div className="flex gap-4 mb-6 justify-center text-xs font-medium border-b pb-4">
                <span className="flex items-center gap-1.5"><div className="w-4 h-4 rounded border-2 border-slate-300 bg-white"></div> Tersedia</span>
                <span className="flex items-center gap-1.5"><div className="w-4 h-4 rounded border-2 border-primary bg-primary"></div> Terpilih</span>
                <span className="flex items-center gap-1.5"><div className="w-4 h-4 rounded border-2 border-slate-200 bg-slate-200"></div> Penuh</span>
            </div>

            <div className="flex flex-col gap-3 items-center bg-slate-50 p-6 rounded-xl border border-dashed border-slate-200 relative">
                {/* Supir/Driver indicator */}
                <div className="absolute top-4 right-6 text-[10px] font-bold text-slate-400 border border-slate-300 px-2 py-1 rounded">SUPIR</div>

                <div className="mt-8 flex flex-col gap-3">
                    {Array.from({ length: rowsCount }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex gap-2">
                            {letters.map((letter, colIndex) => {
                                const seatNum = `${rowIndex + 1}${letter}`;
                                const seat = seats.find(s => s.seatNumber === seatNum) || { id: seatNum, seatNumber: seatNum, status: 'AVAILABLE' as any };

                                // Add gangway (aisle) logic
                                const isGangway = layout === "2-2" ? colIndex === 1 : colIndex === 1;

                                const isSelected = selectedSeats.some(s => s.id === seat.id);

                                return (
                                    <div key={letter} className={`flex ${isGangway ? (layout === "2-2" ? 'mr-8' : 'mr-8') : ''}`}>
                                        <button
                                            disabled={seat.status !== 'AVAILABLE'}
                                            onClick={() => handleSeatClick(seat)}
                                            className={`
                        w-10 h-10 rounded-t-lg rounded-b-sm border-2 font-bold text-[10px] flex items-center justify-center transition-all
                        ${isSelected ? 'bg-primary border-primary text-white scale-110 shadow-md' : ''}
                        ${seat.status === 'AVAILABLE' && !isSelected ? 'bg-white border-slate-300 text-slate-600 hover:border-primary' : ''}
                        ${seat.status !== 'AVAILABLE' ? 'bg-slate-200 border-slate-200 text-slate-400 cursor-not-allowed' : ''}
                      `}
                                        >
                                            {seat.seatNumber}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
