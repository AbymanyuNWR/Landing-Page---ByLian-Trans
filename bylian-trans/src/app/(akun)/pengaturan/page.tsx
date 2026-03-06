"use client";

import { Lock, Bell, Moon, SwitchCamera } from "lucide-react";

export default function PengaturanAkunPage() {
    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800">Pengaturan</h1>
                <p className="text-sm text-slate-500 mt-1">Atur preferensi akun dan aplikasi Anda.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm">Ubah Password</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Perbarui kata sandi akun Anda secara berkala</p>
                        </div>
                    </div>
                    <button className="text-primary font-bold text-sm">Ubah</button>
                </div>

                <div className="p-6 border-b border-slate-100 flex items-center justify-between hover:bg-slate-50 transition">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm">Notifikasi WhatsApp</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Terima info tiket dan promo via WA</p>
                        </div>
                    </div>
                    {/* simple toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                            <Moon className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm">Mode Gelap (Dark Mode)</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Sesuaikan tampilan antarmuka (Segera Hadir)</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-not-allowed opacity-50">
                        <input type="checkbox" className="sr-only peer" disabled />
                        <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-slate-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5"></div>
                    </label>
                </div>
            </div>
        </div>
    );
}
