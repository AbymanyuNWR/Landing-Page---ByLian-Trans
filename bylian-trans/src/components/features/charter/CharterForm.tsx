"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const charterSchema = z.object({
    picName: z.string().min(3, "Nama PIC minimal 3 karakter"),
    companyName: z.string().optional(),
    whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid"),
    email: z.string().email("Format email salah"),
    eventType: z.string().min(2, "Pilih jenis acara"),
    origin: z.string().min(3, "Kota penjemputan wajib diisi"),
    destination: z.string().min(3, "Kota tujuan wajib diisi"),
    departDate: z.string().min(1, "Tanggal keberangkatan wajib"),
    returnDate: z.string().optional(),
    passengers: z.string().min(1, "Jumlah penumpang wajib diisi"),
    busClass: z.string().min(2, "Pilih kelas armada"),
    notes: z.string().optional()
});

export function CharterForm({ onSuccess }: { onSuccess: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof charterSchema>>({
        resolver: zodResolver(charterSchema)
    });

    const onSubmit = async (data: z.infer<typeof charterSchema>) => {
        setIsLoading(true);
        // Simulating API Call
        setTimeout(() => {
            setIsLoading(false);
            onSuccess();
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-black text-slate-800 mb-6">Formulir Permintaan Penawaran</h3>

            <div className="space-y-6">
                {/* Contact Tracking */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label>Nama Penanggung Jawab (PIC) *</Label>
                        <Input {...register("picName")} placeholder="Nama Lengkap" />
                        {errors.picName && <p className="text-red-500 text-xs mt-1">{errors.picName.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label>Nama Instansi / Perusahaan</Label>
                        <Input {...register("companyName")} placeholder="Keluarga Besar / PT..." />
                    </div>
                    <div className="space-y-1">
                        <Label>Nomor WhatsApp *</Label>
                        <Input {...register("whatsapp")} placeholder="0812..." type="tel" />
                        {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label>Alamat Email *</Label>
                        <Input {...register("email")} placeholder="Untuk pengiriman quotation" type="email" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                </div>

                <hr className="border-slate-100" />

                {/* Trip Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label>Jenis Acara *</Label>
                        <select
                            {...register("eventType")}
                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            <option value="">-- Pilih Acara --</option>
                            <option value="Ziarah / Religi">Ziarah / Religi</option>
                            <option value="Pariwisata / Liburan">Pariwisata / Liburan</option>
                            <option value="Kunjungan Kerja">Kunjungan Kerja / Industri</option>
                            <option value="Study Tour">Study Tour Sekolah</option>
                            <option value="Drop Off Only">Lainnya (Drop Off / Lain-lain)</option>
                        </select>
                        {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label>Jumlah Penumpang *</Label>
                        <Input {...register("passengers")} type="number" placeholder="Berapa orang?" min="1" />
                        {errors.passengers && <p className="text-red-500 text-xs mt-1">{errors.passengers.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <Label>Kota Penjemputan *</Label>
                        <Input {...register("origin")} placeholder="Contoh: Tegal (Pool)" />
                        {errors.origin && <p className="text-red-500 text-xs mt-1">{errors.origin.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label>Kota Tujuan *</Label>
                        <Input {...register("destination")} placeholder="Contoh: Jakarta / Bandung" />
                        {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <Label>Tanggal Berangkat *</Label>
                        <Input {...register("departDate")} type="date" />
                        {errors.departDate && <p className="text-red-500 text-xs mt-1">{errors.departDate.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label>Tanggal Pulang</Label>
                        <Input {...register("returnDate")} type="date" />
                        <span className="text-[10px] text-slate-500">Kosongkan jika hanya Drop Off/Sekali jalan.</span>
                    </div>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-1">
                    <Label>Pilihan Kelas Armada *</Label>
                    <select
                        {...register("busClass")}
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        <option value="">-- Pilih Kelas --</option>
                        <option value="Super Eksekutif (2-1)">Super Eksekutif (22 Seat / Legrest)</option>
                        <option value="Eksekutif (2-2)">Eksekutif (32 Seat / Legrest)</option>
                        <option value="Bisnis AC (2-2)">Bisnis AC (40 Seat)</option>
                    </select>
                    {errors.busClass && <p className="text-red-500 text-xs mt-1">{errors.busClass.message}</p>}
                </div>

                <div className="space-y-1">
                    <Label>Catatan Tambahan</Label>
                    <textarea
                        {...register("notes")}
                        className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[100px]"
                        placeholder="Ada request fasilitas khusus, titik jemput spesifik, atau rundown acara? Tuliskan disini..."
                    />
                </div>

            </div>

            <button disabled={isLoading} type="submit" className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30 disabled:opacity-50">
                {isLoading ? "Memproses..." : "Kirim Permintaan Penawaran"}
            </button>
        </form>
    );
}
