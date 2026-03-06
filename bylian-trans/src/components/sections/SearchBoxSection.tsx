"use client";

import React, { useState } from "react";
import { ArrowRightLeft, MapPin, Calendar as CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Simplified version for now! Will integrate standard date-picker and selectors once everything installs 
export function SearchBoxSection() {
    const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
    const [origin, setOrigin] = useState("Tegal");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [pax, setPax] = useState(1);

    const swapLocations = () => {
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
    };

    const currentDay = new Date().toISOString().split("T")[0];

    return (
        <div className="w-full max-w-5xl mx-auto -mt-16 relative z-20 px-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20">

                {/* Trip Type Tabs */}
                <div className="flex items-center gap-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <button
                        onClick={() => setTripType("oneway")}
                        className={`font-medium pb-2 -mb-4.5 transition-colors border-b-2 ${tripType === "oneway" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                            }`}
                    >
                        Sekali Jalan
                    </button>
                    <button
                        onClick={() => setTripType("roundtrip")}
                        className={`font-medium pb-2 -mb-4.5 transition-colors border-b-2 ${tripType === "roundtrip" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                            }`}
                    >
                        Pulang Pergi
                    </button>
                </div>

                {/* Inputs Grid */}
                <div className="flex flex-col md:flex-row items-end gap-4">

                    {/* Origin & Destination */}
                    <div className="flex-1 flex flex-col md:flex-row w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl relative p-2">

                        <div className="flex-1 relative">
                            <label className="text-xs font-semibold text-slate-500 uppercase px-3 block mb-1">Dari Mana?</label>
                            <div className="flex items-center px-3">
                                <MapPin className="text-primary w-5 h-5 mr-2 shrink-0" />
                                <Input
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    placeholder="Kota Asal"
                                    className="border-none bg-transparent shadow-none px-0 focus-visible:ring-0 text-base font-medium"
                                />
                            </div>
                        </div>

                        <button
                            onClick={swapLocations}
                            className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-200 shadow-md hover:bg-slate-100 transition-colors z-10"
                        >
                            <ArrowRightLeft size={16} />
                        </button>
                        <div className="hidden md:block w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

                        <div className="flex-1 relative pt-4 md:pt-0">
                            <label className="text-xs font-semibold text-slate-500 uppercase px-3 block mb-1">Ke Mana?</label>
                            <div className="flex items-center px-3">
                                <MapPin className="text-secondary w-5 h-5 mr-2 shrink-0" />
                                <Input
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Kota Tujuan"
                                    className="border-none bg-transparent shadow-none px-0 focus-visible:ring-0 text-base font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Date Picker (Native for now) & Passengers */}
                    <div className="flex-1 flex w-full space-x-4">
                        <div className="flex-1 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl p-2 relative">
                            <label className="text-xs font-semibold text-slate-500 uppercase px-3 block mb-1">Berangkat</label>
                            <div className="flex items-center px-3">
                                <CalendarIcon className="text-slate-400 w-5 h-5 mr-2 shrink-0" />
                                <Input
                                    type="date"
                                    min={currentDay}
                                    value={date ? format(date, "yyyy-MM-dd") : ""}
                                    onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
                                    className="border-none bg-transparent shadow-none px-0 focus-visible:ring-0 text-base font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex-1 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl p-2 relative">
                            <label className="text-xs font-semibold text-slate-500 uppercase px-3 block mb-1">Penumpang</label>
                            <div className="flex items-center px-3">
                                <Users className="text-slate-400 w-5 h-5 mr-2 shrink-0" />
                                <div className="flex justify-between items-center w-full">
                                    <button type="button" onClick={() => setPax(Math.max(1, pax - 1))} className="text-xl px-2">-</button>
                                    <span className="font-medium text-base">{pax}</span>
                                    <button type="button" onClick={() => setPax(Math.min(40, pax + 1))} className="text-xl px-2">+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button className="h-[76px] px-8 rounded-2xl text-lg font-bold shadow-lg shadow-primary/30 w-full md:w-auto">
                        Cari Tiket
                    </Button>

                </div>
            </div>
        </div>
    );
}
