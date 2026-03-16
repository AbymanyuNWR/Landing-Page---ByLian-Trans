"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Ticket, Award, Settings, LogOut, Bus } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { href: "/profil", icon: User, label: "Profil Saya" },
    { href: "/tiket-saya", icon: Ticket, label: "Tiket Saya" },
    { href: "/poin", icon: Award, label: "Bylian Poin" },
    { href: "/pengaturan", icon: Settings, label: "Pengaturan" },
];

export default function AkunLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pt-24"> {/* Added pt-24 to offset the main Navbar */}
            {/* Sidebar */}
            <aside className="w-full md:w-64 lg:w-72 bg-white border-r border-slate-200 shrink-0 md:h-[calc(100vh-6rem)] md:sticky md:top-24 z-20 flex flex-col md:rounded-tr-3xl md:rounded-br-3xl shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)] transition-all duration-300">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                        <Bus className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="font-black text-slate-800 tracking-tight leading-none text-lg">Bylian</h2>
                        <p className="text-primary font-bold text-[10px] tracking-widest uppercase">Member</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible hide-scrollbar">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ease-in-out whitespace-nowrap group",
                                    isActive
                                        ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                                )}
                            >
                                <Icon className={cn("w-5 h-5 shrink-0 transition-transform duration-300", !isActive && "group-hover:scale-110")} />
                                <span className="md:block">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-slate-100 md:mb-0 mb-safe">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-colors">
                        <LogOut className="w-5 h-5" /> Keluar
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 w-full max-w-[100vw] overflow-x-hidden">
                <div className="max-w-5xl mx-auto transition-all duration-500 ease-in-out">
                    {children}
                </div>
            </main>
        </div>
    );
}
