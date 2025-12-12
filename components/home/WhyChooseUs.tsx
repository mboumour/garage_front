"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Shield, Clock, Award, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Garantie Qualité",
    description: "Tous nos travaux sont garantis. Pièces d'origine et équipements premium."
  },
  {
    icon: Clock,
    title: "Service Rapide",
    description: "Intervention rapide sans compromettre la qualité. Respect des délais."
  },
  {
    icon: Award,
    title: "Expertise Reconnue",
    description: "Plus de 15 ans d'expérience. Techniciens certifiés et formés."
  },
  {
    icon: ThumbsUp,
    title: "Prix Transparents",
    description: "Devis gratuit et détaillé. Aucune surprise sur la facture finale."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-semibold text-sm tracking-wider uppercase">
            Pourquoi nous choisir
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            La confiance de nos clients depuis 15 ans
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Notre engagement : un service irréprochable et une satisfaction client totale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
                <feature.icon className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-700/50 pt-12"
        >
          {[
            { value: "15+", label: "Années d'expérience" },
            { value: "5000+", label: "Clients satisfaits" },
            { value: "10000+", label: "Pneus montés" },
            { value: "98%", label: "Taux de satisfaction" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
