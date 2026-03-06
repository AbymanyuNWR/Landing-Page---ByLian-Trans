import { generateMetadata } from "@/lib/metadata";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import { getWhatsAppCsUrl } from "@/lib/whatsapp";

export const metadata = generateMetadata({
    title: "Hubungi Kami",
    description: "Kontak layanan pelanggan PT Bylian Trans. Alamat pool, nomor WhatsApp, email, dan sosial media lengkap.",
    path: "/kontak",
});

export default function KontakPage() {
    return (
        <div className="pt-24 pb-20 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Hubungi Kami</h1>
                    <p className="text-lg text-slate-600">
                        Tim layanan pelanggan kami siap membantu Anda setiap hari. Jangan ragu untuk menghubungi kami jika ada pertanyaan atau kendala.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-5">
                            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                                <MapPin className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-800 mb-2">Kantor Pusat & Pool Utama</h3>
                                <p className="text-slate-600 leading-relaxed mb-4">Jl. Dr. Wahidin Sudirohusodo No.45, Pesurungan Kidul, Kec. Tegal Bar., Kota Tegal, Jawa Tengah 52111</p>
                                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-sm font-bold text-primary hover:underline">Lihat di Google Maps &rarr;</a>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-5">
                            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                                <Phone className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-800 mb-2">Layanan Pelanggan (24/7)</h3>
                                <p className="text-slate-600 mb-2 font-medium">0812-3456-7890 (WhatsApp Ticketing)</p>
                                <p className="text-slate-600 mb-4 font-medium">(0283) 345678 (Telepon Kantor)</p>
                                <a href={getWhatsAppCsUrl()} target="_blank" rel="noreferrer" className="inline-block bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-[#20bd5a] transition text-sm">Chat via WhatsApp</a>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-5">
                            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                                <Mail className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-800 mb-2">Bantuan & Kemitraan</h3>
                                <p className="text-slate-600 mb-4 font-medium">cs@byliantrans.com</p>
                                <a href="mailto:cs@byliantrans.com" className="text-sm font-bold text-amber-600 hover:underline">Kirim Email &rarr;</a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                        <div className="flex-1 min-h-[400px] relative bg-slate-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1m2!1s0x2e6fb791dc089cb1%3A0x6a0f76bc5a64387d!2sTerminal%20Tegal!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="p-8 bg-slate-900 text-white text-center">
                            <h3 className="font-bold text-lg mb-4">Ikuti Perjalanan Bylian Trans</h3>
                            <div className="flex justify-center gap-4">
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
