"use client";

import { DataTable } from "@/components/features/admin/DataTable";
import { AlertTriangle } from "lucide-react";

const DUMMY_FLEET = [
    { id: "BYL-081", nopol: "G 1234 xx", kelas: "Eksekutif", tipe: "Hino RK8", status: "BEROPERASI" },
    { id: "BYL-082", nopol: "G 1235 xx", kelas: "Super Eksekutif", tipe: "Mercedes-Benz OH 1626", status: "BEROPERASI" },
    { id: "BYL-083", nopol: "G 1236 xx", kelas: "Pariwisata", tipe: "Hino RN285", status: "PARKIR" },
    { id: "BYL-075", nopol: "B 7777 xx", kelas: "Bisnis AC", tipe: "Mercedes-Benz OF 1623", status: "MAINTENANCE" },
];

export default function AdminArmadaPage() {
    const columns = [
        { header: "Kode Unit", accessor: "id", render: (val: string) => <span className="font-bold text-slate-800">{val}</span> },
        { header: "Plat Nomor (Nopol)", accessor: "nopol", render: (val: string) => <span className="font-mono bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">{val}</span> },
        { header: "Kelas Layanan", accessor: "kelas", render: (val: string) => <span className="text-primary font-bold">{val}</span> },
        { header: "Mesin & Karoseri", accessor: "tipe" },
        {
            header: "Kondisi", accessor: "status", render: (val: string) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold ${val === 'BEROPERASI' ? 'bg-green-100 text-green-700' :
                        val === 'PARKIR' ? 'bg-slate-200 text-slate-700' :
                            'bg-amber-100 text-amber-700'
                    }`}>
                    {val}
                </span>
            )
        },
    ];

    const maintenanceBuses = DUMMY_FLEET.filter(b => b.status === "MAINTENANCE");

    return (
        <div className="space-y-6">
            {/* Warning Banner */}
            {maintenanceBuses.length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-pulse shadow-sm shadow-red-100">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-bold">
                        Peringatan: {maintenanceBuses.length} Unit Bus (Kode: {maintenanceBuses.map(b => b.id).join(", ")}) terdeteksi sedang menunggu Perbaikan/Maintenance! Segera keluarkan dari jadwal aktif.
                    </p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Manajemen Armada</h1>
                    <p className="text-slate-500 text-sm mt-1">Data master seluruh unit kendaraan bus perusahaan.</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 font-bold rounded-lg text-sm shadow-md transition-colors">
                    + Registrasi Bus Baru
                </button>
            </div>

            <DataTable columns={columns} data={DUMMY_FLEET} searchPlaceholder="Cari kode unit, plat nomor..." />
        </div>
    );
}
