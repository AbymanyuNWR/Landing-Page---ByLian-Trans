import React from "react";
import Link from "next/link";
import { Bus, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { COMPANY_DATA } from "@/data/bylian.data";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Company Info */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2 text-white">
                            <Bus size={32} className="text-primary" />
                            <span className="font-heading font-bold text-2xl tracking-tight">
                                {COMPANY_DATA.brand}
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {COMPANY_DATA.subTagline}. Kami berkomitmen memberikan layanan transportasi darat terbaik, teraman, dan paling nyaman.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Layanan Kami</h3>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/rute" className="hover:text-primary transition-colors">Rute & Jadwal</Link></li>
                            <li><Link href="/armada" className="hover:text-primary transition-colors">Armada Bus</Link></li>
                            <li><Link href="/charter" className="hover:text-primary transition-colors">Carter Rombongan</Link></li>
                            <li><Link href="/agen" className="hover:text-primary transition-colors">Daftar Agen</Link></li>
                            <li><Link href="/tracking" className="hover:text-primary transition-colors">Live Tracking</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Perusahaan</h3>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/tentang" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog & Berita</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">Tanya Jawab (FAQ)</Link></li>
                            <li><Link href="/syarat-ketentuan" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link></li>
                            <li><Link href="/kebijakan-privasi" className="hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Hubungi Kami</h3>
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-primary shrink-0 mt-1" />
                                <span className="text-sm">{COMPANY_DATA.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-primary shrink-0" />
                                <span className="text-sm">{COMPANY_DATA.contacts.phone}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary shrink-0">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                                <span className="text-sm">+62 {COMPANY_DATA.contacts.csWhatsApp.substring(2)}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-primary shrink-0" />
                                <span className="text-sm">{COMPANY_DATA.contacts.email}</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} {COMPANY_DATA.name}. Hak Cipta Dilindungi.</p>
                    <p>Didesain dengan ❤️ untuk transportasi darat Indonesia.</p>
                </div>
            </div>
        </footer>
    );
}
