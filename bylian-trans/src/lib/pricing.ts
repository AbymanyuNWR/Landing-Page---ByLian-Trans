import { db } from "./prisma";

/**
 * Task 15: Dynamic Pricing Logic
 * Adjusts price based on date (e.g., peak seasons, holidays)
 */
export async function getAdjustedPrice(basePrice: number, departureDate: Date) {
  let multiplier = 1.0;

  // Basic logic: Higher prices on weekends (Friday - Sunday)
  const day = departureDate.getDay();
  if (day === 0 || day === 5 || day === 6) {
    multiplier = 1.1; // 10% increase
  }

  // Peak season check (e.g., Eid al-Fitr, New Year)
  // For simplicity, let's say May and December are peak months
  const month = departureDate.getMonth();
  if (month === 4 || month === 11) {
    multiplier = 1.25; // 25% increase
  }

  return Math.round(basePrice * multiplier);
}

/**
 * Task 16: Promo Code Engine
 * Validates a promo code and returns its details if valid
 */
export async function validatePromoCode(code: string, amount: number, userId?: string) {
  const promo = await db.promoCode.findUnique({
    where: { code, isActive: true }
  });

  if (!promo) {
    throw new Error("Kode promo tidak valid atau tidak aktif.");
  }

  const now = new Date();
  if (now < promo.startDate || now > promo.endDate) {
    throw new Error("Kode promo sudah kedaluwarsa atau belum dimulai.");
  }

  if (promo.quotaTotal !== null && promo.quotaUsed >= promo.quotaTotal) {
    throw new Error("Kuota promo sudah habis.");
  }

  if (promo.minPurchase && amount < promo.minPurchase) {
    throw new Error(`Minimal pembelian untuk promo ini adalah Rp ${promo.minPurchase.toLocaleString()}.`);
  }

  // Calculate discount
  let discount = 0;
  if (promo.discountType === "PERCENTAGE") {
    discount = (amount * promo.discountValue) / 100;
    if (promo.maxDiscount && discount > promo.maxDiscount) {
      discount = promo.maxDiscount;
    }
  } else {
    discount = promo.discountValue;
  }

  return {
    id: promo.id,
    discountAmount: Math.round(discount),
    code: promo.code
  };
}
