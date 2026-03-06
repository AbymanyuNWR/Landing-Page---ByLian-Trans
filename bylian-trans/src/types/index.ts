// Global Type Definitions for Bylian Trans

export type Role = 'GUEST' | 'CUSTOMER' | 'AGENT' | 'ADMIN' | 'SUPER_ADMIN';
export type LoyaltyLevel = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
export type BusClass = 'EKONOMI_AC' | 'BISNIS_AC' | 'EKSEKUTIF' | 'SUPER_EKSEKUTIF';
export type ScheduleStatus = 'SCHEDULED' | 'BOARDING' | 'IN_TRANSIT' | 'ARRIVED' | 'DELAYED' | 'CANCELLED';
export type SeatStatus = 'AVAILABLE' | 'LOCKED' | 'BOOKED';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'EXPIRED' | 'COMPLETED';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type Gender = 'MALE' | 'FEMALE';
export type CharterStatus = 'NEW' | 'CONTACTED' | 'QUOTATION_SENT' | 'APPROVED' | 'REJECTED';

export interface RouteSearchData {
    origin: string;
    destination: string;
    date: Date;
    passengers: number;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

/** Represents a parsed seat in the seat map */
export interface SeatDetail {
    id: string;
    seatNumber: string;
    status: SeatStatus;
    price?: number;
}

/** Standard API Response wrapper */
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    meta?: any;
}
