import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PassengerInfo {
    id: string;
    name: string;
    idNumber: string;
    gender: string;
    birthDate: string;
    isMainPassenger: boolean;
    seatId?: string;
}

interface BookingState {
    searchQuery: {
        origin: string;
        destination: string;
        date: Date | null;
        pax: number;
        returnDate?: Date | null;
    } | null;
    selectedSchedule: any | null; // Will type properly later
    selectedSeats: string[];
    passengers: PassengerInfo[];
    buyerInfo: {
        name: string;
        email: string;
        phone: string;
        idNumber: string;
    } | null;

    setSearchQuery: (query: BookingState['searchQuery']) => void;
    setSelectedSchedule: (schedule: any) => void;
    toggleSeatSelection: (seatId: string, max: number) => void;
    setPassengers: (passengers: PassengerInfo[]) => void;
    setBuyerInfo: (info: BookingState['buyerInfo']) => void;
    resetBookingFlow: () => void;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set) => ({
            searchQuery: null,
            selectedSchedule: null,
            selectedSeats: [],
            passengers: [],
            buyerInfo: null,

            setSearchQuery: (query) => set({ searchQuery: query }),

            setSelectedSchedule: (schedule) => set({
                selectedSchedule: schedule,
                selectedSeats: [],
                passengers: []
            }),

            toggleSeatSelection: (seatId, max) => set((state) => {
                const isSelected = state.selectedSeats.includes(seatId);
                if (isSelected) {
                    return { selectedSeats: state.selectedSeats.filter(id => id !== seatId) };
                }
                if (state.selectedSeats.length < max) {
                    return { selectedSeats: [...state.selectedSeats, seatId] };
                }
                return state;
            }),

            setPassengers: (passengers) => set({ passengers }),

            setBuyerInfo: (info) => set({ buyerInfo: info }),

            resetBookingFlow: () => set({
                searchQuery: null,
                selectedSchedule: null,
                selectedSeats: [],
                passengers: [],
                buyerInfo: null
            })
        }),
        {
            name: 'bylian-booking-storage',
        }
    )
);
