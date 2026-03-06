// @ts-ignore - Midtrans client doesn't have official TS types currently
import Midtrans from 'midtrans-client';

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

// Create Core API instance (for direct API calls)
export const midtransCoreApi = new Midtrans.CoreApi({
    isProduction,
    serverKey: process.env.MIDTRANS_SERVER_KEY || '',
    clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
});

// Create Snap API instance (for frontend snap popups)
export const midtransSnap = new Midtrans.Snap({
    isProduction,
    serverKey: process.env.MIDTRANS_SERVER_KEY || '',
    clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
});

/**
 * Creates a Midtrans Snap Payment Transaction
 */
export async function createSnapTransaction(orderId: string, grossAmount: number, customerDetails: any, items: any[]) {
    const parameter = {
        transaction_details: {
            order_id: orderId,
            gross_amount: Math.round(grossAmount), // Midtrans expects integer
        },
        credit_card: {
            secure: true,
        },
        customer_details: {
            first_name: customerDetails.firstName,
            email: customerDetails.email,
            phone: customerDetails.phone,
        },
        item_details: items,
    };

    try {
        const transaction = await midtransSnap.createTransaction(parameter);
        return {
            token: transaction.token,
            redirectUrl: transaction.redirect_url,
        };
    } catch (error: any) {
        console.error('Midtrans Create Transaction Error:', error.message);
        throw new Error('Gagal membuat transaksi pembayaran.');
    }
}
