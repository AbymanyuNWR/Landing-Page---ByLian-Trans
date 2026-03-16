import Link from "next/link";
import { Compass, Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-slate-50">
            <div className="relative">
                <div className="text-[12rem] md:text-[16rem] font-black text-slate-200 tracking-tighter leading-none select-none">
                    404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-xl flex items-center justify-center -translate-y-4">
                        <Compass className="w-16 h-16 md:w-20 md:h-20 text-primary animate-[spin_4s_linear_infinite]" />
                    </div>
                </div>
            </div>

            <h2 className="text-3xl font-black text-slate-800 mt-8 mb-3 text-center tracking-tight">Tersesat di Terminal?</h2>
            <p className="text-slate-500 text-center max-w-md mb-10">
                Halaman atau rute tiket yang Anda cari mungkin sudah kedaluwarsa, ditarik, atau Anda salah memasukkan alamat URL.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                >
                    <Home className="w-5 h-5" /> Kembali ke Beranda
                </Link>
                <Link
                    href="/pesan"
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-3.5 px-8 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                    <Search className="w-5 h-5 text-slate-400" /> Cari Tiket Baru
                </Link>
            </div>
        </div>
    );
}
