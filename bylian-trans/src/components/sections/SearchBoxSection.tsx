"use client";

import React, { useState } from "react";
import { ArrowRightLeft, MapPin, Calendar as CalendarIcon, Users, Search } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SearchBoxSection({ compact = false }: { compact?: boolean }) {
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

    const cities = ["Tegal", "Jakarta", "Bandung", "Semarang", "Yogyakarta", "Surabaya", "Malang", "Purwokerto"];

    return (
        <div className={`w-full max-w-6xl mx-auto ${compact ? '' : 'px-4'}`}>
            <div className={`bg-white dark:bg-slate-900 rounded-3xl ${compact ? 'p-5 shadow-lg shadow-slate-200/40 border border-slate-200 dark:border-slate-800' : 'shadow-2xl shadow-slate-200/30 dark:shadow-slate-900/50 p-6 md:p-8 border border-slate-100 dark:border-slate-800'}`}>

                {/* Trip Type Tabs */}
                <div className={`flex items-center gap-6 ${compact ? 'mb-5' : 'mb-8'}`}>
                    <button
                        onClick={() => setTripType("oneway")}
                        className={`relative font-bold text-sm pb-3 transition-colors ${
                            tripType === "oneway" 
                                ? "text-primary" 
                                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        }`}
                    >
                        Sekali Jalan
                        {tripType === "oneway" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-full"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setTripType("roundtrip")}
                        className={`relative font-bold text-sm pb-3 transition-colors ${
                            tripType === "roundtrip" 
                                ? "text-primary" 
                                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        }`}
                    >
                        Pulang Pergi
                        {tripType === "roundtrip" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-full"></div>
                        )}
                    </button>
                </div>

                {/* Inputs Grid */}
                <div className={`flex flex-col ${compact ? 'space-y-4' : 'lg:flex-row items-end gap-4'}`}>

                    {/* Origin & Destination */}
                    <div className={`flex-1 flex flex-col ${compact ? 'gap-4 relative' : 'lg:flex-row w-full bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl relative p-1 box-border'}`}>

                        <div className={`flex-1 flex flex-col justify-center h-[72px] lg:h-[76px] ${compact ? 'bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 relative box-border' : 'relative pl-4 pr-10 lg:pr-14'}`}>
                            <label className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-0.5">Dari Mana?</label>
                            <div className="flex items-center">
                                <MapPin className="text-primary w-5 h-5 mr-2 shrink-0" />
                                <select
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    className="bg-transparent border-none shadow-none focus:ring-0 text-base font-bold text-slate-800 dark:text-white w-full cursor-pointer p-0 h-6 appearance-none"
                                >
                                    {cities.map((city: string) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={swapLocations}
                            className={`absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white transition-all duration-300 z-10 border-4 border-white dark:border-slate-800 rounded-full ${compact ? 'w-10 h-10 bg-gradient-to-br from-primary to-blue-600 shadow-md hover:scale-110' : 'w-12 h-12 bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/30 hover:scale-110 hover:shadow-xl hover:shadow-primary/40'}`}
                        >
                            <ArrowRightLeft size={compact ? 16 : 18} className={compact ? "rotate-90" : ""} />
                        </button>
                        {!compact && <div className="hidden lg:block w-px bg-slate-200 dark:bg-slate-700 mx-1 my-2"></div>}

                        <div className={`flex-1 flex flex-col justify-center h-[72px] lg:h-[76px] ${compact ? 'bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 relative box-border' : 'relative pr-4 pl-10 lg:pl-14'}`}>
                            <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-0.5">Ke Mana?</label>
                            <div className="flex items-center">
                                <MapPin className="text-secondary w-5 h-5 mr-2 shrink-0" />
                                <select
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="bg-transparent border-none shadow-none focus:ring-0 text-base font-bold text-slate-800 dark:text-white w-full cursor-pointer p-0 h-6 appearance-none"
                                >
                                    <option value="">Pilih Tujuan</option>
                                    {cities.filter((c: string) => c !== origin).map((city: string) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Date & Passengers */}
                    <div className={`flex-1 flex w-full ${compact ? 'flex-col gap-4' : 'gap-4'}`}>
                        <div className="flex-1 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 relative h-[72px] lg:h-[76px] flex flex-col justify-center box-border mt-1 lg:mt-0">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Berangkat</label>
                            <div className="flex items-center">
                                <CalendarIcon className="text-slate-400 w-5 h-5 mr-2 shrink-0" />
                                <input
                                    type="date"
                                    min={currentDay}
                                    value={date ? format(date, "yyyy-MM-dd") : ""}
                                    onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
                                    className="bg-transparent border-none shadow-none focus:ring-0 text-base font-medium text-slate-800 dark:text-white w-full p-0 h-6"
                                />
                            </div>
                        </div>

                        <div className="flex-1 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 relative h-[72px] lg:h-[76px] flex flex-col justify-center box-border mt-1 lg:mt-0">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Penumpang</label>
                            <div className="flex items-center">
                                <Users className="text-slate-400 w-5 h-5 mr-2 shrink-0 hidden sm:block" />
                                <div className="flex justify-between items-center w-full">
                                    <button 
                                        type="button" 
                                        onClick={() => setPax(Math.max(1, pax - 1))} 
                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center justify-center p-0"
                                    >
                                        -
                                    </button>
                                    <span className="font-bold text-base text-slate-800 dark:text-white mx-2">{pax}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => setPax(Math.min(40, pax + 1))} 
                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center justify-center p-0"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Button */}
                    <Link 
                        href={destination ? `/pesan?asal=${origin}&tujuan=${destination}` : "/pesan"}
                        className="w-full lg:w-auto flex-shrink-0"
                    >
                        <Button className={`h-[72px] rounded-2xl text-lg font-bold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary w-full ${!compact ? 'lg:h-[76px] px-10' : ''}`}>
                            <Search className="mr-2" />
                            Cari Tiket
                        </Button>
                    </Link>

                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-medium text-slate-500">Pencarian Populer:</span>
                    <Link href="/pesan?asal=Tegal&tujuan=Jakarta" className="text-xs font-semibold text-primary hover:text-blue-700 transition-colors">
                        Tegal → Jakarta
                    </Link>
                    <Link href="/pesan?asal=Jakarta&tujuan=Tegal" className="text-xs font-semibold text-primary hover:text-blue-700 transition-colors">
                        Jakarta → Tegal
                    </Link>
                    <Link href="/pesan?asal=Tegal&tujuan=Bandung" className="text-xs font-semibold text-primary hover:text-blue-700 transition-colors">
                        Tegal → Bandung
                    </Link>
                    <Link href="/charter" className="text-xs font-semibold text-accent hover:text-amber-600 transition-colors">
                        Charter Bus
                    </Link>
                </div>
            </div>
        </div>
    );
}

