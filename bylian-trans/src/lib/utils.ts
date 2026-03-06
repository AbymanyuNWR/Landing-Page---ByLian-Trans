import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { id } from "date-fns/locale"

/** Tailwind class merger (Shadcn UI standard) */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/** Format currency IDR */
export function formatIDR(amount: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount)
}

/** Alias for formatIDR – used by some components as formatCurrency */
export const formatCurrency = formatIDR;


/** Format Date to Indonesia Standard (e.g. 17 Agustus 2024) */
export function formatDate(date: Date | string | number, formatStr: string = "dd MMMM yyyy") {
    return format(new Date(date), formatStr, { locale: id })
}

/** Delay helper for testing loading states */
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** Generate unique Booking Code */
export function generateBookingCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'BLT-'; // ByLian Trans
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
