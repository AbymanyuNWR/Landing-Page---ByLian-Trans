"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Ticket, CalendarDays, Bus, Users, Map, Tag, MessageSquare, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_MENU = [
    { href: "/admin", icon: LayoutDashboard, label: "Overview" },
    { href: "/admin/booking", icon: Ticket, label: "Data Booking" },
    { href: "/admin/jadwal", icon: CalendarDays, label: "Manajemen Jadwal" },
    { href: "/admin/rute", icon: Map, label: "Rute & Harga" },
    { href: "/admin/armada", icon: Bus, label: "Armada Bus" },
    { href: "/admin/penumpang", icon: Users, label: "Penumpang" },
    { href: "/admin/promo", icon: Tag, label: "Promo & Loyalty" },
    { href: "/admin/pesan-masuk", icon: MessageSquare, label: "Pesan Masuk" },
    { href: "/admin/pengaturan", icon: Settings, label: "Pengaturan" },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex-shrink-0 bg-slate-900 text-slate-300 min-h-screen relative flex flex-col hidden lg:flex border-r border-slate-800">
            <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800 text-white font-bold text-xl tracking-wide">
                BYLIAN<span className="text-primary font-black ml-1">ADMIN</span>
            </div>

            <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3">
                {ADMIN_MENU.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm",
                                isActive
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950">
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm w-full text-red-400 hover:bg-red-400/10 hover:text-red-300">
                    <LogOut className="w-5 h-5" />
                    Keluar
                </button>
            </div>
        </aside>
    );
}
