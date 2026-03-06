"use client";

import { useState } from "react";
import { TrackingInput } from "@/components/features/tracking/TrackingInput";
import { TrackingMap } from "@/components/features/tracking/TrackingMap";
import { BusInfoPanel } from "@/components/features/tracking/BusInfoPanel";
import { RouteProgress } from "@/components/features/tracking/RouteProgress";
import { Bus, MapPin, AlertCircle } from "lucide-react";

export default function TrackingPage() {
    const [isTracking, setIsTracking] = useState(false);
    const [trackingCode, setTrackingCode] = useState("");

    const handleSearch = (code: string) => {
        setTrackingCode(code);
        setIsTracking(true);
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Lacak Perjalanan</h1>
                    <p className="text-lg text-slate-600">
                        Ketahui lokasi terkini bus Anda secara real-time. Masukkan Kode Booking atau Nomor Bus untuk memulai pelacakan.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto mb-12">
                    <TrackingInput onSearch={handleSearch} />
                </div>

                {isTracking ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-10 flex-col-reverse lg:flex-row">

                        <div className="lg:col-span-1 space-y-6">
                            <BusInfoPanel status={{
                                busId: "BYL-081",
                                speed: 72,
                                driver: "Ahmad",
                                estArrival: "04:30 WIB",
                                position: "Tol Cipali KM 110",
                                nextStop: "Rest Area KM 166"
                            }} />

                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Rute Perjalanan</h3>
                                <RouteProgress />
                            </div>
                        </div>

                        <div className="lg:col-span-2 h-[500px] lg:h-auto rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
                            <TrackingMap />
                        </div>

                    </div>
                ) : (
                    <div className="text-center p-16 bg-white rounded-3xl border border-slate-200 border-dashed text-slate-400">
                        <Bus className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Silakan masukkan kode pelacakan di atas untuk melihat posisi bus.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
