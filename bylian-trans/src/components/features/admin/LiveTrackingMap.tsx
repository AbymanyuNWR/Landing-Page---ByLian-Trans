"use client";

import { useEffect, useState } from "react";
import { Bus, Map as MapIcon, Navigation } from "lucide-react";

export function LiveTrackingMap() {
    const [buses, setBuses] = useState([
        { id: "BYL-001", status: "ON_ROUTE", speed: 65, route: "Tegal - Jakarta", lastUpdate: "Baru saja", position: { lat: -6.8694, lng: 109.1402 } },
        { id: "BYL-002", status: "REST", speed: 0, route: "Jakarta - Tegal", lastUpdate: "5 mnt lalu", position: { lat: -6.5, lng: 108.8 } },
        { id: "BYL-003", status: "MAINTENANCE", speed: 0, route: "-", lastUpdate: "1 jam lalu", position: { lat: -6.87, lng: 109.15 } },
    ]);

    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <MapIcon className="w-5 h-5 text-primary" /> Live Fleet Tracking
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Pantau seluruh armada yang sedang beroperasi.</p>
                </div>
                <div className="flex gap-2 text-xs font-semibold">
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full" /> Jalan ({buses.filter(b => b.status === 'ON_ROUTE').length})</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-amber-500 rounded-full" /> Istirahat ({buses.filter(b => b.status === 'REST').length})</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-400 rounded-full" /> Bengkel ({buses.filter(b => b.status === 'MAINTENANCE').length})</span>
                </div>
            </div>

            <div className="flex-1 min-h-[400px] relative bg-slate-100 flex items-center justify-center border-b border-slate-100 overflow-hidden">
                {/* Mock Map Background pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] [background-size:20px_20px]" />

                <div className="text-center z-10 text-slate-400">
                    <MapIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="font-semibold">Map View Component Placeholder</p>
                    <p className="text-sm">Integrasikan dengan Google Maps Maps JavaScript API</p>
                </div>

                {/* Dummy absolute markers just for visual representation of map markers */}
                <div className="absolute top-1/4 left-1/3 bg-green-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white animate-pulse">
                    <Navigation className="w-4 h-4 fill-white" />
                </div>
                <div className="absolute top-1/2 left-2/3 bg-amber-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                    <Bus className="w-4 h-4" />
                </div>
            </div>

            <div className="p-0 bg-white max-h-[250px] overflow-y-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase sticky top-0 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-3">Armada</th>
                            <th className="px-6 py-3">Rute Aktif</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Update</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {buses.map((bus) => (
                            <tr key={bus.id} className="hover:bg-slate-50 cursor-pointer transition">
                                <td className="px-6 py-3 font-bold text-slate-700">{bus.id}</td>
                                <td className="px-6 py-3 text-slate-600">{bus.route}</td>
                                <td className="px-6 py-3">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${bus.status === 'ON_ROUTE' ? 'bg-green-100 text-green-700' :
                                            bus.status === 'REST' ? 'bg-amber-100 text-amber-700' :
                                                'bg-slate-100 text-slate-600'
                                        }`}>
                                        {bus.status.replace("_", " ")}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-right text-xs text-slate-400">{bus.speed} km/j • {bus.lastUpdate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
