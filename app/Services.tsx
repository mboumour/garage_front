"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { 
  CircleDot, 
  Wrench, 
  Gauge, 
  Droplets, 
  Battery, 
  Sparkles,
  Disc,
  Wind,
  Settings,
  Car,
  RefreshCw,
  Shield,
  Calendar,
  CheckCircle
} from "lucide-react";

const serviceCategories = [
  {
    title: "Pneumatiques",
    description: "Notre spécialité principale - tout pour vos pneus",
    services: [
      {
        icon: CircleDot,
        name: "Vente de pneus",
        description: "Large gamme de pneus toutes marques : été, hiver, 4 saisons. Conseils personnalisés selon votre usage.",
        features: ["Toutes marques", "Pneus été/hiver", "4 saisons", "Prix compétitifs"]
      },
      {
        icon: Settings,
        name: "Montage & Équilibrage",
        description: "Montage professionnel avec équilibrage de précision pour un confort de conduite optimal.",
        features: ["Montage rapide", "Équilibrage précis", "Valves neuves", "Contrôle pression"]
      },
      {
        icon: RefreshCw,
        name: "Réparation de pneus",
        description: "Réparation de crevaisons selon les normes constructeur. Diagnostic avant réparation.",
        features: ["Crevaisons", "Flancs", "Diagnostic complet", "Garantie réparation"]
      },
      {
        icon: Wind,
        name: "Gonflage & Pression",
        description: "Contrôle et ajustement de la pression selon les préconisations constructeur.",
        features: ["Azote disponible", "Pression optimale", "Contrôle gratuit", "Conseil personnalisé"]
      }
    ]
  },
  {
    title: "Mécanique Générale",
    description: "Entretien et réparations pour tous types de véhicules",
    services: [
      {
        icon: Droplets,
        name: "Vidange",
        description: "Vidange huile moteur avec remplacement du filtre à huile. Huiles de qualité premium.",
        features: ["Huiles premium", "Filtres d&apos;origine", "Toutes motorisations", "Carnet d&apos;entretien"]
      },
      {
        icon: Gauge,
        name: "Diagnostic électronique",
        description: "Lecture des codes défaut et diagnostic complet de votre véhicule avec équipement professionnel.",
        features: ["Lecture défauts", "Effacement voyants", "Rapport détaillé", "Toutes marques"]
      },
      {
        icon: Disc,
        name: "Freins & Plaquettes",
        description: "Remplacement des disques et plaquettes de frein. Contrôle complet du système de freinage.",
        features: ["Disques & plaquettes", "Liquide de frein", "Contrôle complet", "Pièces qualité"]
      },
      {
        icon: Wrench,
        name: "Réparations diverses",
        description: "Petites et moyennes réparations mécaniques. Devis gratuit avant intervention.",
        features: ["Courroies", "Amortisseurs", "Échappement", "Embrayage"]
      }
    ]
  },
  {
    title: "Services Complémentaires",
    description: "Pour un entretien complet de votre véhicule",
    services: [
      {
        icon: Battery,
        name: "Batterie",
        description: "Test de batterie, recharge et remplacement. Large stock de batteries toutes capacités.",
        features: ["Test gratuit", "Recharge", "Remplacement", "Toutes marques"]
      },
      {
        icon: Sparkles,
        name: "Lavage complet",
        description: "Nettoyage intérieur et extérieur de votre véhicule. Plusieurs formules disponibles.",
        features: ["Extérieur", "Intérieur", "Moteur", "Finition"]
      },
      {
        icon: Car,
        name: "Climatisation",
        description: "Recharge de climatisation et contrôle du circuit. Gaz R134a et R1234yf.",
        features: ["Recharge gaz", "Contrôle fuite", "Désinfection", "Tous véhicules"]
      },
      {
        icon: Shield,
        name: "Contrôle pré-CT",
        description: "Vérification complète avant passage au contrôle technique. Liste des points à corriger.",
        features: ["Check-up complet", "Rapport détaillé", "Conseils", "Économies"]
      }
    ]
  }
];

export default function Services() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
              Nos Prestations
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Tous nos services
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Une gamme complète de services pour l&apos;entretien et la réparation de votre véhicule
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services by Category */}
      {serviceCategories.map((category, categoryIndex) => (
        <section 
          key={category.title} 
          className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {category.title}
              </h2>
              <p className="text-slate-600 text-lg">
                {category.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {service.name}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <span 
                            key={feature}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Besoin d&apos;un de ces services ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Prenez rendez-vous en ligne ou demandez un devis gratuit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={createPageUrl("Appointment")}>
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-14 text-base">
                  <Calendar className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Button>
              </Link>
              <Link href={createPageUrl("Contact")}>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 h-14 text-base">
                  Demander un devis
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
