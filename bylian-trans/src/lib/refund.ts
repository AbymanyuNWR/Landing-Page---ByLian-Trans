import { db } from "./prisma";
import { logger } from "./logger";
import { createAuditLog } from "./logger";

// Midtrans Client Config (assuming shared config exists or we reuse keys)
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_BASE_URL = process.env.MIDTRANS_IS_PRODUCTION === "true" 
  ? "https://api.midtrans.com/v2" 
  : "https://api.sandbox.midtrans.com/v2";

/**
 * Task 21: Refund Management Logic
 * Bridges with Midtrans Refund API
 */
export async function processRefund(
  paymentId: string, 
  amount: number, 
  reason: string,
  adminId: string
) {
  const payment = await db.payment.findUnique({
    where: { id: paymentId },
    include: { booking: true }
  });

  if (!payment) throw new Error("Payment not found");
  if (payment.status !== "SETTLED") throw new Error("Only settled payments can be refunded");

  try {
    // 1. Call Midtrans Refund API
    const authHeader = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString("base64");
    const response = await fetch(`${MIDTRANS_BASE_URL}/${payment.orderId}/refund`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Basic ${authHeader}`
      },
      body: JSON.stringify({
        refund_key: `REF-${Date.now()}`,
        amount,
        reason
      })
    });

    const midtransData = await response.json();

    if (midtransData.status_code !== "200") {
      throw new Error(midtransData.status_message || "Midtrans refund failed");
    }

    // 2. Update Local State
    return await db.$transaction(async (tx: any) => {
      const updatedPayment = await tx.payment.update({
        where: { id: paymentId },
        data: { 
          status: amount >= payment.amount ? "REFUNDED" : "PARTIALLY_REFUNDED"
        }
      });

      // Log the action
      await createAuditLog({
        userId: adminId,
        action: "REFUND_PROCESS",
        target: paymentId,
        details: {
          amount,
          reason,
          midtransOrderId: midtransData.order_id
        }
      });

      return updatedPayment;
    });
  } catch (error: any) {
    logger.error("Refund Processing Error", { paymentId, error: error.message });
    throw error;
  }
}
