"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  CircleDot, 
  Wrench, 
  Gauge, 
  Droplets, 
  Battery, 
  Sparkles,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: CircleDot,
    title: "Pneus",
    description: "Vente, montage et réparation de tous types de pneumatiques",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: Wrench,
    title: "Mécanique",
    description: "Réparations et entretien mécanique complet",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Gauge,
    title: "Diagnostic",
    description: "Diagnostic électronique de précision",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: Droplets,
    title: "Vidange",
    description: "Vidange huile moteur et tous fluides",
    color: "from-purple-500 to-violet-600"
  },
  {
    icon: Battery,
    title: "Batterie",
    description: "Test, recharge et remplacement de batterie",
    color: "from-rose-500 to-pink-600"
  },
  {
    icon: Sparkles,
    title: "Lavage",
    description: "Lavage intérieur et extérieur complet",
    color: "from-cyan-500 to-blue-600"
  }
];

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
            Nos Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Expertise complète pour votre véhicule
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Du simple contrôle de pression aux réparations mécaniques complexes, 
            nous prenons soin de votre véhicule avec professionnalisme.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-slate-200 h-full">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button variant="outline" size="lg" className="group border-slate-300 hover:border-amber-500 hover:text-amber-600">
              Voir tous nos services
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
