"use client";

import { ReactNode } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-full overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
