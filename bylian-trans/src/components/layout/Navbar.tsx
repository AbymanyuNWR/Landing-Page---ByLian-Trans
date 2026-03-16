"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Bell, User, Bus, Phone } from "lucide-react";
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
        { name: "Rute & Harga", href: "/rute-harga" },
        { name: "Armada", href: "/armada" },
        { name: "Tracking", href: "/tracking" },
        { name: "Charter", href: "/charter" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500",
                isScrolled
                    ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/30 border-b border-slate-200/50 dark:border-slate-800/50 py-1"
                    : "bg-transparent py-3"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20 transition-all duration-300">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-2.5 rounded-2xl shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                                <Bus size={26} />
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-blue-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className={cn(
                                "font-heading font-bold text-xl leading-tight tracking-tight",
                                isScrolled ? "text-slate-900 dark:text-white" : "text-white drop-shadow-md"
                            )}>
                                Bylian Trans
                            </span>
                            <span className={cn(
                                "text-xs tracking-wider",
                                isScrolled ? "text-slate-500" : "text-white/70"
                            )}>
                                PREMIUM BUS
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-4 xl:gap-8">
                        <ul className="flex items-center gap-0.5 xl:gap-1 text-sm">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "px-3 xl:px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap",
                                            isScrolled ? "text-slate-600 dark:text-slate-300 hover:text-primary" : "text-white/90 hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-2 xl:gap-3 pl-4 border-l border-slate-200/50 dark:border-slate-700/50">
                            {/* WhatsApp CTA */}
                            <a 
                                href="https://wa.me/6281234567890" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={cn(
                                    "hidden xl:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300",
                                    isScrolled 
                                        ? "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" 
                                        : "text-green-400 hover:bg-white/10"
                                )}
                            >
                                <Phone size={16} />
                                <span>WhatsApp</span>
                            </a>
                            
                            <Link href="/pesan">
                                <Button className="rounded-xl font-semibold px-4 xl:px-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary">
                                    Pesan Tiket
                                </Button>
                            </Link>
                            <Button size="icon" variant="ghost" className={cn(
                                "rounded-xl flex-shrink-0",
                                isScrolled ? "text-slate-600 hover:text-primary hover:bg-slate-100" : "text-white hover:text-white hover:bg-white/10"
                            )}>
                                <User size={20} />
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={cn(
                            "lg:hidden p-2.5 rounded-xl transition-all duration-300",
                            isScrolled ? "bg-slate-100 dark:bg-slate-800 text-slate-900" : "bg-white/10 text-white"
                        )}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-900 border-b shadow-2xl py-6 px-4 flex flex-col gap-4 animate-scale-in">
                    <ul className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="block py-3 px-5 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-primary/10 hover:text-primary transition-all duration-300"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                        <a 
                            href="https://wa.me/6281234567890" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 py-3 px-5 rounded-xl text-green-600 font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 mb-3"
                        >
                            <Phone size={18} />
                            <span>Hubungi WhatsApp</span>
                        </a>
                        
                        <Link href="/pesan" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="w-full h-12 text-base rounded-xl bg-gradient-to-r from-primary to-blue-600 shadow-lg">
                                Pesan Tiket
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

