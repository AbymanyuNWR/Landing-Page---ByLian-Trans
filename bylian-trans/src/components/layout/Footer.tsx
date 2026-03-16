import React from "react";
import Link from "next/link";
import { Bus, MapPin, Phone, Mail, Instagram, Facebook, Youtube, Twitter, MessageCircle, ArrowRight } from "lucide-react";
import { COMPANY_DATA } from "@/data/bylian.data";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800/50">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
                    
                    {/* Company Info - Left */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-3 text-white group">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
                                <Bus size={24} className="text-white" />
                            </div>
                            <span className="font-heading font-bold text-2xl tracking-tight">
                                {COMPANY_DATA.brand}
                            </span>
                        </Link>
                        
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {COMPANY_DATA.subTagline}. Kami berkomitmen memberikan layanan transportasi darat terbaik, teraman, dan paling nyaman untuk perjalanan Anda.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a 
                                href={COMPANY_DATA.socials.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-slate-800/50 hover:bg-primary flex items-center justify-center hover:text-white transition-all duration-300 border border-slate-700 hover:border-primary"
                            >
                                <Instagram size={18} />
                            </a>
                            <a 
                                href={COMPANY_DATA.socials.facebook} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-slate-800/50 hover:bg-primary flex items-center justify-center hover:text-white transition-all duration-300 border border-slate-700 hover:border-primary"
                            >
                                <Facebook size={18} />
                            </a>
                            <a 
                                href={COMPANY_DATA.socials.youtube} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-slate-800/50 hover:bg-primary flex items-center justify-center hover:text-white transition-all duration-300 border border-slate-700 hover:border-primary"
                            >
                                <Youtube size={18} />
                            </a>
                            <a 
                                href={`https://wa.me/${COMPANY_DATA.contacts.csWhatsApp}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-green-500/20 hover:bg-green-500 flex items-center justify-center hover:text-white transition-all duration-300 border border-green-500/30 hover:border-green-500 text-green-400 hover:text-white"
                            >
                                <MessageCircle size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links - Services */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-bold text-base mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-primary to-blue-600 rounded-full"></span>
                            Layanan
                        </h3>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <Link href="/rute-harga" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Rute & Jadwal
                                </Link>
                            </li>
                            <li>
                                <Link href="/armada" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Armada Bus
                                </Link>
                            </li>
                            <li>
                                <Link href="/charter" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Charter Bus
                                </Link>
                            </li>
                            <li>
                                <Link href="/tracking" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Live Tracking
                                </Link>
                            </li>
                            <li>
                                <Link href="/pesan" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Cara Pesan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-bold text-base mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-secondary to-emerald-600 rounded-full"></span>
                            Perusahaan
                        </h3>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <Link href="/tentang-kami" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Blog & Berita
                                </Link>
                            </li>
                            <li>
                                <Link href="/kontak" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Hubungi Kami
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Karir
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm text-slate-400 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Mitra Agen
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4">
                        <h3 className="text-white font-bold text-base mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full"></span>
                            Hubungi Kami
                        </h3>
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                    <MapPin size={18} className="text-primary" />
                                </div>
                                <span className="text-sm text-slate-400 leading-relaxed">
                                    {COMPANY_DATA.address}
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                    <Phone size={18} className="text-primary" />
                                </div>
                                <span className="text-sm">{COMPANY_DATA.contacts.phone}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
                                    <MessageCircle size={18} className="text-green-400" />
                                </div>
                                <span className="text-sm">+{COMPANY_DATA.contacts.csWhatsApp}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                                    <Mail size={18} className="text-purple-400" />
                                </div>
                                <span className="text-sm">{COMPANY_DATA.contacts.email}</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800/50">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                        <p>&copy; {currentYear} {COMPANY_DATA.name}. Hak Cipta Dilindungi.</p>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
                            <Link href="#" className="hover:text-primary transition-colors">FAQ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

