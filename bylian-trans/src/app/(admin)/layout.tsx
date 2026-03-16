"use client";

import { ReactNode } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-100/50 flex flex-col md:flex-row font-sans">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto w-full max-w-[100vw] overflow-x-hidden">
                <div className="min-h-full p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
