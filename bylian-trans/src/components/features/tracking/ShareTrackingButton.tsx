"use client";

import { Share2, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";

export function ShareTrackingButton({ trackingId }: { trackingId: string }) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = `${window.location.origin}/tracking?id=${trackingId}`;

        // Web Share API for Mobile
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Lacak Bus Bylian Trans",
                    text: "Lacak perjalanan bus saya secara real-time via GPS!",
                    url: url,
                });
                return;
            } catch (err) {
                console.log("Error sharing:", err);
            }
        }

        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleShare}
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-colors border-2 
        ${copied
                    ? 'bg-green-50 border-green-500 text-green-600'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-primary hover:text-primary hover:bg-primary/5'
                }`}
        >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {copied ? "Link Tersalin!" : "Bagikan Link Pelacakan"}
        </button>
    );
}
