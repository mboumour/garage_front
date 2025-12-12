"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Phone, Mail, MapPin, Clock, Navigation, Calendar } from "lucide-react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const garageLocation = {
  lat: 48.8566,
  lng: 2.3522,
  address: "123 Avenue des Pneus",
  city: "75001 Paris"
};

const openingHours = [
  { day: "Lundi", hours: "8h00 - 19h00", isOpen: true },
  { day: "Mardi", hours: "8h00 - 19h00", isOpen: true },
  { day: "Mercredi", hours: "8h00 - 19h00", isOpen: true },
  { day: "Jeudi", hours: "8h00 - 19h00", isOpen: true },
  { day: "Vendredi", hours: "8h00 - 19h00", isOpen: true },
  { day: "Samedi", hours: "9h00 - 17h00", isOpen: true },
  { day: "Dimanche", hours: "Fermé", isOpen: false }
];

export default function Location() {
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });

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
              Localisation
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Nous trouver
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Venez nous rendre visite dans notre garage au cœur de Paris
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map & Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl h-[500px]"
            >
              <MapContainer 
                center={[garageLocation.lat, garageLocation.lng]} 
                zoom={15} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[garageLocation.lat, garageLocation.lng]}>
                  <Popup>
                    <div className="font-semibold">GaragePro</div>
                    <div className="text-sm">{garageLocation.address}</div>
                    <div className="text-sm">{garageLocation.city}</div>
                  </Popup>
                </Marker>
              </MapContainer>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Address Card */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Adresse</h3>
                </div>
                <p className="text-slate-700 mb-4">
                  {garageLocation.address}<br />
                  {garageLocation.city}
                </p>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${garageLocation.lat},${garageLocation.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900">
                    <Navigation className="w-4 h-4 mr-2" />
                    Itinéraire
                  </Button>
                </a>
              </div>

              {/* Contact Card */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Contact</h3>
                </div>
                <div className="space-y-3">
                  <a href="tel:+33123456789" className="flex items-center gap-3 text-slate-700 hover:text-amber-600 transition-colors">
                    <Phone className="w-4 h-4" />
                    01 23 45 67 89
                  </a>
                  <a href="mailto:contact@garagepro.fr" className="flex items-center gap-3 text-slate-700 hover:text-amber-600 transition-colors">
                    <Mail className="w-4 h-4" />
                    contact@garagepro.fr
                  </a>
                </div>
              </div>

              {/* Quick RDV */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-2">Besoin d&apos;un service ?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Réservez votre créneau en ligne
                </p>
                <Link href={createPageUrl("Appointment")}>
                  <Button className="w-full bg-white text-amber-600 hover:bg-slate-100">
                    <Calendar className="w-4 h-4 mr-2" />
                    Prendre RDV
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Opening Hours Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-amber-500" />
              <h2 className="text-3xl font-bold text-slate-900">
                Horaires d&apos;ouverture
              </h2>
            </div>
            <p className="text-slate-600">
              Nous sommes ouverts 6 jours sur 7 pour vous accueillir
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            {openingHours.map((item, index) => {
              const isToday = today.toLowerCase() === item.day.toLowerCase();
              return (
                <div 
                  key={item.day}
                  className={`flex items-center justify-between p-5 ${
                    index !== openingHours.length - 1 ? 'border-b border-slate-100' : ''
                  } ${isToday ? 'bg-amber-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-medium ${isToday ? 'text-amber-700' : 'text-slate-900'}`}>
                      {item.day}
                    </span>
                    {isToday && (
                      <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full">
                        Aujourd&apos;hui
                      </span>
                    )}
                  </div>
                  <span className={item.isOpen ? 'text-slate-700 font-medium' : 'text-slate-400'}>
                    {item.hours}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 grid sm:grid-cols-3 gap-6"
          >
            {[
              { icon: "🅿️", title: "Parking gratuit", desc: "Places disponibles" },
              { icon: "♿", title: "Accès PMR", desc: "Entrée adaptée" },
              { icon: "☕", title: "Espace attente", desc: "Café offert" }
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-medium text-slate-900">{item.title}</h4>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
