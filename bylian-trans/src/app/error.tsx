"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Option to log the error to an error reporting service here
        console.error("Global Application Error:", error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">Sistem Mengalami Kendala Internal</h2>
                <p className="text-slate-500 mb-8 text-sm">
                    Mohon maaf, terjadi kesalahan tidak terduga pada server kami. Tim teknis sedang menangani isu ini.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => reset()}
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        <RefreshCcw className="w-4 h-4" /> Coba Muat Ulang
                    </button>
                    <Link
                        href="/"
                        className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-4 h-4" /> Ke Beranda
                    </Link>
                </div>
                
                {process.env.NODE_ENV === "development" && (
                    <div className="mt-8 p-4 bg-slate-900 rounded-xl text-left overflow-x-auto">
                        <p className="text-red-400 font-mono text-[10px] whitespace-pre-wrap">{error.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
