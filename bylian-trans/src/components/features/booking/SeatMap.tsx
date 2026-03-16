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

            <div className="flex flex-col gap-3 items-center bg-slate-50 p-6 md:p-8 rounded-xl border-2 border-slate-200 relative shadow-inner w-full max-w-[320px] mx-auto overflow-hidden">
                {/* Supir/Driver indicator */}
                <div className="absolute top-4 right-6 text-[10px] font-bold text-slate-400 bg-white border-2 border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">SUPIR</div>
                
                {/* Pintu Belakang Indicator */}
                <div className="absolute bottom-4 left-6 text-[10px] font-bold text-slate-400 bg-white border-2 border-slate-200 px-3 py-1.5 rounded-lg shadow-sm z-10">PINTU</div>

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
                                    <div key={letter} className={`flex relative group ${isGangway ? (layout === "2-2" ? 'mr-10' : 'mr-8') : ''}`}>
                                        {/* BEST / RECOMMENDED BADGE */}
                                        {seat.status === 'AVAILABLE' && !isSelected && (seat as any).score > 90 && (
                                            <div className="absolute -top-1.5 -right-1 z-20 bg-amber-400 text-[8px] font-black text-white px-1 rounded shadow-sm border border-white animate-bounce">
                                                BEST
                                            </div>
                                        )}
                                        {/* Seat armrest simulation */}
                                        <div className="absolute -left-0.5 top-3 bottom-2 w-0.5 bg-slate-200/50 rounded-full"></div>
                                        <div className="absolute -right-0.5 top-3 bottom-2 w-0.5 bg-slate-200/50 rounded-full"></div>
                                        <button
                                            disabled={seat.status !== 'AVAILABLE'}
                                            onClick={() => handleSeatClick(seat)}
                                            className={`
                        w-12 h-14 rounded-t-2xl rounded-b-md border-b-4 border-2 font-black text-xs flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden
                        ${isSelected ? 'bg-primary border-primary border-b-blue-800 text-white shadow-[0_4px_15_rgba(59,130,246,0.5)] scale-110 z-10' : ''}
                        ${seat.status === 'AVAILABLE' && !isSelected ? 'bg-white border-slate-300 border-b-slate-400 text-slate-600 hover:border-primary hover:text-primary active:scale-95' : ''}
                        ${seat.status !== 'AVAILABLE' ? 'bg-slate-200 border-slate-300 border-b-slate-300 text-slate-400 cursor-not-allowed opacity-70' : ''}
                        ${seat.status === 'AVAILABLE' && !isSelected && (seat as any).score > 90 ? 'border-amber-400 ring-2 ring-amber-100 ring-offset-1' : ''}
                      `}
                                        >
                                            {/* Seat headrest visual detail */}
                                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-6 h-3 rounded-b-md opacity-20 ${isSelected ? 'bg-white' : 'bg-slate-400'}`}></div>
                                            <span className="mt-2">{seat.seatNumber}</span>
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
