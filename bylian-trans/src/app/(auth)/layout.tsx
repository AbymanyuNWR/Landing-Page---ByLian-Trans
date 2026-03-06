import Link from "next/link";
import { ArrowLeft, Bus } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center relative z-10 bg-white shadow-2xl shrink-0">
                <div className="absolute top-6 left-6 z-20">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl">
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
                    </Link>
                </div>

                <div className="w-full max-w-sm mt-12 md:mt-0">
                    <div className="flex items-center justify-center gap-3 mb-10">
                        <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                            <Bus className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">Bylian</h2>
                            <p className="text-primary font-bold text-sm tracking-widest uppercase">Trans</p>
                        </div>
                    </div>

                    {children}
                </div>
            </div>

            <div className="hidden md:block md:w-1/2 relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                <div className="absolute bottom-16 left-16 right-16 text-white font-medium">
                    <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">Perjalanan Mewah,<br />Harga Terjangkau.</h1>
                    <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                        Bergabunglah menjadi member Bylian Trans untuk menikmati promo khusus, pengumpulan poin, dan kemudahan mengatur tiket perjalanan Anda.
                    </p>
                </div>
            </div>
        </div>
    );
}
