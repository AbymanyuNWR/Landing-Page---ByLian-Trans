import { Html, Head, Preview, Body, Container, Section, Text, Heading, Hr } from '@react-email/components';

/**
 * A generic notification template used for Trip Reminders, Delay Notifications, Refund Processed,
 * Charter Request Confirmation, and Contact Auto Replies.
 */
export function GenericNotification({
    title = "Pemberitahuan",
    preview = "Pemberitahuan dari PT Bylian Trans",
    customerName = "Pelanggan",
    message = "Ini adalah pesan otomatis dari sistem kami.",
    details = [] // Array of {label, value} objects
}: any) {
    return (
        <Html>
            <Head />
            <Preview>{preview}</Preview>
            <Body style={{ backgroundColor: "#f6f9fc", fontFamily: "sans-serif" }}>
                <Container style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "8px", margin: "40px auto", maxWidth: "600px" }}>
                    <Heading style={{ color: "#1d4ed8", fontSize: "24px" }}>{title}</Heading>
                    <Text style={{ fontSize: "16px", color: "#333" }}>Halo {customerName},</Text>
                    <Text style={{ fontSize: "16px", color: "#333", whiteSpace: "pre-wrap" }}>{message}</Text>

                    {details && details.length > 0 && (
                        <Section style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "8px", margin: "20px 0" }}>
                            {details.map((detail: any, index: number) => (
                                <Text key={index} style={{ margin: "4px 0" }}>
                                    <strong>{detail.label}:</strong> {detail.value}
                                </Text>
                            ))}
                        </Section>
                    )}

                    <Hr style={{ borderColor: "#e2e8f0", margin: "20px 0" }} />
                    <Text style={{ fontSize: "14px", color: "#64748b" }}>PT Bylian Trans Customer Service<br />WhatsApp: 081234567890</Text>
                </Container>
            </Body>
        </Html>
    );
}

export default GenericNotification;
