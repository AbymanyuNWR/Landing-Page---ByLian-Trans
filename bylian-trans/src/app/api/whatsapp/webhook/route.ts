import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/fonnte";
import { logger } from "@/lib/logger";

/**
 * Task 36: Customer Support Bot (WhatsApp Webhook)
 * Handles incoming messages from Fonnte or other providers
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sender, message } = body; // Fonnte's typical payload

    if (!message || !sender) return NextResponse.json({ ok: true });

    const lowerMsg = message.toLowerCase().trim();

    // 1. Check Ticket Status Logic
    // Usage: "cek [kode_booking]"
    if (lowerMsg.startsWith("cek ")) {
      const code = lowerMsg.replace("cek ", "").toUpperCase();
      const booking = await db.booking.findUnique({
        where: { bookingCode: code },
        include: { schedule: { include: { bus: true } } }
      });

      if (!booking) {
        await sendWhatsAppMessage(sender, "Maaf, kode booking tidak ditemukan. Mohon periksa kembali.");
      } else {
        const reply = `
*STATUS TICKET BYLIAN TRANS*
Kode: ${booking.bookingCode}
Bus: ${booking.schedule.bus.name}
Keberangkatan: ${booking.schedule.departureTime.toLocaleString()}
Status: ${booking.status}

Silakan tunjukkan kode ini kepada petugas di pool.
        `.trim();
        await sendWhatsAppMessage(sender, reply);
      }
    } 
    // 2. FAQ / Menu
    else if (lowerMsg === "menu" || lowerMsg === "halo") {
      const reply = `
Halo! Selamat datang di Layanan Otomatis Bylian Trans.
Ketik peritah berikut:
- *cek [KODE]* : Cek status tiket
- *jadwal* : Link jadwal keberangkatan
- *bantuan* : Hubungi Admin

Terima kasih!
      `.trim();
      await sendWhatsAppMessage(sender, reply);
    }
    // 3. Fallback to Admin
    else {
        // Option to relay to human admin or just generic help
        // For now, generic help
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    logger.error("WhatsApp Bot Webhook Error", { error: error.message });
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
