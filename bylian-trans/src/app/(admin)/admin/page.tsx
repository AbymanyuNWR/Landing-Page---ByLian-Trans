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
                        {[
                            { rute: "Jakarta - Tegal (BYL-081)", waktu: "19:00 WIB • Eksekutif", isi: 32, total: 40, status: "SIAP" },
                            { rute: "Tegal - Bandung (BYL-075)", waktu: "20:00 WIB • Bisnis AC", isi: 15, total: 32, status: "SIAP" },
                            { rute: "Semarang - Tegal (BYL-092)", waktu: "21:30 WIB • Super Eks", isi: 20, total: 21, status: "PENUH" },
                        ].map((item, i) => {
                            const percent = Math.round((item.isi / item.total) * 100);
                            const percentColor = percent >= 90 ? "bg-red-500" : percent >= 60 ? "bg-amber-500" : "bg-green-500";
                            
                            return (
                                <div key={i} className="flex flex-col p-3 rounded-xl border border-slate-100 bg-slate-50/50 gap-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">{item.rute}</p>
                                            <p className="text-xs text-slate-500">{item.waktu}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                                item.status === 'SIAP' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Seat Fill Bar */}
                                    <div className="mt-1">
                                        <div className="flex justify-between text-[10px] font-bold mb-1">
                                            <span className="text-slate-500">Kapasitas Kursi</span>
                                            <span className={percent >= 90 ? "text-red-600" : "text-slate-700"}>{item.isi}/{item.total} Seat</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                            <div className={`h-full ${percentColor} rounded-full transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
