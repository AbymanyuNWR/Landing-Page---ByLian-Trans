import { constructMetadata } from "@/lib/metadata";
import { DUMMY_ROUTES } from "@/data/bylian.data";
import { formatIDR } from "@/lib/utils";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = constructMetadata({
    title: "Rute & Harga Tiket",
    description: "Daftar lengkap rute perjalanan Antar Kota Antar Provinsi (AKAP) PT Bylian Trans beserta harga tiket terbaru.",
});

export default function RuteHargaPage() {
    return (
        <div className="pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Rute & Harga Tiket</h1>
                    <p className="text-lg text-slate-600">
                        Temukan rute perjalanan Anda bersama Bylian Trans. Harga terjangkau dengan kelas armada premium.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {DUMMY_ROUTES.map((rute) => (
                        <div key={rute.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="relative h-48 bg-slate-200 overflow-hidden">
                                <Image src={"/images/placeholder.jpg"} alt={`${rute.origin} ke ${rute.destination}`} fill className="object-cover group-hover:scale-110 transition duration-700" sizes="(max-width: 1024px) 100vw, 33vw" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                                    <div className="flex items-center gap-2 font-bold text-lg">
                                        <span>{rute.origin}</span>
                                        <ArrowRight className="w-4 h-4 text-primary" />
                                        <span>{rute.destination}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-100">
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Kelas Armada</p>
                                        <p className="font-bold text-slate-800">{rute.busClass.replace('_', ' ')}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Estimasi Waktu</p>
                                        <p className="font-bold text-slate-800">{rute.duration}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-xs text-slate-500 font-semibold mb-3 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Titik Penjemputan Utama</p>
                                    <ul className="space-y-2 text-sm text-slate-700">
                                        {["Terminal Induk", "Agen Pusat"].map((titik: string, i: number) => (
                                            <li key={i} className="flex gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-1.5" />
                                                <span className="line-clamp-1">{titik}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex items-end justify-between pt-2">
                                    <div>
                                        <p className="text-xs text-slate-500 mb-0.5">Mulai dari</p>
                                        <p className="text-2xl font-black text-primary">{formatIDR(rute.price)}</p>
                                    </div>
                                    <Link
                                        href={`/pesan?origin=${rute.origin}&destination=${rute.destination}`}
                                        className="bg-slate-100 text-slate-800 hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl font-bold transition-colors text-sm"
                                    >
                                        Pesan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Tambahan */}
                <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-6 md:p-8">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Catatan Penting</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-blue-800/80">
                        <li>Harga tiket yang tertera dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya, terutama pada masa High Season (Lebaran, Natal, Tahun Baru).</li>
                        <li>Tiket anak usia &gt; 3 tahun wajib membayar penuh.</li>
                        <li>Jadwal keberangkatan dapat disesuaikan bergantung pada kondisi lalu lintas dan cuaca.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
