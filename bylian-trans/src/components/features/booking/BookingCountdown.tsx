import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';
import { useRouter } from 'next/navigation';

export function BookingCountdown() {
    const { bookingExpiresAt, resetBookingFlow } = useBookingStore();
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [isExpiring, setIsExpiring] = useState(false);

    useEffect(() => {
        if (!bookingExpiresAt) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const difference = bookingExpiresAt - now;

            if (difference <= 0) {
                clearInterval(interval);
                resetBookingFlow();
                alert('Waktu pemesanan habis. Silakan ulangi pencarian jadwal.');
                router.push('/pesan');
                return;
            }

            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            setIsExpiring(minutes < 5); // Warning red when < 5 mins
        }, 1000);

        return () => clearInterval(interval);
    }, [bookingExpiresAt, resetBookingFlow, router]);

    if (!bookingExpiresAt || !timeLeft) return null;

    return (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm transition-colors duration-500 ${isExpiring ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-orange-50 text-orange-600 border-orange-200'}`}>
            <Clock className="w-4 h-4" />
            <span className="font-bold text-sm tracking-widest">{timeLeft}</span>
        </div>
    );
}
