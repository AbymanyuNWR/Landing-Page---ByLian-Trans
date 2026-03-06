"use client";

import { LiveTrackingMap } from "@/components/features/admin/LiveTrackingMap";

export default function AdminTrackingPage() {
    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Live Fleet Monitoring</h1>
                    <p className="text-slate-500 text-sm mt-1">Pantau seluruh pergerakan armada secara real-time dari GPS.</p>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <LiveTrackingMap />
            </div>
        </div>
    );
}
