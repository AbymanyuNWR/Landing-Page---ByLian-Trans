import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string;
    icon: ReactNode;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    className?: string;
}

export function StatsCard({ title, value, icon, trend, className }: StatsCardProps) {
    return (
        <div className={cn("bg-white p-6 rounded-2xl border border-slate-200 shadow-sm", className)}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 font-medium text-sm">{title}</h3>
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-2xl font-black text-slate-800">{value}</p>
                {trend && (
                    <p className="text-xs mt-2 font-medium flex items-center gap-1">
                        <span className={trend.isPositive ? "text-green-600" : "text-red-500"}>
                            {trend.isPositive ? "+" : "-"}{trend.value}
                        </span>
                        <span className="text-slate-400">vs bulan lalu</span>
                    </p>
                )}
            </div>
        </div>
    );
}
