"use client";

import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: "/pesan", label: "Pilih Jadwal", stepNum: 1 },
    { id: "/pesan/kursi", label: "Pilih Kursi", stepNum: 2 },
    { id: "/pesan/data-penumpang", label: "Isi Data", stepNum: 3 },
    { id: "/pesan/pembayaran", label: "Bayar", stepNum: 4 },
];

export function BookingStepIndicator() {
    const pathname = usePathname();

    // Exclude rendering if not in booking flow or if success
    if (!pathname.startsWith("/pesan") || pathname.includes("/sukses")) return null;

    const currentStepNum = STEPS.find(s => s.id === pathname)?.stepNum || 1;

    return (
        <div className="w-full max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full" />

                {/* Active Line Progress calculation */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500 ease-out"
                    style={{ width: `${((currentStepNum - 1) / (STEPS.length - 1)) * 100}%` }}
                />

                {STEPS.map((step) => {
                    const isCompleted = step.stepNum < currentStepNum;
                    const isActive = step.stepNum === currentStepNum;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2">
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm",
                                    isActive ? "bg-primary text-white scale-110 ring-4 ring-primary/20" :
                                        isCompleted ? "bg-primary text-white" :
                                            "bg-white border-2 border-slate-200 text-slate-400"
                                )}
                            >
                                {isCompleted ? <Check className="w-4 h-4" /> : step.stepNum}
                            </div>
                            <span
                                className={cn(
                                    "text-xs font-semibold whitespace-nowrap absolute -bottom-6",
                                    isActive ? "text-primary" : "text-slate-400 hidden md:block",
                                    isCompleted ? "text-slate-700 hidden md:block" : ""
                                )}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="h-6 block md:hidden" /> {/* Spacer for mobile absolute labels */}
        </div>
    );
}
