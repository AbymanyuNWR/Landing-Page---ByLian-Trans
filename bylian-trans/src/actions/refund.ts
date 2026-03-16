"use server";

import { processRefund } from "@/lib/refund";
import { auth } from "@/auth";
import { calculateDynamicRefund } from "@/lib/finance_ai";

/**
 * Task 69: Smart Refund Eligibility Checker API
 * Provides a dynamic preview of refund details for the user.
 */
export async function calculateRefundEligibilityAction(bookingId: string, reason?: string) {
    const session = await auth();
    if (!session) return { error: "Silakan login terlebih dahulu." };

    try {
        const result = await calculateDynamicRefund(bookingId, reason);
        return { success: true, data: result };
    } catch (error: any) {
        return { error: error.message || "Gagal menghitung estimasi refund." };
    }
}

/**
 * Task 21: Refund Action
 * Allows admins to trigger refunds from the dashboard
 */
export async function refundPaymentAction(data: {
  paymentId: string;
  amount: number;
  reason: string;
}) {
  const session = await auth();
  
  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    return { error: "Terlarang: Hanya Admin yang dapat memproses pengembalian dana." };
  }

  try {
    const result = await processRefund(
      data.paymentId,
      data.amount,
      data.reason,
      session.user.id!
    );

    return { success: true, payment: result };
  } catch (error: any) {
    return { error: error.message || "Gagal memproses pengembalian dana." };
  }
}
