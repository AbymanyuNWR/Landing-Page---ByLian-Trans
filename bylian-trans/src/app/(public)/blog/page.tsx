import { constructMetadata } from "@/lib/metadata";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = constructMetadata({
    title: "Blog & Info Perjalanan",
    description: "Artikel terbaru, informasi wisata, dan panduan perjalanan bersama armada pt bylian trans.",
});

const ARTICLES = [
    { id: "1", title: "5 Tempat Wisata Hits di Bandung yang Bikin Betah", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop", date: "12 Okt 2024", category: "Wisata" },
    { id: "2", title: "Tips Aman dan Nyaman Perjalanan Jarak Jauh Naik Bus", image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=800&auto=format&fit=crop", date: "05 Okt 2024", category: "Tips" },
    { id: "3", title: "Bylian Trans Rilis Armada Baru 'Super Eksekutif 2-1'", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop", date: "28 Sep 2024", category: "Info Perusahaan" },
];

export default function BlogListPage() {
    return (
        <div className="pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Blog & Berita</h1>
                    <p className="text-lg text-slate-600">
                        Dapatkan informasi terbaru seputar perjalanan, rekomendasi wisata, promosi, dan kegiatan perusahaan.
                    </p>
                </div>

                {/* Featured Post */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all mb-12 flex flex-col md:flex-row group">
                    <div className="md:w-1/2 relative min-h-[300px] overflow-hidden">
                        <Image src={ARTICLES[2].image} alt="Featured" fill className="object-cover group-hover:scale-105 transition duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <span className="text-xs font-bold text-primary tracking-widest uppercase mb-4">{ARTICLES[2].category}</span>
                        <h2 className="text-3xl font-black text-slate-800 mb-4 leading-tight">{ARTICLES[2].title}</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            PT Bylian Trans secara resmi meluncurkan armada bus seri terbaru dengan konfigurasi kursi 2-1 Super Eksekutif demi meningkatkan kenyamanan ekstra.
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {ARTICLES[2].date}</span>
                            <Link href="/blog/armada-baru" className="font-bold text-primary hover:text-primary-dark transition flex items-center gap-1 text-sm">Baca Selengkapnya <ArrowRight className="w-4 h-4" /></Link>
                        </div>
                    </div>
                </div>

                {/* Grid Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ARTICLES.slice(0, 2).map((post) => (
                        <div key={post.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group">
                            <div className="relative h-56 overflow-hidden">
                                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition duration-700" sizes="(max-width: 1024px) 100vw, 33vw" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-[10px] font-bold text-slate-800 shadow-sm">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-slate-800 mb-3 leading-snug">{post.title}</h3>
                                <div className="flex items-center justify-between mt-auto pt-6">
                                    <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                                    <Link href={`/blog/post-${post.id}`} className="font-bold text-primary hover:text-primary-dark transition text-sm">Detail &rarr;</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
