"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur");

      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert("Une erreur est survenue. Réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isSuccess) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-12 shadow-xl text-center max-w-md mx-4"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Message envoyé !
          </h2>
          <p className="text-slate-600 mb-8">
            Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
          </p>
          <Button 
            onClick={() => {
              setIsSuccess(false);
              setFormData({ name: '', email: '', subject: '', message: '' });
            }}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900"
          >
            Envoyer un autre message
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
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
              Contact
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Une question ? Besoin d&apos;un devis ? Notre équipe est à votre écoute
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Nos coordonnées
              </h2>
              <p className="text-slate-600 mb-10 leading-relaxed">
                N&apos;hésitez pas à nous contacter par téléphone, email ou en remplissant 
                le formulaire. Nous vous répondrons dans les plus brefs délais.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Téléphone</h3>
                    <a href="tel:+33627200811" className="text-amber-600 hover:text-amber-700 text-lg font-medium">
                      06 27 20 08 11
                    </a>
                      <p className="text-slate-500 text-sm mt-1">
                        Tous les jours : 9h – 19h <br />
                        Pause le vendredi : 12h – 14h
                      </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <a href="mailto:contact@garagepro.fr" className="text-amber-600 hover:text-amber-700 text-lg font-medium">
                      contact@garagepro.fr
                    </a>
                    <p className="text-slate-500 text-sm mt-1">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Adresse</h3>
                    <p className="text-slate-700">
                      5 impasse des hirondelles<br />
                      33700 Merignac
                    </p>
                    <p className="text-slate-500 text-sm mt-1">Parking gratuit</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Horaires d&apos;ouverture</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                      <span className="text-slate-600">Lundi - Dimanche</span>
                      <span className="text-slate-900 font-medium">9h00 - 19h00</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-slate-50 rounded-2xl p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Envoyez-nous un message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jean Dupont"
                        required
                        className="h-12 bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jean@exemple.fr"
                        required
                        className="h-12 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                    >
                      <SelectTrigger className="h-12 bg-white">
                        <SelectValue placeholder="Sélectionnez un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="devis">Demande de devis</SelectItem>
                        <SelectItem value="info">Information services</SelectItem>
                        <SelectItem value="rdv">Rendez-vous</SelectItem>
                        <SelectItem value="reclamation">Réclamation</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Décrivez votre demande..."
                      required
                      className="min-h-[150px] bg-white resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
