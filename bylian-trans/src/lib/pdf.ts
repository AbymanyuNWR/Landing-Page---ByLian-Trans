import { pdf } from "@react-pdf/renderer";
import TicketPDF from "@/components/features/ticket/TicketPDF";

/**
 * Helper to render PDF in memory and return as Buffer.
 */
export async function generateTicketPdfBuffer(bookingData: any) {
    const element = TicketPDF({ booking: bookingData });
    const blob = await pdf(element).toBlob();
    const arrayBuffer = await blob.arrayBuffer();
    return Buffer.from(arrayBuffer);
}
