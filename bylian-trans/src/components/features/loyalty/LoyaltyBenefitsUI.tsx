"use client";

import { useEffect, useState } from "react";
import { getUserLoyaltyAction } from "@/actions/loyalty";
import { Check, Star, Shield, Zap, Gift } from "lucide-react";

export function LoyaltyBenefitsUI() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUserLoyaltyAction().then(res => {
            if (res.success) setData(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <div className="h-48 bg-slate-50 animate-pulse rounded-3xl" />;
    if (!data) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <Zap className="w-32 h-32 text-primary" />
                    </div>
                    <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" /> Multiplier & Benefits
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data.benefits.map((benefit: any, i: number) => (
                            <div 
                                key={i} 
                                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${benefit.active ? 'bg-primary/5 border-primary/20' : 'bg-slate-50 border-slate-100 opacity-50'}`}
                            >
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${benefit.active ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
                                    {benefit.active ? <Check className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                                </div>
                                <div>
                                    <p className={`text-sm font-bold ${benefit.active ? 'text-slate-800' : 'text-slate-400'}`}>{benefit.name}</p>
                                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Min. {benefit.min}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-3xl text-white shadow-xl shadow-primary/20 flex flex-col justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-70">Current Tier</p>
                    <h2 className="text-4xl font-black mt-1">{data.loyaltyLevel}</h2>
                    <div className="mt-6 space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                            <span>Points: {data.loyaltyPoints.toLocaleString()}</span>
                            <span>{data.nextTier}</span>
                        </div>
                        <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white transition-all duration-1000" style={{ width: `${data.progress}%` }} />
                        </div>
                        <p className="text-[10px] opacity-70 mt-2 italic">* {Math.round(data.progress)}% progress ke level berikutnya</p>
                    </div>
                </div>
                
                <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-xs font-bold flex items-center gap-2">
                        <Star className="w-4 h-4 fill-white" /> Special Zenith Offer
                    </p>
                    <p className="text-[10px] opacity-80 mt-1 leading-relaxed">
                        Anda mendapatkan multiplier poin 1.2x karena streak perjalanan Anda aktif!
                    </p>
                </div>
            </div>
        </div>
    );
}
