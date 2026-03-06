"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, TicketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_DATA } from "@/data/bylian.data";

export function CTASection() {
    return (
        <section className="py-20 relative overflow-hidden bg-gradient-primary">
            {/* Decorative blurred spots */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8 p-3 rounded-2xl bg-white/10 backdrop-blur-md inline-block border border-white/20">
                        <span className="text-white text-sm font-semibold tracking-wider uppercase">Siap Untuk Perjalanan Luar Biasa?</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                        Pesan Tiket Mudah dan Dapatkan Harga Terbaik
                    </h2>

                    <p className="text-blue-100 text-lg md:text-xl mb-12">
                        Gabung bersama lebih dari 15.000 penumpang kami bulan ini. Unduh e-tiket langsung ke smartphone Anda tanpa antre loket.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link href="/pesan" className="w-full sm:w-auto">
                            <Button className="w-full h-14 px-8 text-lg font-bold bg-white text-primary hover:bg-slate-100 shadow-xl rounded-xl gap-2">
                                <TicketIcon className="w-5 h-5" /> Cari & Pesan Tiket
                            </Button>
                        </Link>

                        <a
                            href={`https://wa.me/${COMPANY_DATA.contacts.csWhatsApp}?text=Halo%20Bylian%20Trans,%20saya%20ingin%20tanya%20tiket`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <Button variant="outline" className="w-full h-14 px-8 text-lg font-bold bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-xl gap-2">
                                <MessageCircle className="w-5 h-5" /> Hubungi via WhatsApp
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
