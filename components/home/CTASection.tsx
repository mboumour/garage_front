"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, MessageSquare } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-500 via-amber-500 to-orange-600 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Besoin d&apos;un service pour votre véhicule ?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Prenez rendez-vous en ligne ou contactez-nous pour un devis gratuit. 
            Notre équipe vous répond rapidement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointment">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-14 text-base shadow-xl">
                <Calendar className="w-5 h-5 mr-2" />
                Prendre rendez-vous
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 h-14 text-base">
                <MessageSquare className="w-5 h-5 mr-2" />
                Nous contacter
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
