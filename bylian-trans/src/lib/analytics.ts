import { db } from "./prisma";

/**
 * Task 49: Promo Performance Analytics
 * Deep dive into promo code efficacy and revenue impact
 */
export async function getPromoPerformanceReport() {
  const promos = await db.promoCode.findMany({
    include: {
      bookings: {
        where: { status: "CONFIRMED" },
        select: {
          totalAmount: true,
          discountAmount: true
        }
      }
    }
  });

  const report = promos.map((promo: any) => {
    const totalBookings = promo.bookings.length;
    const grossRevenue = promo.bookings.reduce((sum: number, b: any) => sum + b.totalAmount, 0);
    const totalDiscounts = promo.bookings.reduce((sum: number, b: any) => sum + b.discountAmount, 0);
    const conversionRate = promo.quotaTotal ? (promo.quotaUsed / promo.quotaTotal) * 100 : 0;

    return {
      code: promo.code,
      description: promo.description,
      usage: `${promo.quotaUsed} / ${promo.quotaTotal || '∞'}`,
      revenueGenerated: grossRevenue,
      totalDiscountsGiven: totalDiscounts,
      roi: totalDiscounts > 0 ? (grossRevenue / totalDiscounts).toFixed(2) : 'N/A',
      conversionRate: conversionRate.toFixed(2) + "%",
      isActive: promo.isActive && new Date(promo.endDate) > new Date()
    };
  });

  // Calculate Overall Averages
  const totalRevenue = report.reduce((sum: number, item: any) => sum + item.revenueGenerated, 0);
  const totalDiscounts = report.reduce((sum: number, item: any) => sum + item.totalDiscountsGiven, 0);

  return {
    summary: {
      totalRevenueFromPromos: totalRevenue,
      totalDiscountsInvested: totalDiscounts,
      averageRoi: totalDiscounts > 0 ? (totalRevenue / totalDiscounts).toFixed(2) : 0
    },
    codes: report.sort((a: any, b: any) => b.revenueGenerated - a.revenueGenerated)
  };
}
