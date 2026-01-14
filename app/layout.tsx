import type { Metadata } from "next";
import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "France Pneu",
  description: "Services de garage et pneumatiques à Bordeaux",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-slate-900">
        <ReactQueryProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
