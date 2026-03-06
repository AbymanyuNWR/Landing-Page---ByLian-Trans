import { Html, Head, Preview, Body, Container, Section, Text, Heading, Hr } from '@react-email/components';
import { formatIDR } from '@/lib/utils';

export function PaymentReceipt({
    bookingCode = "BLT-123456",
    customerName = "Budi Santoso",
    amount = 300000,
    method = "BCA Virtual Account",
    date = new Date().toISOString()
}: any) {
    return (
        <Html>
            <Head />
            <Preview>Kuitansi Pembayaran PT Bylian Trans - {bookingCode}</Preview>
            <Body style={{ backgroundColor: "#f6f9fc", fontFamily: "sans-serif" }}>
                <Container style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "8px", margin: "40px auto", maxWidth: "600px" }}>
                    <Heading style={{ color: "#16a34a", fontSize: "24px" }}>Pembayaran Berhasil</Heading>
                    <Text style={{ fontSize: "16px", color: "#333" }}>Halo {customerName},</Text>
                    <Text style={{ fontSize: "16px", color: "#333" }}>Kami telah menerima pembayaran untuk pesanan Anda.</Text>

                    <Section style={{ border: "1px solid #e2e8f0", padding: "20px", borderRadius: "8px", margin: "20px 0" }}>
                        <Text style={{ margin: "8px 0", color: "#64748b" }}>Kode Booking</Text>
                        <Text style={{ margin: "4px 0 16px 0", fontWeight: "bold", fontSize: "18px" }}>{bookingCode}</Text>

                        <Text style={{ margin: "8px 0", color: "#64748b" }}>Jumlah Pembayaran</Text>
                        <Text style={{ margin: "4px 0 16px 0", fontWeight: "bold", fontSize: "18px" }}>{formatIDR(amount)}</Text>

                        <Text style={{ margin: "8px 0", color: "#64748b" }}>Metode Pembayaran</Text>
                        <Text style={{ margin: "4px 0 16px 0", fontWeight: "bold" }}>{method}</Text>
                    </Section>

                    <Hr style={{ borderColor: "#e2e8f0", margin: "20px 0" }} />
                    <Text style={{ fontSize: "14px", color: "#64748b" }}>Terima kasih atas kepercayaan Anda menggunakan layanan PT Bylian Trans.</Text>
                </Container>
            </Body>
        </Html>
    );
}

export default PaymentReceipt;
