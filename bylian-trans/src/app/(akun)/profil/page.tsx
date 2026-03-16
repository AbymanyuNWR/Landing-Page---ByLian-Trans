"use client";

import { UserCircle, Mail, Phone, MapPin, Save, Camera } from "lucide-react";

export default function ProfilPage() {
    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800">Profil Saya</h1>
                <p className="text-sm text-slate-500 mt-1">Kelola data pribadi dan preferensi akun Anda.</p>
            </div>

            {/* Profile Completion Indicator */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-6">
                <div className="flex justify-between items-end mb-3">
                    <div>
                        <h3 className="font-bold text-slate-800">Kelengkapan Profil</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Lengkapi profil Anda untuk mengklaim 500 Poin gratis.</p>
                    </div>
                    <span className="text-primary font-black text-xl">80%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full relative" style={{ width: '80%' }}>
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 animate-pulse"></div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-amber-400 rounded-full animate-pulse blur-sm opacity-50"></div>
                        <div className="w-24 h-24 bg-slate-200 rounded-full border-4 border-white shadow-md relative group overflow-hidden z-10">
                            <UserCircle className="w-full h-full text-slate-400" />
                            <button className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <Camera className="w-6 h-6 text-white scale-75 group-hover:scale-100 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Muhamad Budi</h2>
                        <p className="text-slate-500 text-sm">Member VIP</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-700 font-bold text-[10px] uppercase rounded mx-auto tracking-wider">
                            Platinum Sahaja
                        </span>
                    </div>
                </div>

                <form className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>
                            <input type="text" defaultValue="Muhamad Budi" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nomor Ponsel (WhatsApp)</label>
                            <input type="tel" defaultValue="081234567890" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Alamat Email</label>
                            <input type="email" defaultValue="budi@test.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary text-sm text-slate-500" disabled />
                            <p className="text-[10px] text-slate-400 mt-1">Email tidak dapat diubah.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nomor Identitas (NIK/Paspor)</label>
                            <input type="text" defaultValue="33280123456789" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Alamat Lengkap</label>
                            <textarea rows={3} defaultValue="Jl. Merdeka No. 123, Kel. Tegal Sari, Kec. Tegal Barat, Kota Tegal" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary text-sm"></textarea>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                        <button type="button" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm">
                            <Save className="w-4 h-4" /> Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
