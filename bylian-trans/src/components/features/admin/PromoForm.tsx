"use client";

import { useState } from "react";
import { Tag, Calendar, Percent, Save } from "lucide-react";

export function PromoForm() {
    return (
        <form className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-3xl">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <Tag className="w-5 h-5 text-primary" /> Buat Promo Baru
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kode Promo</label>
                        <input
                            type="text"
                            placeholder="Contoh: MERDEKA79"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary uppercase font-mono tracking-widest"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tipe Diskon</label>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button type="button" className="flex-1 py-1.5 bg-white shadow-sm rounded-lg text-sm font-bold text-slate-800">Persentase (%)</button>
                            <button type="button" className="flex-1 py-1.5 text-slate-500 rounded-lg text-sm font-medium hover:text-slate-700">Nominal (Rp)</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nilai Diskon</label>
                        <div className="relative">
                            <Percent className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="number"
                                placeholder="20"
                                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Masa Berlaku</label>
                        <div className="flex items-center gap-2">
                            <input type="date" className="flex-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                            <span className="text-slate-400">-</span>
                            <input type="date" className="flex-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kuota Promo</label>
                        <input
                            type="number"
                            placeholder="Batas penggunaan (0 = Tanpa Batas)"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Berlaku Untuk Rute</label>
                        <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white text-sm">
                            <option>Semua Rute</option>
                            <option>Hanya Tegal - Jakarta</option>
                            <option>Hanya Tegal - Bandung</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-6 flex justify-end gap-3">
                <button type="button" className="px-6 py-2.5 rounded-xl font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl font-bold bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 flex items-center gap-2 transition">
                    <Save className="w-4 h-4" /> Simpan Promo
                </button>
            </div>
        </form>
    );
}
