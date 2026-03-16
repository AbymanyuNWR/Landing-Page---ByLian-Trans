"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Ticket, CalendarDays, Bus, Users, Map, Tag, MessageSquare, Settings, LogOut, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ADMIN_MENU = [
    { href: "/admin", icon: LayoutDashboard, label: "Overview", roles: ["SUPER_ADMIN", "KASIR"] },
    { href: "/admin/booking", icon: Ticket, label: "Data Booking", roles: ["SUPER_ADMIN", "KASIR"] },
    { href: "/admin/jadwal", icon: CalendarDays, label: "Manajemen Jadwal", roles: ["SUPER_ADMIN", "KASIR"] },
    { href: "/admin/rute", icon: Map, label: "Rute & Harga", roles: ["SUPER_ADMIN"] },
    { href: "/admin/armada", icon: Bus, label: "Armada Bus", roles: ["SUPER_ADMIN"] },
    { href: "/admin/penumpang", icon: Users, label: "Penumpang", roles: ["SUPER_ADMIN", "KASIR"] },
    { href: "/admin/promo", icon: Tag, label: "Promo & Loyalty", roles: ["SUPER_ADMIN"] },
    { href: "/admin/pesan-masuk", icon: MessageSquare, label: "Pesan Masuk", roles: ["SUPER_ADMIN"] },
    { href: "/admin/pengaturan", icon: Settings, label: "Pengaturan", roles: ["SUPER_ADMIN", "KASIR"] },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [role, setRole] = useState<"SUPER_ADMIN" | "KASIR">("SUPER_ADMIN");

    const filteredMenu = ADMIN_MENU.filter(item => item.roles.includes(role));

    return (
        <aside className="w-64 flex-shrink-0 bg-slate-900 text-slate-300 min-h-screen relative flex flex-col hidden lg:flex border-r border-slate-800">
            <div className="h-16 flex flex-col justify-center px-6 bg-slate-950 border-b border-slate-800 border-t-0">
                <div className="text-white font-bold text-xl tracking-wide leading-none">
                    BYLIAN<span className="text-primary font-black ml-1">ADMIN</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3">
                {filteredMenu.map((item) => {
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

            <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-3">
                {/* Role Switcher (Simulation) */}
                <div className="bg-slate-800 rounded-lg p-2 flex flex-col gap-2">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-1 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> Simulasi Hak Akses
                    </p>
                    <div className="flex bg-slate-900 rounded-md p-0.5 relative">
                        {/* Selected Indicator */}
                        <div
                            className={cn(
                                "absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-md bg-white shadow-sm transition-transform duration-300 ease-in-out",
                                role === "KASIR" ? "translate-x-full ml-1" : "translate-x-0"
                            )}
                        />
                        <button
                            onClick={() => setRole("SUPER_ADMIN")}
                            className={cn("flex-1 text-xs py-1.5 font-bold z-10 transition-colors", role === "SUPER_ADMIN" ? "text-slate-900" : "text-slate-400")}
                        >
                            Super Admin
                        </button>
                        <button
                            onClick={() => setRole("KASIR")}
                            className={cn("flex-1 text-xs py-1.5 font-bold z-10 transition-colors", role === "KASIR" ? "text-slate-900" : "text-slate-400")}
                        >
                            Kasir
                        </button>
                    </div>
                </div>

                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm w-full text-red-400 hover:bg-red-400/10 hover:text-red-300">
                    <LogOut className="w-5 h-5" />
                    Keluar
                </button>
            </div>
        </aside>
    );
}
