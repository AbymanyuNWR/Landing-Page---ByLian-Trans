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
