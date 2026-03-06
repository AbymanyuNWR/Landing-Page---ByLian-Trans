"use client";

import { DataTable } from "@/components/features/admin/DataTable";

const DUMMY_SCHEDULES = [
    { id: "JDW-001", rute: "Tegal - Jakarta", armada: "BYL-081 (Eksekutif)", jam: "19:00", supir: "Ahmad", status: "AKTIF", kursi: "32/40" },
    { id: "JDW-002", rute: "Jakarta - Tegal", armada: "BYL-082 (Super Eks)", jam: "20:00", supir: "Budi", status: "AKTIF", kursi: "15/21" },
    { id: "JDW-003", rute: "Tegal - Bandung", armada: "BYL-075 (Bisnis AC)", jam: "08:00", supir: "Anton", status: "DIBATALKAN", kursi: "0/32" },
];

export default function AdminJadwalPage() {
    const columns = [
        { header: "ID Jadwal", accessor: "id", render: (val: string) => <span className="font-bold text-primary">{val}</span> },
        { header: "Rute Perjalanan", accessor: "rute", render: (val: string) => <span className="font-semibold text-slate-700">{val}</span> },
        { header: "Armada Bus", accessor: "armada" },
        { header: "Keberangkatan", accessor: "jam", render: (val: string) => <span className="font-medium bg-slate-100 px-2 py-1 rounded">{val} WIB</span> },
        { header: "Supir/Kru", accessor: "supir" },
        { header: "Terisi", accessor: "kursi", render: (val: string) => <span className="text-secondary font-bold">{val}</span> },
        {
            header: "Status", accessor: "status", render: (val: string) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold ${val === 'AKTIF' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {val}
                </span>
            )
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Manajemen Jadwal</h1>
                    <p className="text-slate-500 text-sm mt-1">Atur jadwal keberangkatan harian dan rotasi armada.</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 font-bold rounded-lg text-sm shadow-md transition-colors">
                    + Tambah Jadwal Baru
                </button>
            </div>

            <DataTable columns={columns} data={DUMMY_SCHEDULES} searchPlaceholder="Cari jadwal, rute, armada..." />
        </div>
    );
}
