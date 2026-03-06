"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
    {
        question: "Apa saja fasilitas yang didapatkan saat menyewa bus pariwisata?",
        answer: "Seluruh armada bus pariwisata Bylian Trans dilengkapi dengan Full AC, Reclining Seat, Audio/Video (Karaoke & TV), USB port/stop kontak, bantal selimut khusus (rute tertentu/opsional), serta layanan ramah dari pengemudi dan co-driver berpengalaman."
    },
    {
        question: "Apakah harga sewa sudah termasuk tol, parkir, dan tips supir?",
        answer: "Harga dasar yang kami tawarkan umumnya adalah sewa unit dan BBM (Bahan Bakar). Untuk tol, parkir, retribusi wisata, penyeberangan fery, makan supir, dan tips supir sepenuhnya ditanggung oleh penyewa kecuali mengambil paket All-In."
    },
    {
        question: "Berapa lama maksimal pemakaian dalam sehari?",
        answer: "Untuk sewa dalam kota maksimal 12 jam pada hari yang sama. Untuk sewa luar kota maksimal 16 jam pada hari yang sama (pergantian tanggal maksimal pukul 23:59). Kelebihan waktu akan dikenakan biaya overtime."
    },
    {
        question: "Bagaimana cara pembayaran dan pembatalan sewa?",
        answer: "Booking dianggap valid setelah pembayaran DP (Down Payment) minimal 30% dari total sewa. Pelunasan paling lambat H-3 keberangkatan. Jika terjadi pembatalan sepihak oleh penyewa setelah H-7, maka uang DP hangus."
    }
];

export function CharterFAQ() {
    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Pertanyaan yang Sering Diajukan</h2>
                <p className="text-slate-500 mt-2">Dapatkan jawaban cepat seputar persyaratan sewa bus pariwisata.</p>
            </div>

            <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                {FAQS.map((faq, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className={idx === FAQS.length - 1 ? 'border-b-0' : ''}>
                        <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 text-left font-bold text-slate-700 data-[state=open]:text-primary transition-colors">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-slate-500 leading-relaxed">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
