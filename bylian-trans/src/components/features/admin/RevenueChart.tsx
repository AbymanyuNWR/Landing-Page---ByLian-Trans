"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const dummyRevenueData = [
    { name: 'Sen', total: 4500000 },
    { name: 'Sel', total: 5200000 },
    { name: 'Rab', total: 4800000 },
    { name: 'Kam', total: 6100000 },
    { name: 'Jum', total: 8500000 },
    { name: 'Sab', total: 12400000 },
    { name: 'Min', total: 11200000 },
];

const dummyRouteData = [
    { name: 'Tegal-Jakarta', tiket: 120 },
    { name: 'Tegal-Bandung', tiket: 85 },
    { name: 'Tegal-Semarang', tiket: 65 },
    { name: 'Jakarta-Tegal', tiket: 110 },
];

export function RevenueChart() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full h-80">
            <h3 className="font-bold text-slate-800 mb-6 flex justify-between">
                Pendapatan Mingguan
                <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded">Dalam Rupiah</span>
            </h3>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={dummyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `${value / 1000000}M`} />
                    <Tooltip
                        formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="total" stroke="#1d4ed8" strokeWidth={3} dot={{ r: 4, fill: '#1d4ed8', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export function RouteChart() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full h-80">
            <h3 className="font-bold text-slate-800 mb-6">Popularitas Rute</h3>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={dummyRouteData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} interval={0} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip
                        cursor={{ fill: '#f1f5f9' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="tiket" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
