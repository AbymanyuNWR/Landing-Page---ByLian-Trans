import { constructMetadata } from "@/lib/metadata";
import { FLEET_INFO } from "@/data/bylian.data";
import { Bus, Users, ShieldCheck, Wifi, Coffee, Music, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = constructMetadata({
    title: "Varian Armada Bus Premium",
    description: "Kenali fasilitas lengkap armada bus Super Eksekutif, Eksekutif, dan Bisnis AC PT Bylian Trans.",
});

export default function ArmadaPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
            {/* Hero Banner */}
            <div className="relative bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 py-20 lg:py-28">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px]"></div>
                </div>
                
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/20">
                            <Bus className="w-4 h-4" />
                            KOLISI ARMADA KAMI
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                            Spesifikasi Armada{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400">
                                Premium
                            </span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                            Perjalanan aman dan nyaman dengan armada bus terbaru berspesifikasi tinggi, 
                            dirancang untuk memaksimal istirahat Anda sepanjang perjalanan.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 lg:py-24 max-w-7xl">
                <div className="space-y-20 lg:space-y-24">
                    {FLEET_INFO.map((armada, idx: number) => (
                        <div 
                            key={armada.id} 
                            className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                        >

                            {/* Image Section */}
                            <div className="w-full lg:w-1/2 relative">
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                                    <Image 
                                        src={armada.image} 
                                        alt={armada.name} 
                                        fill 
                                        className="object-cover group-hover:scale-105 transition duration-700" 
                                        sizes="(max-width: 768px) 100vw, 50vw" 
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                                    {/* Floating Badge */}
                                    <div className="absolute top-6 left-6">
                                        <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-lg border border-white/50">
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Kelas</p>
                                            <p className="font-bold text-primary">{armada.class}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Decorative blob */}
                                <div className={`absolute -z-10 w-[90%] h-[90%] rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 ${idx % 2 !== 0 ? 'top-4 -left-4' : 'top-4 -right-4'}`} />
                            </div>

                            {/* Content Section */}
                            <div className="w-full lg:w-1/2">
                                <div className="mb-6">
                                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">
                                        {armada.name}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                        Perjalanan aman dan nyaman dengan armada bus berspesifikasi premium di kelasnya. 
                                        Dilengkapi fasilitas modern untuk kenyamanan maksimal Anda.
                                    </p>
                                </div>

                                {/* Quick Specs */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Konfigurasi Kursi</p>
                                        <p className="font-bold text-slate-800 dark:text-white text-lg">{armada.layout}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Kapasitas</p>
                                        <p className="font-bold text-slate-800 dark:text-white text-lg">{armada.capacity} Kursi</p>
                                    </div>
                                </div>

                                {/* Facilities */}
                                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-primary" /> 
                                    Fasilitas Lengkap
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                    {armada.facilities.map((f: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                                            </div>
                                            <span className="text-slate-700 dark:text-slate-300 font-medium">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link href={`/pesan`}>
                                    <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300">
                                        Pesan {armada.class} 
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>

                {/* CTA Banner */}
                <div className="mt-20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10">
                        <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-4">
                            Ingin Perjalanan Eksklusif?
                        </h3>
                        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                            Kami juga menyediakan layanan charter bus untuk perjalanan kelompok, keluarga, atau karyawan perusahaan. 
                            Hubungi kami untuk informasi lebih lanjut.
                        </p>
                        <Link href="/charter">
                            <Button className="h-12 px-8 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-semibold shadow-lg">
                                Lihat Layanan Charter
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

