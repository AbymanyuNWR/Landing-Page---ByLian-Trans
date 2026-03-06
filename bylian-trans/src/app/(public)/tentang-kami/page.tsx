import Image from "next/image";
import { constructMetadata } from "@/lib/metadata";
import { Building2, Users, ShieldCheck, Bus, Award, CheckCircle2 as CheckIcon } from "lucide-react";

export const metadata = constructMetadata({
    title: "Tentang Kami",
    description: "Pelajari lebih lanjut tentang PT Bylian Trans, operator bus kota dan pariwisata terkemuka di Kota Tegal yang berdedikasi melayani perjalanan Anda.",
});

export default function TentangKamiPage() {
    return (
        <div className="pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Mengenal Lebih Dekat <span className="text-primary">Bylian Trans</span></h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Berawal dari komitmen untuk menghubungkan Kota Tegal dengan berbagai destinasi, PT Bylian Trans telah berkembang menjadi mitra perjalanan terpercaya bagi ribuan penumpang.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    <div className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl">
                        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">Foto Kantor/Armada Bylian Trans</div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-800">Sejarah Singkat</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Didirikan di Kota Tegal, Jawa Tengah, PT Bylian Trans memulai perjalanannya dengan beberapa armada kecil. Seiring meningkatnya kepercayaan masyarakat terhadap layanan transportasi darat yang aman dan nyaman, kami terus melakukan ekspansi baik dalam hal kuantitas maupun kualitas armada.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Hari ini, Bylian Trans melayani berbagai rute Antar Kota Antar Provinsi (AKAP) dan menyediakan layanan sewa bus pariwisata dengan standar operasional yang mengutamakan keselamatan penumpang di atas segalanya.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                            <div>
                                <h3 className="text-4xl font-black text-primary mb-1">15+</h3>
                                <p className="font-semibold text-slate-700">Tahun Pengalaman</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-primary mb-1">5M+</h3>
                                <p className="font-semibold text-slate-700">Penumpang Dilayani</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visi Misi */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 mb-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-16 opacity-5 blur-xl">
                        <Bus className="w-96 h-96" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                        <div>
                            <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-6">
                                <TargetIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Menjadi perusahaan penyedia jasa transportasi darat terdepan di Indonesia yang inovatif, profesional, dan selalu memprioritaskan kenyamanan serta keselamatan penumpang.
                            </p>
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-6">
                                <RocketIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Misi Kami</h3>
                            <ul className="text-slate-300 space-y-3 list-none">
                                <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" /> Menyediakan armada bus modern yang terawat dengan baik.</li>
                                <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" /> Memberikan pelayanan pelanggan yang ramah, cepat, dan tanggap.</li>
                                <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" /> Menerapkan standar keselamatan berlalu lintas yang ketat.</li>
                                <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" /> Mengadopsi teknologi digital untuk kemudahan akses (Online Ticketing & Live GPS).</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-800">Nilai Perusahaan</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ValueCard icon={<ShieldCheck className="w-8 h-8" />} title="Safety First" desc="Keselamatan penumpang adalah prioritas mutlak di setiap perjalanan." />
                    <ValueCard icon={<Users className="w-8 h-8" />} title="Pelayanan Prima" desc="Keramahan staf dan awak bus untuk pengalaman perjalanan terbaik." />
                    <ValueCard icon={<Building2 className="w-8 h-8" />} title="Profesional" desc="Konsisten menjaga standar kualitas manajemen dan operasional." />
                    <ValueCard icon={<Award className="w-8 h-8" />} title="Inovasi" desc="Terus berinovasi dengan teknologi untuk kemudahan pelanggan." />
                </div>
            </div>
        </div>
    );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                {icon}
            </div>
            <h4 className="font-bold text-lg text-slate-800 mb-3">{title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

// Simple internal icons for Visi Misi
function TargetIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
}
function RocketIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
}
