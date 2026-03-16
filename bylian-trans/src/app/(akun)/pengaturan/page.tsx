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
                    {/* Smooth Animated Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer group">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        {/* Track */}
                        <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:bg-primary transition-colors duration-300 ease-in-out shadow-inner"></div>
                        {/* Knob with tactile squish effect (peer-active stretch) */}
                        <div className="absolute left-1 top-1 bg-white border border-slate-200 w-6 h-6 rounded-full transition-all duration-300 cubic-bezier(0.4, 0.0, 0.2, 1) peer-checked:translate-x-6 peer-checked:border-white shadow-sm peer-active:w-8 peer-checked:peer-active:translate-x-4"></div>
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
                        {/* Track */}
                        <div className="w-14 h-8 bg-slate-200 rounded-full peer peer-checked:bg-slate-400 transition-colors duration-300"></div>
                        {/* Knob */}
                        <div className="absolute left-1 top-1 bg-white border border-slate-200 w-6 h-6 rounded-full transition-all duration-300 shadow-sm"></div>
                    </label>
                </div>
            </div>
        </div>
    );
}
