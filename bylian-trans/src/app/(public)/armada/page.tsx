import { constructMetadata } from "@/lib/metadata";
import { FLEET_INFO } from "@/data/bylian.data";
import { Bus, Users, Shield, Wifi, Coffee, Music, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const metadata = constructMetadata({
    title: "Varian Armada Bus",
    description: "Kenali fasilitas lengkap armada bus Super Eksekutif, Eksekutif, dan Bisnis AC PT Bylian Trans.",
});

export default function ArmadaPage() {
    return (
        <div className="pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Spesifikasi Armada</h1>
                    <p className="text-lg text-slate-600">
                        Perjalanan aman dan nyaman dengan armada bus terbaru berspesifikasi tinggi, dirancang untuk memanjakan istirahat Anda sepanjang perjalanan.
                    </p>
                </div>

                <div className="space-y-24">
                    {FLEET_INFO.map((armada, idx: number) => (
                        <div key={armada.id} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Image Section */}
                            <div className="w-full lg:w-1/2 relative">
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
                                    <Image src={armada.image} alt={armada.name} fill className="object-cover group-hover:scale-105 transition duration-700" sizes="(max-width: 768px) 100vw, 50vw" />

                                    {/* Floating Badge */}
                                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full font-black text-primary shadow-lg border border-white/50">
                                        {armada.name}
                                    </div>
                                </div>
                                {/* Decorative blob */}
                                <div className={`absolute -z-10 w-full h-full rounded-3xl bg-slate-100 ${idx % 2 !== 0 ? 'top-6 -left-6' : 'top-6 -right-6'}`} />
                            </div>

                            {/* Content Section */}
                            <div className="w-full lg:w-1/2">
                                <div className="mb-6">
                                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold tracking-wider uppercase mb-4">Kelas {armada.class}</span>
                                    <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mb-4">{armada.name} <span className="text-slate-400 font-light">|</span> {armada.capacity} Seat</h2>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        Perjalanan aman dan nyaman dengan armada bus berspesifikasi premium di kelasnya.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Konfigurasi Kursi</p>
                                        <p className="font-bold text-slate-800">{armada.layout}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Kapasitas Maksimal</p>
                                        <p className="font-bold text-slate-800">{armada.capacity} Penumpang</p>
                                    </div>
                                </div>

                                <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-primary" /> Fasilitas Lengkap
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {armada.facilities.map((f: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                            <span className="text-slate-700 font-medium">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
