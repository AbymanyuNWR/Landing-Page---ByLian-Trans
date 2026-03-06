"use client";

import { CheckCircle2, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stop {
    city: string;
    isPassed: boolean;
    isCurrent: boolean;
    estTime: string;
    isRestArea?: boolean;
}

export function RouteProgress({ stops }: { stops: Stop[] }) {
    // Dummy data if not provided
    const data = stops || [
        { city: "Tegal (Pool)", isPassed: true, isCurrent: false, estTime: "19:00" },
        { city: "Brebes Timur (Tol)", isPassed: true, isCurrent: false, estTime: "19:30" },
        { city: "Rest Area KM 130", isPassed: true, isCurrent: true, estTime: "21:00", isRestArea: true },
        { city: "Bekasi Timur", isPassed: false, isCurrent: false, estTime: "22:30" },
        { city: "Jakarta (Pulo Gebang)", isPassed: false, isCurrent: false, estTime: "23:00" },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6 text-slate-800">Progres Rute</h3>
            <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
                {data.map((stop, i) => (
                    <div key={i} className="relative pl-8">
                        {/* Dots/Icons on the line */}
                        <div className={cn(
                            "absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center bg-white border-2",
                            stop.isCurrent ? "border-primary text-primary shadow-md" :
                                stop.isPassed ? "border-[#16a34a] text-[#16a34a]" : "border-slate-200 text-slate-300"
                        )}>
                            {stop.isCurrent ? <Navigation className="w-4 h-4 fill-primary" /> :
                                stop.isPassed ? <CheckCircle2 className="w-5 h-5" /> :
                                    <MapPin className="w-4 h-4" />}
                        </div>

                        <div>
                            <h4 className={cn(
                                "font-bold text-sm",
                                stop.isCurrent ? "text-primary" :
                                    stop.isPassed ? "text-slate-700" : "text-slate-400"
                            )}>
                                {stop.city}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">Est. {stop.estTime}</p>
                            {stop.isRestArea && (
                                <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-200">REST AREA</span>
                            )}
                        </div>
                    </div>
                ))}
                {/* Dynamic completed line background trick */}
                <div className="absolute top-0 left-[-2px] bottom-0 w-[2px] bg-gradient-to-b from-[#16a34a] to-primary overflow-hidden" style={{ height: "50%" }}></div>
            </div>
        </div>
    );
}
