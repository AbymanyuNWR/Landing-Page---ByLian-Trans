"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function MasukPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-slate-800 mb-2">Selamat Datang Kembali!</h1>
                <p className="text-slate-500 text-sm">Silakan masuk menggunakan email dan password Anda.</p>
            </div>

            <form className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Alamat Email</label>
                    <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="email"
                            placeholder="nama@email.com"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-sm font-semibold text-slate-700">Password</label>
                        <Link href="/lupa-password" className="text-xs font-bold text-primary hover:underline">Lupa Password?</Link>
                    </div>
                    <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all mt-4"
                >
                    Masuk ke Akun
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600">
                Belum punya akun? <Link href="/daftar" className="font-bold text-primary hover:underline">Daftar Sekarang</Link>
            </div>
        </>
    );
}
