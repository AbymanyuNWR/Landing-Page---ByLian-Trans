"use client";

import Link from "next/link";
import { Mail, Lock, User, Phone } from "lucide-react";

export default function DaftarPage() {
    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-slate-800 mb-2">Buat Akun Baru</h1>
                <p className="text-slate-500 text-sm">Daftar untuk menikmati berbagai fitur eksklusif pelanggan.</p>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>
                    <div className="relative">
                        <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Sesuai KTP"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">No. WhatsApp</label>
                    <div className="relative">
                        <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="tel"
                            placeholder="0812xxxx"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Alamat Email</label>
                    <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="email"
                            placeholder="nama@email.com"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                    <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="password"
                            placeholder="Minimal 8 karakter"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all mt-6"
                >
                    Daftar Sekarang
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600">
                Sudah punya akun? <Link href="/masuk" className="font-bold text-primary hover:underline">Masuk di sini</Link>
            </div>
        </>
    );
}
