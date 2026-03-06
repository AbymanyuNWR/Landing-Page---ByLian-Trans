import QRCode from "qrcode";

/**
 * Generates a Base64 data URI of a QR code containing the specified text
 */
export async function generateQrCodeBase64(text: string): Promise<string> {
    try {
        const dataUrl = await QRCode.toDataURL(text, {
            errorCorrectionLevel: "H",
            margin: 1,
            color: {
                dark: "#000000",
                light: "#FFFFFF",
            },
        });
        return dataUrl;
    } catch (error) {
        console.error("Failed to generate QR Code:", error);
        return "";
    }
}
