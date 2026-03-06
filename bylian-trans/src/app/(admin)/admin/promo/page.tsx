"use client";

import { PromoForm } from "@/components/features/admin/PromoForm";
import { NotificationBlast } from "@/components/features/admin/NotificationBlast";

export default function AdminPromoPage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Marketing & Promo</h1>
                <p className="text-slate-500 text-sm mt-1">Kelola kampanye marketing, diskon, dan blast pesan pelanggan.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="h-full">
                    <PromoForm />
                </div>
                <div className="h-full">
                    <NotificationBlast />
                </div>
            </div>
        </div>
    );
}
