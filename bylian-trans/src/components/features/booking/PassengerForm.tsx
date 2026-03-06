"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useBookingStore } from "@/store/useBookingStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const passengerSchema = z.object({
    passengers: z.array(z.object({
        seatId: z.string(),
        seatNumber: z.string(),
        name: z.string().min(3, "Nama minimal 3 karakter"),
        idNumber: z.string().min(10, "Nomor Identitas tidak valid"),
        gender: z.enum(["MALE", "FEMALE"]),
        birthDate: z.string().min(1, "Tanggal lahir wajib diisi")
    })),
    contact: z.object({
        name: z.string().min(3, "Nama Pemesan wajib diisi"),
        email: z.string().email("Format email salah"),
        phone: z.string().min(10, "Nomor WA tidak valid"),
        notes: z.string().optional()
    })
});

type PassengerFormValues = z.infer<typeof passengerSchema>;

interface PassengerFormProps {
    onSuccess: () => void;
}

export function PassengerForm({ onSuccess }: PassengerFormProps) {
    const { selectedSeats, setPassengers, setContactData, contactData, passengers } = useBookingStore();

    const { register, handleSubmit, formState: { errors } } = useForm<PassengerFormValues>({
        resolver: zodResolver(passengerSchema),
        defaultValues: {
            passengers: selectedSeats.map((seat, idx) => ({
                seatId: seat.id,
                seatNumber: seat.seatNumber,
                name: passengers[idx]?.name || "",
                idNumber: passengers[idx]?.idNumber || "",
                gender: passengers[idx]?.gender || "MALE",
                birthDate: passengers[idx]?.birthDate ?
                    (passengers[idx].birthDate instanceof Date ? (passengers[idx].birthDate as Date).toISOString().split('T')[0] : String(passengers[idx].birthDate))
                    : "",
            })),
            contact: contactData || {
                name: "",
                email: "",
                phone: "",
                notes: ""
            }
        }
    });

    const onSubmit = (data: PassengerFormValues) => {
        // Transform string dates to Date objects for Zustand store
        const formattedPassengers = data.passengers.map(p => ({
            ...p,
            birthDate: new Date(p.birthDate)
        }));
        setPassengers(formattedPassengers as any);
        setContactData(data.contact);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold mb-4">Informasi Pemesan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="contact.name">Nama Lengkap</Label>
                        <Input id="contact.name" {...register("contact.name")} placeholder="Sesuai KTP" />
                        {errors.contact?.name && <p className="text-red-500 text-xs mt-1">{errors.contact.name.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="contact.phone">Nomor WhatsApp</Label>
                        <Input id="contact.phone" {...register("contact.phone")} placeholder="0812..." type="tel" />
                        {errors.contact?.phone && <p className="text-red-500 text-xs mt-1">{errors.contact.phone.message}</p>}
                    </div>
                    <div className="space-y-1 md:col-span-2">
                        <Label htmlFor="contact.email">Alamat Email</Label>
                        <Input id="contact.email" {...register("contact.email")} placeholder="Untuk pengiriman e-ticket" type="email" />
                        {errors.contact?.email && <p className="text-red-500 text-xs mt-1">{errors.contact.email.message}</p>}
                    </div>
                </div>
            </div>

            {/* Passengers Details */}
            <h3 className="text-lg font-bold">Detail Penumpang</h3>
            {selectedSeats.map((seat, index) => (
                <div key={seat.id} className="bg-white p-6 rounded-2xl border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        Kursi {seat.seatNumber}
                    </div>
                    <h4 className="font-semibold mb-4">Penumpang {index + 1}</h4>

                    <input type="hidden" {...register(`passengers.${index}.seatId`)} value={seat.id} />
                    <input type="hidden" {...register(`passengers.${index}.seatNumber`)} value={seat.seatNumber} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label>Nama Lengkap</Label>
                            <Input {...register(`passengers.${index}.name`)} placeholder="Sesuai KTP" />
                            {errors.passengers?.[index]?.name && <p className="text-red-500 text-xs mt-1">{errors.passengers[index]?.name?.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label>NIK / No. Paspor</Label>
                            <Input {...register(`passengers.${index}.idNumber`)} placeholder="Nomor Identitas" />
                            {errors.passengers?.[index]?.idNumber && <p className="text-red-500 text-xs mt-1">{errors.passengers[index]?.idNumber?.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label>Jenis Kelamin</Label>
                            <select
                                {...register(`passengers.${index}.gender`)}
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            >
                                <option value="MALE">Laki-laki</option>
                                <option value="FEMALE">Perempuan</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <Label>Tanggal Lahir</Label>
                            <Input type="date" {...register(`passengers.${index}.birthDate`)} />
                            {errors.passengers?.[index]?.birthDate && <p className="text-red-500 text-xs mt-1">{errors.passengers[index]?.birthDate?.message}</p>}
                        </div>
                    </div>
                </div>
            ))}

            <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30 mt-6">
                Lanjut ke Pembayaran
            </button>
        </form>
    );
}
