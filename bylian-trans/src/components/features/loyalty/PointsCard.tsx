"use client";

import { Award, Target, Trophy, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PointsCardProps {
    points: number;
    level: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
    nextLevelThreshold?: number;
}

export function LevelBadge({ level, className }: { level: string, className?: string }) {
    const styles: Record<string, string> = {
        BRONZE: "bg-[#cd7f32] text-white",
        SILVER: "bg-slate-300 text-slate-800",
        GOLD: "bg-amber-400 text-amber-900 border border-amber-500",
        PLATINUM: "bg-slate-900 text-white border border-slate-700 shadow-xl",
    };

    return (
        <span className={cn("px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase flex items-center justify-center gap-1", styles[level], className)}>
            <Award className="w-3.5 h-3.5" /> {level}
        </span>
    );
}

export function PointsCard({ points = 2500, level = "GOLD", nextLevelThreshold = 5000 }: PointsCardProps) {
    const progressPercent = Math.min((points / nextLevelThreshold) * 100, 100);

    return (
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
            {/* Decorative patterns */}
            <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-1000">
                <Trophy className="w-64 h-64" />
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-white/80 text-sm font-medium mb-1">Total Poin Bylian</p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">{points.toLocaleString("id-ID")}</h2>
                    </div>
                    <LevelBadge level={level} />
                </div>

                {level !== "PLATINUM" && (
                    <div className="mb-6">
                        <div className="flex justify-between text-xs font-medium text-white/80 mb-2">
                            <span className="flex items-center gap-1"><Target className="w-3 h-3" /> Progress ke {level === "GOLD" ? "PLATINUM" : "GOLD"}</span>
                            <span>{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-amber-300 to-amber-500 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-white/60 mt-2">Dapatkan {nextLevelThreshold - points} poin lagi untuk naik kelas.</p>
                    </div>
                )}

                <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-2">
                    <p className="text-xs text-white/80 flex-1 max-w-[200px] leading-relaxed hidden sm:block">
                        Tukar poin Anda dengan tiket gratis atau voucher diskon perjalanan senilai hingga Rp 1.000.000!
                    </p>
                    <Link href="/akun/poin" className="flex items-center gap-2 bg-white text-primary hover:bg-slate-50 px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-lg shrink-0">
                        Tukar Berhadiah <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
