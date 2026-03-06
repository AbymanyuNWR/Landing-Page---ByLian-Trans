"use client";

import { History } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface LogEvent {
    time: string;
    timestamp: Date;
    message: string;
}

export function TrackingHistory({ logs }: { logs?: LogEvent[] }) {
    const data = logs || [
        { time: "21:05 WIB", timestamp: new Date(), message: "Bus meninggalkan Rest Area KM 130." },
        { time: "20:30 WIB", timestamp: new Date(), message: "Bus tiba di Rest Area KM 130 untuk istirahat 30 menit." },
        { time: "19:00 WIB", timestamp: new Date(), message: "Bus berangkat dari Pool Tegal." },
    ];

    return (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 mt-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                <History className="w-4 h-4 text-slate-500" /> Riwayat Perjalanan
            </h3>
            <div className="space-y-4">
                {data.map((log, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="w-16 flex-shrink-0 text-right text-xs font-semibold text-slate-500 mt-0.5">
                            {log.time}
                        </div>
                        <div className="flex-1 text-sm text-slate-700 pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                            {log.message}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
