"use client";

import { Send, Image as ImageIcon, Users, MessageSquare } from "lucide-react";

export function NotificationBlast() {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 bg-slate-50 mb-6">
                <h2 className="text-xl font-bold text-slate-800">Kirim Notifikasi Blast</h2>
                <p className="text-sm text-slate-500 mt-1">Kirim pesan massal via WhatsApp atau Email mengenai promo atau info operasional.</p>
            </div>

            <form className="p-6 pt-0 space-y-6 max-w-2xl">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Target Penerima</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                                <input type="radio" name="target" className="text-primary focus:ring-primary" defaultChecked />
                                <span className="text-sm font-medium">Semua Member</span>
                            </label>
                            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                                <input type="radio" name="target" className="text-primary focus:ring-primary" />
                                <span className="text-sm font-medium">Platinum Sahaja</span>
                            </label>
                            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                                <input type="radio" name="target" className="text-primary focus:ring-primary" />
                                <span className="text-sm font-medium">Rute Tegal-BDG</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Platform</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" defaultChecked />
                                <span className="text-sm">WhatsApp</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" defaultChecked />
                                <span className="text-sm">Email</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Isi Pesan</label>
                        <textarea
                            rows={5}
                            className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Ketik pesan promosi atau pemberitahuan di sini..."
                        ></textarea>
                        <p className="text-[10px] text-slate-400 mt-1">Gunakan {'{{nama}}'} untuk memanggil nama penerima otomatis.</p>
                    </div>

                    <div className="border border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition cursor-pointer">
                        <ImageIcon className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-600">Klik untuk unggah gambar/flyer</p>
                        <p className="text-xs text-slate-400 mt-1">Ekstensi .JPG, .PNG maksimal 2MB (Hanya untuk WhatsApp)</p>
                    </div>
                </div>

                <button type="button" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 w-full sm:w-auto mt-8">
                    <Send className="w-4 h-4" /> Blast Sekarang (± 250 Penerima)
                </button>
            </form>
        </div>
    );
}
