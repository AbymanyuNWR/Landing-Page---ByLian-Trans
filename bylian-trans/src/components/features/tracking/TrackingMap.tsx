"use client";

import { useEffect, useState } from "react";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { BusStatus } from "@/types";

interface TrackingMapProps {
    locations?: { lat: number, lng: number }[];
    currentLocation?: { lat: number, lng: number };
}

export function TrackingMap({ locations = [], currentLocation = { lat: -6.8694, lng: 109.1402 } }: TrackingMapProps) {
    const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!mapKey) {
        return (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center flex-col text-slate-400 p-8 rounded-2xl border-2 border-dashed border-slate-200">
                <MapIcon className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-semibold text-center">Peta tidak tersedia.</p>
                <p className="text-xs text-center max-w-sm mt-2">API Key Google Maps belum dikonfigurasi pada environment file (.env).</p>
            </div>
        );
    }

    // Uses Vis.gl wrapper for Google Maps
    return (
        <div className="w-full h-full relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <Map
                defaultZoom={11}
                defaultCenter={currentLocation}
                mapId="bylian-tracking-map"
                disableDefaultUI={true}
            >
                <AdvancedMarker position={currentLocation}>
                    <div className="bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white relative animate-pulse-ring">
                        <BusIcon className="w-5 h-5" />
                        {/* Small triangle below for pin effect */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-primary border-r-[6px] border-r-transparent"></div>
                    </div>
                </AdvancedMarker>
            </Map>
        </div>
    );
}

function MapIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" x2="9" y1="3" y2="18" /><line x1="15" x2="15" y1="6" y2="21" /></svg>;
}

function BusIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v6" /><path d="M15 6v6" /><path d="M2 12h19.6" /><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>;
}
