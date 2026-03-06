"use client";

import { useState } from "react";
import { DataTable } from "@/components/features/admin/DataTable";
import { BookingDetailModal } from "@/components/features/admin/BookingDetailModal";
import { formatIDR } from "@/lib/utils";

const DUMMY_DATA = [
    { id: "BLT-A81JD9", date: "10 Okt 2024", time: "19:00", passenger: "Muhamad Budi", route: "Tegal - Jakarta", status: "LUNAS", amount: 150000 },
    { id: "BLT-X92KV1", date: "10 Okt 2024", time: "20:00", passenger: "Siti Aminah", route: "Jakarta - Tegal", status: "PENDING", amount: 210000 },
    { id: "BLT-C11MN4", date: "11 Okt 2024", time: "08:00", passenger: "Agus Santoso", route: "Tegal - Bandung", status: "BATAL", amount: 120000 },
];

export default function AdminBookingPage() {
    const [selectedBooking, setSelectedBooking] = useState<any>(null);

    const columns = [
        { header: "Kode Booking", accessor: "id", render: (val: string) => <span className="font-bold text-primary">{val}</span> },
        { header: "Waktu Keberangkatan", accessor: "date", render: (val: string, row: any) => <div><p className="font-medium">{val}</p><p className="text-xs text-slate-500">{row.time} WIB</p></div> },
        { header: "Pemesan", accessor: "passenger", render: (val: string) => <span className="font-semibold text-slate-700">{val}</span> },
        { header: "Rute", accessor: "route" },
        {
            header: "Status", accessor: "status", render: (val: string) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold ${val === 'LUNAS' ? 'bg-green-100 text-green-700' :
                        val === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                    }`}>
                    {val}
                </span>
            )
        },
        { header: "Nominal", accessor: "amount", render: (val: number) => <span className="font-medium">{formatIDR(val)}</span> },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Data Pemesanan</h1>
                    <p className="text-slate-500 text-sm mt-1">Kelola dan pantau seluruh transaksi masuk.</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 font-bold rounded-lg text-sm shadow-md transition-colors">
                    + Buat Pesanan Manual
                </button>
            </div>

            <div onClick={() => setSelectedBooking(DUMMY_DATA[0])} className="cursor-pointer">
                <DataTable columns={columns} data={DUMMY_DATA} searchPlaceholder="Cari kode booking, nama..." />
            </div>
            <p className="text-xs text-slate-400">Tips: Klik area tabel (dummy) di atas untuk melihat detail booking-Tegal-Jakarta.</p>

            <BookingDetailModal
                isOpen={!!selectedBooking}
                onClose={() => setSelectedBooking(null)}
                booking={selectedBooking}
            />
        </div>
    );
}
