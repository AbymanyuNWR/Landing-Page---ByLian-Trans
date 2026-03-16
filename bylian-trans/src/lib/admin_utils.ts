import { db } from "./prisma";
import { sendWhatsAppMessage } from "./fonnte";
import { sendEmail } from "./email";
import { logger } from "./logger";

/**
 * Task 37: Bulk Broadcast Utility
 * Sends a message to all users with upcoming trips on a specific route/date.
 */
export async function broadcastTripAnnouncement(
  scheduleId: string,
  message: string,
  channels: ("WHATSAPP" | "EMAIL")[] = ["WHATSAPP"]
) {
  const schedule = await db.busSchedule.findUnique({
    where: { id: scheduleId },
    include: {
      bookings: {
        where: { status: "CONFIRMED" },
        include: { user: true }
      }
    }
  });

  if (!schedule) return { error: "Schedule not found" };

  const results = {
    whatsapp: { success: 0, fail: 0 },
    email: { success: 0, fail: 0 },
  };

  for (const booking of schedule.bookings) {
    // 1. WhatsApp Broadcast
    if (channels.includes("WHATSAPP")) {
      const res = await sendWhatsAppMessage(booking.customerPhone, message);
      if (res.success) results.whatsapp.success++;
      else results.whatsapp.fail++;
    }

    // 2. Email Broadcast
    if (channels.includes("EMAIL")) {
      try {
        await sendEmail({
          to: booking.customerEmail,
          subject: `[Pengumuman] Trip ${schedule.bookingCode || schedule.id}`,
          text: message
        });
        results.email.success++;
      } catch (e) {
        results.email.fail++;
      }
    }
  }

  logger.info(`Bulk Broadcast Completed for Schedule ${scheduleId}`, results);
  return results;
}

/**
 * Task 50: Database Maintenance Script (Logic)
 * In a real environment, this would be a CRON job script.
 */
export async function runDatabaseMaintenance() {
  try {
    // 1. Vacuum/Analyze for Postgres optimization
    await db.$queryRaw`VACUUM ANALYZE`;
    
    // 2. Integrity Check
    // (Prisma doesn't have a direct 'check', but we can verify critical counts)
    const users = await db.user.count();
    
    logger.info("Database Maintenance Successful", { 
        timestamp: new Date().toISOString(),
        totalUsers: users 
    });
    
    return { success: true };
  } catch (error: any) {
    logger.error("Database Maintenance Failed", { error: error.message });
    return { success: false, error: error.message };
  }
}
