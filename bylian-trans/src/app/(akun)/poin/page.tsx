"use client";

import { PointsCard } from "@/components/features/loyalty/PointsCard";
import { PointsHistory } from "@/components/features/loyalty/PointsHistory";
import { RedeemPointsForm } from "@/components/features/loyalty/RedeemPointsForm";
import { LoyaltyBenefitsUI } from "@/components/features/loyalty/LoyaltyBenefitsUI";

export default function PoinMemberPage() {
    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800">Bylian Poin</h1>
                <p className="text-sm text-slate-500 mt-1">Kumpulkan poin di setiap perjalanan dan tukarkan dengan berbagai benefit menarik.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <PointsCard points={2500} level="Platinum Sahaja" nextLevel="VIP" progress={80} />

                <div className="mt-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Member Benefits & Progress</h2>
                    <LoyaltyBenefitsUI />
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Tukarkan Poin Anda</h2>
                    <RedeemPointsForm currentPoints={2500} />
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Riwayat Poin</h2>
                    <PointsHistory />
                </div>
            </div>
        </div>
    );
}
