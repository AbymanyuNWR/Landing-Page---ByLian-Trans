"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Bell, User, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Beranda", href: "/" },
        { name: "Rute", href: "/rute" },
        { name: "Armada", href: "/armada" },
        { name: "Tracking", href: "/tracking" },
        { name: "Agen", href: "/agen" },
        { name: "Charter", href: "/charter" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary text-white p-2 rounded-xl">
                            <Bus size={28} />
                        </div>
                        <div className="flex flex-col">
                            <span className={cn(
                                "font-heading font-bold text-xl leading-tight tracking-tight",
                                isScrolled ? "text-slate-900 dark:text-white" : "text-white drop-shadow-md"
                            )}>
                                Bylian Trans
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        <ul className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-sm font-medium transition-colors hover:text-primary",
                                            isScrolled ? "text-slate-600 dark:text-slate-300" : "text-white/90 drop-shadow-sm hover:text-white"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-4 border-l pl-4 border-slate-200 dark:border-slate-700">
                            <Link href="/pesan">
                                <Button className="rounded-full shadow-lg shadow-primary/30 font-semibold px-6">
                                    Pesan Tiket
                                </Button>
                            </Link>
                            <Button size="icon" variant="ghost" className={isScrolled ? "text-slate-600" : "text-white hover:text-slate-900"}>
                                <User size={20} />
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className={isScrolled ? "text-slate-900" : "text-white"} size={28} />
                        ) : (
                            <Menu className={isScrolled ? "text-slate-900" : "text-white"} size={28} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-900 border-b shadow-xl py-4 px-4 flex flex-col gap-4 animate-accordion-down origin-top">
                    <ul className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="block py-3 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link href="/pesan" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full mt-2 h-12 text-base">Pesan Tiket</Button>
                    </Link>
                </div>
            )}
        </nav>
    );
}
