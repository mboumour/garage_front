"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Calendar, X } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Accueil", page: "/" },
  { name: "Services", page: "services" },
  { name: "À propos", page: "about" },
  { name: "Localisation", page: "location" },
  { name: "Contact", page: "contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (page: string) => {
    return pathname === page;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-500">
              <span className="text-slate-900 font-bold text-xl">G</span>
            </div>
            <span
              className={`text-xl font-bold transition-colors ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}
            >
              GaragePro
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                href={link.page}
                className={`text-sm font-medium transition-colors relative ${
                  isScrolled
                    ? isActive(link.page)
                      ? "text-amber-600"
                      : "text-slate-600 hover:text-amber-600"
                    : isActive(link.page)
                    ? "text-amber-400"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
                {isActive(link.page) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+33123456789"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isScrolled ? "text-slate-600 hover:text-amber-600" : "text-white/90 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              01 23 45 67 89
            </a>
            <Link href="/appointment">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                <Calendar className="w-4 h-4 mr-2" />
                Rendez-vous
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`lg:hidden ${isScrolled ? "text-slate-900" : "text-white"}`}
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative ml-auto h-full w-80 bg-slate-900 text-white shadow-2xl">
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-xl">G</span>
                </div>
                <span className="text-xl font-bold">GaragePro</span>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    href={link.page}
                    className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(link.page)
                        ? "bg-amber-500/10 text-amber-400"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-6 border-t border-slate-800 space-y-4">
              <a href="tel:+33123456789" className="flex items-center justify-center gap-2 text-white py-3">
                <Phone className="w-5 h-5" />
                01 23 45 67 89
              </a>
              <Link href="/appointment" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold h-12">
                  <Calendar className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
