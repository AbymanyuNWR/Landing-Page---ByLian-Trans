"use client";

import { useState } from "react";
import { TicketCard } from "@/components/features/ticket/TicketCard";
import { Calendar, Filter } from "lucide-react";

const DUMMY_TICKETS = [
    { id: "BLT-A81JD9", date: "10 Okt 2024", time: "19:00 WIB", route: "Tegal - Jakarta", status: "AKTIF" as const, bus: "Eksekutif (BYL-081)", seat: "1A" },
    { id: "BLT-X92KV1", date: "05 Okt 2024", time: "20:00 WIB", route: "Jakarta - Tegal", status: "SELESAI" as const, bus: "Super Eksekutif", seat: "2C" },
    { id: "BLT-C11MN4", date: "15 Sep 2024", time: "08:00 WIB", route: "Tegal - Bandung", status: "BATAL" as const, bus: "Bisnis AC", seat: "4B" },
];

export default function TiketSayaPage() {
    const [filter, setFilter] = useState<"SEMUA" | "AKTIF" | "SELESAI" | "BATAL">("SEMUA");

    const filteredTickets = DUMMY_TICKETS.filter(t => filter === "SEMUA" || t.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Tiket Saya</h1>
                    <p className="text-sm text-slate-500 mt-1">Daftar perjalanan Anda bersama Bylian Trans.</p>
                </div>

                <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-white text-sm font-medium shrink-0">
                    {["SEMUA", "AKTIF", "SELESAI", "BATAL"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab as any)}
                            className={`px-4 py-2 hover:bg-slate-50 transition ${filter === tab ? 'bg-primary text-white hover:bg-primary' : 'text-slate-600 border-l border-slate-200 first:border-l-0'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {filteredTickets.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}

                {filteredTickets.length === 0 && (
                    <div className="text-center p-16 bg-white rounded-3xl border border-slate-200 border-dashed text-slate-400">
                        <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium text-slate-500">Belum ada tiket.</p>
                        <p className="text-sm">Yuk, rencanakan perjalanan Anda sekarang!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
