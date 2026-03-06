/**
 * Fonnte API Wrapper for sending automated WhatsApp messages (e.g., e-ticket, payment instruction)
 */

export async function sendWhatsAppMessage(targetWhatsapp: string, message: string, fileUrl?: string) {
    const token = process.env.FONNTE_TOKEN;

    if (!token || token === "fonnte-api-token") {
        console.warn("⚠️ No Fonnte Token provided. Skipping WA message to:", targetWhatsapp);
        return { success: true, dummy: true };
    }

    try {
        const data = new FormData();
        data.append("target", targetWhatsapp);
        data.append("message", message);
        if (fileUrl) {
            data.append("file", fileUrl); // E.g., PDF URL
        }

        // Country code auto-handling handled by Fonnte usually, but good to clean
        data.append("countryCode", "62");

        const response = await fetch("https://api.fonnte.com/send", {
            method: "POST",
            headers: {
                Authorization: token,
            },
            body: data,
        });

        const result = await response.json();
        return { success: result.status, data: result };
    } catch (error: any) {
        console.error("Fonnte Send WA Error:", error.message);
        return { success: false, error: error.message };
    }
}
