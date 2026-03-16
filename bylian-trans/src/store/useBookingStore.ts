import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SeatDetail, RouteSearchData, BookingPassenger } from '@/types';

interface BookingState {
    // 1. Search Data
    searchData: RouteSearchData | null;
    setSearchData: (data: RouteSearchData) => void;

    // 2. Selected Schedule
    selectedScheduleId: string | null;
    setSelectedSchedule: (id: string) => void;

    // 3. Seat Selection
    selectedSeats: SeatDetail[];
    addSeat: (seat: SeatDetail) => void;
    removeSeat: (seatId: string) => void;
    clearSeats: () => void;

    // 4. Passenger Data
    passengers: BookingPassenger[];
    setPassengers: (passengers: BookingPassenger[]) => void;
    contactData: { name: string; email: string; phone: string; notes?: string } | null;
    setContactData: (data: any) => void;

    // 5. Timer Mechanics
    bookingExpiresAt: number | null;
    startTimer: (minutes: number) => void;

    // Global reset
    resetBookingFlow: () => void;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set) => ({
            searchData: null,
            setSearchData: (data) => set({ searchData: data, selectedScheduleId: null, selectedSeats: [], passengers: [] }),

            selectedScheduleId: null,
            setSelectedSchedule: (id) => set({ 
                selectedScheduleId: id, 
                selectedSeats: [], 
                passengers: [],
                bookingExpiresAt: Date.now() + 15 * 60 * 1000 // Automatically start 15 min timer upon branch selection
            }),

            selectedSeats: [],
            addSeat: (seat) =>
                set((state) => {
                    // Prevent adding more than what's searched, if limit applies
                    const limit = state.searchData?.passengers || 4;
                    if (state.selectedSeats.length >= limit) return state;
                    return { selectedSeats: [...state.selectedSeats, seat] };
                }),
            removeSeat: (seatId) =>
                set((state) => ({
                    selectedSeats: state.selectedSeats.filter((s) => s.id !== seatId),
                })),
            clearSeats: () => set({ selectedSeats: [] }),

            passengers: [],
            setPassengers: (passengers) => set({ passengers }),

            contactData: null,
            setContactData: (data) => set({ contactData: data }),

            bookingExpiresAt: null,
            startTimer: (minutes) => set({ bookingExpiresAt: Date.now() + minutes * 60 * 1000 }),

            resetBookingFlow: () =>
                set({
                    searchData: null,
                    selectedScheduleId: null,
                    selectedSeats: [],
                    passengers: [],
                    contactData: null,
                    bookingExpiresAt: null,
                }),
        }),
        {
            name: 'bylian-booking-storage', // saves to local storage so user doesn't lose progress on refresh
            partialize: (state) => ({ 
                searchData: state.searchData, 
                selectedScheduleId: state.selectedScheduleId, 
                selectedSeats: state.selectedSeats, 
                contactData: state.contactData,
                bookingExpiresAt: state.bookingExpiresAt
            }), // only persist specific fields
        }
    )
);
