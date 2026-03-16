import { sendWhatsAppMessage } from "./fonnte";

/**
 * Utilities for formatting WhatsApp URLs directly to CS (Customer Service)
 */

export function getWhatsAppCsUrl(message: string = "") {
    // Convert 0812... to 62812...
    let phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890"
    if (phone.startsWith("0")) phone = "62" + phone.slice(1);
    const encodedText = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedText}`;
}

export function getWhatsAppCharterUrl(customMessage?: string) {
    let phone = process.env.NEXT_PUBLIC_WHATSAPP_CHARTER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567891"
    if (phone.startsWith("0")) phone = "62" + phone.slice(1);

    const defaultText = "Halo CS Bylian Trans, saya ingin mengetahui informasi sewa/charter bus pariwisata.";
    const encodedText = encodeURIComponent(customMessage || defaultText);
    return `https://wa.me/${phone}?text=${encodedText}`;
}

export function formatTripReminderWa(passengerName: string, route: string, date: string, time: string, bookingCode: string) {
    return `Halo Kak *${passengerName}*, pengingat perjalanan Anda bersama Bylian Trans:\n\n🎫 *Booking:* ${bookingCode}\n🛣️ *Rute:* ${route}\n📅 *Tgl:* ${date}\n⏰ *Jam:* ${time}\n\nHarap tiba di pool keberangkatan 30 menit sebelum jadwal. Terima kasih!`;
}

/**
 * Task 33: Sends the E-Ticket QR Code via WhatsApp
 */
export async function sendTicketWhatsApp(booking: any) {
    const phone = booking.customerPhone;
    const name = booking.user?.name || booking.passengers[0].name;
    const route = `${booking.schedule.route.origin} - ${booking.schedule.route.destination}`;
    
    const message = `Halo *${name}*,\n\nTerima kasih! Pembayaran Anda telah kami terima. Berikut adalah E-Ticket perjalan Anda:\n\n🎫 *Kode Booking:* ${booking.bookingCode}\n🛣️ *Rute:* ${route}\n📅 *Tgl:* ${new Date(booking.schedule.departureTime).toLocaleDateString("id-ID")}\n\nSimpan QR Code atau tunjukkan pesan ini kepada petugas di pool. Selamat menikmati perjalanan bersama Bylian Trans!`;

    // Use a public QR code API to generate a URL for Fonnte
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${booking.bookingCode}&size=500x500`;

    return await sendWhatsAppMessage(phone, message, qrUrl);
}
