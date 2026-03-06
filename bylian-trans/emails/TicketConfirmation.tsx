import { Html, Head, Preview, Body, Container, Section, Text, Img, Heading, Hr } from '@react-email/components';
import { formatIDR, formatDate } from '@/lib/utils';

export function TicketConfirmation({
    bookingCode = "BLT-123456",
    customerName = "Budi Santoso",
    route = "Tegal - Jakarta",
    date = "2024-08-17",
    time = "19:00 WIB",
    seats = ["1A", "1B"],
    total = 300000,
}: any) {
    return (
        <Html>
            <Head />
            <Preview>E-Ticket PT Bylian Trans - {bookingCode}</Preview>
            <Body style={{ backgroundColor: "#f6f9fc", fontFamily: "sans-serif" }}>
                <Container style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "8px", margin: "40px auto", maxWidth: "600px" }}>
                    <Img src="https://bylientrans.co.id/images/logo/logo-blue.png" width="150" alt="Bylian Trans" />
                    <Heading style={{ color: "#1d4ed8", fontSize: "24px" }}>E-Ticket Anda Siap!</Heading>
                    <Text style={{ fontSize: "16px", color: "#333" }}>Halo {customerName},</Text>
                    <Text style={{ fontSize: "16px", color: "#333" }}>Terima kasih telah memesan tiket bus Bylian Trans. Pembayaran Anda telah kami terima.</Text>

                    <Section style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "8px", margin: "20px 0" }}>
                        <Text style={{ margin: "4px 0", fontWeight: "bold" }}>Kode Booking: {bookingCode}</Text>
                        <Text style={{ margin: "4px 0" }}>Rute: {route}</Text>
                        <Text style={{ margin: "4px 0" }}>Jadwal: {formatDate(date)} | {time}</Text>
                        <Text style={{ margin: "4px 0" }}>Nomor Kursi: {seats.join(", ")}</Text>
                        <Text style={{ margin: "4px 0" }}>Total Bayar: {formatIDR(total)}</Text>
                    </Section>

                    <Hr style={{ borderColor: "#e2e8f0", margin: "20px 0" }} />

                    <Text style={{ fontSize: "14px", color: "#64748b" }}>
                        Harap tiba di pool keberangkatan 30 menit sebelum keberangkatan. Tunjukkan email ini atau e-ticket di aplikasi/website kepada petugas.
                    </Text>
                    <Text style={{ fontSize: "14px", color: "#64748b" }}>PT Bylian Trans, Jl. Raya Tegal - Pemalang No.123</Text>
                </Container>
            </Body>
        </Html>
    );
}

export default TicketConfirmation;
