import { StatsCard } from "@/components/features/admin/StatsCard";
import { RevenueChart, RouteChart } from "@/components/features/admin/RevenueChart";
import { Users, Ticket, Bus, TrendingUp, CalendarDays } from "lucide-react";

export default function AdminOverviewPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Dashboard Utama</h1>
                    <p className="text-slate-500 text-sm mt-1">Ringkasan performa operasional dan finansial.</p>
                </div>
                <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden text-sm font-medium">
                    <button className="px-4 py-2 bg-slate-100 text-primary">Hari Ini</button>
                    <button className="px-4 py-2 hover:bg-slate-50 text-slate-600 border-l border-slate-200">Minggu Ini</button>
                    <button className="px-4 py-2 hover:bg-slate-50 text-slate-600 border-l border-slate-200">Bulan Ini</button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Pemesanan"
                    value="145"
                    icon={<Ticket className="w-5 h-5" />}
                    trend={{ value: "12%", isPositive: true }}
                />
                <StatsCard
                    title="Pendapatan (Rp)"
                    value="24.5M"
                    icon={<TrendingUp className="w-5 h-5" />}
                    trend={{ value: "8.4%", isPositive: true }}
                />
                <StatsCard
                    title="Armada Beroperasi"
                    value="18/24"
                    icon={<Bus className="w-5 h-5" />}
                />
                <StatsCard
                    title="Penumpang Baru"
                    value="28"
                    icon={<Users className="w-5 h-5" />}
                    trend={{ value: "4%", isPositive: false }}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>
                <div className="lg:col-span-1">
                    <RouteChart />
                </div>
            </div>

            {/* Quick Action & Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-primary" /> Keberangkatan Terdekat (Hari Ini)
                    </h3>
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">Jakarta - Tegal (BYL-08{i})</p>
                                    <p className="text-xs text-slate-500">19:00 WIB • Eksekutif</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-primary text-sm">32/40 Seat</p>
                                    <span className="text-[10px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded">SIAP</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
