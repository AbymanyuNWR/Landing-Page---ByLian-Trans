"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Ticket, MapPin, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { href: "/", icon: Home, label: "Beranda" },
    { href: "/pesan", icon: Search, label: "Cari" },
    { href: "/tracking", icon: MapPin, label: "Lacak" },
    { href: "/akun/tiket", icon: Ticket, label: "Tiket" },
    { href: "/akun", icon: User, label: "Akun" },
];

export function MobileBottomNav() {
    const pathname = usePathname();

    // Hide on admin routes or auth
    if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
        return null;
    }

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 pb-safe">
            <nav className="flex justify-between px-2 py-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full min-w-[64px] py-1 transition-colors relative",
                                isActive ? "text-primary" : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            <item.icon className="w-6 h-6 mb-1" />
                            <span className="text-[10px] font-medium leading-none">{item.label}</span>
                            {isActive && (
                                <div className="absolute top-0 w-8 h-[3px] rounded-b-md bg-primary" />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
