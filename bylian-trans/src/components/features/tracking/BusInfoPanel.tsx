"use client";

import { Bus, Map, Clock, Gauge, User } from "lucide-react";
import { BusStatus } from "@/types";

export function BusInfoPanel({ status }: { status: any }) {
    if (!status) return null;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                    <h3 className="font-black text-lg text-slate-800 flex items-center gap-2">
                        <Bus className="w-5 h-5 text-primary" /> {status.busName}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500 mt-1">{status.licensePlate} • {status.busClass}</p>
                </div>
                <div className="text-right">
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-green-200 animate-pulse">
                        {status.statusText || "Berjalan Normal"}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                    <div className="bg-slate-50 p-2 rounded-lg text-slate-500"><Gauge className="w-5 h-5" /></div>
                    <div>
                        <p className="text-xs text-slate-500 mb-0.5">Kecepatan</p>
                        <p className="font-bold text-slate-800">{Math.round(status.speed || 60)} km/j</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="bg-slate-50 p-2 rounded-lg text-slate-500"><Clock className="w-5 h-5" /></div>
                    <div>
                        <p className="text-xs text-slate-500 mb-0.5">Sisa Waktu</p>
                        <p className="font-bold text-slate-800">{status.estRemaining || "1J 30M"}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="bg-slate-50 p-2 rounded-lg text-slate-500"><Map className="w-5 h-5" /></div>
                    <div>
                        <p className="text-xs text-slate-500 mb-0.5">Sisa Jarak</p>
                        <p className="font-bold text-slate-800">{status.distRemaining || "85"} km</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="bg-slate-50 p-2 rounded-lg text-slate-500"><User className="w-5 h-5" /></div>
                    <div>
                        <p className="text-xs text-slate-500 mb-0.5">Pengemudi</p>
                        <p className="font-bold text-slate-800">{status.driverName || "Supir 1"}</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                Update terakhir: {new Date(status.lastUpdate || Date.now()).toLocaleTimeString('id-ID')} WIB
            </div>
        </div>
    );
}
