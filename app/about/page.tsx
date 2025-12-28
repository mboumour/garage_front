"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, Users, Clock, Wrench, Calendar, CheckCircle } from "lucide-react";

export default function About() {
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
              Notre Histoire
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              À propos de GaragePro
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Plus de 15 ans d&apos;expertise au service de votre véhicule
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Une passion transmise de génération en génération
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Fondé en 2009, GaragePro est né de la passion d&apos;un mécanicien pour l&apos;automobile 
                  et de sa volonté d&apos;offrir un service de qualité à des prix justes.
                </p>
                <p>
                  Ce qui a commencé comme un petit atelier de montage de pneus est devenu 
                  aujourd&apos;hui un garage complet, reconnu pour son expertise et son 
                  professionnalisme.
                </p>
                <p>
                  Notre équipe de techniciens qualifiés se forme continuellement aux nouvelles 
                  technologies automobiles pour vous offrir les meilleurs services, que vous 
                  conduisiez une citadine ou un SUV.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  "Équipe certifiée",
                  "Équipement moderne",
                  "Pièces d&apos;origine",
                  "Garantie travaux"
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80"
                  alt="Notre équipe"
                  width={800}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">15+</div>
                    <div className="text-slate-600 text-sm">Années d&apos;expérience</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Nos valeurs
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Les principes qui guident notre travail au quotidien
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Qualité",
                description: "Nous utilisons uniquement des pièces et équipements de qualité professionnelle."
              },
              {
                icon: Users,
                title: "Écoute",
                description: "Chaque client est unique. Nous prenons le temps de comprendre vos besoins."
              },
              {
                icon: Clock,
                title: "Ponctualité",
                description: "Nous respectons les délais annoncés et votre temps est précieux."
              },
              {
                icon: Wrench,
                title: "Expertise",
                description: "Formation continue et équipements modernes pour un service optimal."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Notre équipe
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Des professionnels passionnés à votre service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Jean Dupont",
                role: "Fondateur & Chef d&apos;atelier",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
                experience: "20 ans d&apos;expérience"
              },
              {
                name: "Marc Martin",
                role: "Spécialiste Pneumatiques",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
                experience: "12 ans d&apos;expérience"
              },
              {
                name: "Sophie Bernard",
                role: "Responsable Clientèle",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
                experience: "8 ans d&apos;expérience"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={320}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-amber-400 text-sm font-medium">
                      {member.experience}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-slate-600">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Prêt à nous faire confiance ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Venez découvrir notre garage et rencontrer notre équipe
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointment">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-14 text-base">
                  <Calendar className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Button>
              </Link>
              <Link href="/location">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 h-14 text-base">
                  Nous trouver
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
