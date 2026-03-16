import { db } from "./prisma";
import TicketPDF from "@/components/features/ticket/TicketPDF";
import { pdf } from "@react-pdf/renderer";

/**
 * Task 47: Financial CSV Export Logic
 */
export async function generateFinancialReportCsv(startDate: Date, endDate: Date) {
  const settledPayments = await db.payment.findMany({
    where: {
      status: "SUCCESS",
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      booking: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const header = "Date,Order ID,Method,Gross Amount,Net Amount\n";
  const rows = settledPayments.map((p: any) => {
    const date = p.createdAt.toISOString().split("T")[0];
    const orderId = p.booking.bookingCode;
    const method = p.paymentMethod || "UNKNOWN";
    const amount = p.amount;
    const net = amount; // Subtracting fees could go here
    return `${date},${orderId},${method},${amount},${net}`;
  });

  return header + rows.join("\n");
}

/**
 * Task 48: Passenger Manifest Generator (PDF)
 */
export async function generateManifestPdfBuffer(scheduleId: string) {
  const schedule = await db.busSchedule.findUnique({
    where: { id: scheduleId },
    include: {
      bus: true,
      route: true,
      passengers: {
        include: { seat: true },
      },
    },
  });

  if (!schedule) throw new Error("Schedule not found");

  // Reusing TicketPDF structure or creating a Manifest specific one
  // For now, let's assume we use a similar logic but for all passengers
  // In a real app, you'd create ManifestPDF.tsx
  
  // Dummy manifest text for now
  const manifestContent = `
    MANIFEST PENUMPANG - ${schedule.bus.name}
    Rute: ${schedule.route.origin} - ${schedule.route.destination}
    Waktu: ${schedule.departureTime.toLocaleString()}
    
    Total Penumpang: ${schedule.passengers.length}
    --------------------------------------------------
    ${schedule.passengers.map((p: any, i: number) => `${i+1}. [${p.seat.seatNumber}] ${p.name} - ${p.idNumber}`).join("\n")}
  `;

  return Buffer.from(manifestContent);
}

/**
 * Task 25: Fleet Capacity Report
 * Summary of total seats vs booked seats for a period
 */
export async function getFleetCapacityReport(startDate: Date, endDate: Date) {
  const schedules = await db.busSchedule.findMany({
    where: {
      departureTime: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      bus: true,
      seats: true,
    },
  });

  const report = schedules.map((s: any) => {
    const totalSeats = s.seats.length;
    const bookedSeats = s.seats.filter((seat: any) => seat.status === "BOOKED").length;
    const occupancyRate = totalSeats > 0 ? (bookedSeats / totalSeats) * 100 : 0;

    return {
      scheduleId: s.id,
      busName: s.bus.name,
      route: s.id, // Should map to route name if available
      departure: s.departureTime,
      totalSeats,
      bookedSeats,
      occupancyRate: occupancyRate.toFixed(2) + "%",
    };
  });

  // Calculate Aggregates
  const totalOffered = report.reduce((acc: number, curr: any) => acc + curr.totalSeats, 0);
  const totalSold = report.reduce((acc: number, curr: any) => acc + curr.bookedSeats, 0);
  const avgOccupancy = totalOffered > 0 ? (totalSold / totalOffered) * 100 : 0;

  return {
    summary: {
      totalSchedules: schedules.length,
      totalSeatsOffered: totalOffered,
      totalSeatsSold: totalSold,
      averageOccupancyRate: avgOccupancy.toFixed(2) + "%",
    },
    details: report,
  };
}
