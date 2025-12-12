"use client";

import React from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { ChevronRight, Phone, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt="Garage automobile"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse" />
              Expert Pneus & Mécanique
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Votre véhicule mérite
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              le meilleur service
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-300 mb-10 leading-relaxed"
          >
            Spécialistes en pneumatiques et services mécaniques complets. 
            Qualité professionnelle, prix compétitifs et service rapide pour tous vos besoins automobiles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href={createPageUrl("Appointment")}>
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 h-14 text-base shadow-lg shadow-amber-500/25 transition-all hover:shadow-amber-500/40">
                <Calendar className="w-5 h-5 mr-2" />
                Prendre rendez-vous
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="tel:+33123456789">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 h-14 text-base">
                <Phone className="w-5 h-5 mr-2" />
                Nous appeler
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
      />
    </section>
  );
}
