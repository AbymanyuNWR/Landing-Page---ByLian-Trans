import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

/**
 * Sends an email using Resend
 */
export async function sendEmail({
    to,
    subject,
    react, // Pass a React component for email body
    text,
}: {
    to: string | string[];
    subject: string;
    react?: React.ReactElement | React.ReactNode | null;
    text?: string;
}) {
    try {
        const from = "Bylian Trans <no-reply@bylientrans.co.id>"; // Change to verified domain

        // Only send if API key is present (prevent crashing in local dev without key)
        if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_dummy_key') {
            console.warn('⚠️ No Resend API Key found. Skipping email send to:', to);
            return { success: true, dummy: true };
        }

        const payload: any = {
            from,
            to,
            subject,
        };

        if (react) {
            payload.react = react;
        } else if (text) {
            payload.text = text;
        }

        const data = await resend.emails.send(payload);
        return { success: true, data };
    } catch (error: any) {
        console.error("Send Email Error:", error.message);
        return { success: false, error: error.message };
    }
}
