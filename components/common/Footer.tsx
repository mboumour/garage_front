'use client';

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-xl">FP</span>
              </div>
              <span className="text-xl font-bold text-white">France Pneu</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Votre spécialiste en pneumatiques et services automobiles. 
              Qualité, rapidité et professionnalisme depuis plus de 15 ans.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Navigation</h3>
            <ul className="space-y-3">
              {[
                { name: "Accueil", page: "Home" },
                { name: "Services", page: "Services" },
                { name: "À propos", page: "About" },
                { name: "Contact", page: "Contact" },
                { name: "Rendez-vous", page: "Appointment" }
              ].map((link) => (
                <li key={link.page}>
                  <Link 
                    href={link.page} 
                    className="hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Nos Services</h3>
            <ul className="space-y-3">
              {[
                "Pneus & Montage",
                "Mécanique générale",
                "Diagnostic électronique",
                "Vidange & Filtres",
                "Freins & Plaquettes",
                "Lavage complet"
              ].map((service) => (
                <li key={service}>
                  <span className="text-slate-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>5 impasse des hirondelles<br />33700 Merignac</span>
              </li>
              <li>
                <a href="tel:+33123456789" className="flex items-center gap-3 hover:text-amber-400 transition-colors">
                  <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  06 27 20 08 11
                </a>
              </li>
              <li>
                <a href="mailto:contact@garagepro.fr" className="flex items-center gap-3 hover:text-amber-400 transition-colors">
                  <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  contact@garagepro.fr
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Lun-Dim: 8h-19h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} France Pneu. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
