"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";
import {
  CheckCircle,
  Loader2,
  CircleDot,
  Wrench,
  Gauge,
  Droplets,
  Battery,
  Sparkles,
  Disc,
} from "lucide-react";

const services = [
  { value: "pneus_montage", label: "Montage pneus", icon: CircleDot },
  { value: "pneus_reparation", label: "Réparation pneus", icon: CircleDot },
  { value: "vidange", label: "Vidange", icon: Droplets },
  { value: "diagnostic", label: "Diagnostic électronique", icon: Gauge },
  { value: "freins", label: "Freins & Plaquettes", icon: Disc },
  { value: "batterie", label: "Batterie", icon: Battery },
  { value: "mecanique", label: "Mécanique générale", icon: Wrench },
  { value: "lavage", label: "Lavage complet", icon: Sparkles },
  { value: "autre", label: "Autre service", icon: Wrench },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00",
];

const saturdayTimeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

export default function Appointment() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<{
    client_name: string;
    email: string;
    phone: string;
    service: string;
    vehicle_info: string;
    preferred_date: Date | null;
    preferred_time: string;
    message: string;
  }>({
    client_name: '',
    email: '',
    phone: '',
    service: '',
    vehicle_info: '',
    preferred_date: null,
    preferred_time: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleDateSelect = (date: Date | undefined) => {
    setFormData({
      ...formData,
      preferred_date: date ?? null,
      preferred_time: '',
    });
  };

  const getAvailableTimeSlots = (): string[] => {
    if (!formData.preferred_date) return [];
    const day = formData.preferred_date.getDay();
    if (day === 6) return saturdayTimeSlots;
    return timeSlots;
  };

  const disabledDays = (date: Date): boolean => {
    const today = startOfToday();
    return isBefore(date, today) || date.getDay() === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    const appointmentData = {
      ...formData,
      preferred_date: formData.preferred_date
        ? format(formData.preferred_date, 'yyyy-MM-dd')
        : null,
      status: 'pending',
    };

    await base44.entities.Appointment.create(appointmentData);

    await base44.integrations.Core.SendEmail({
      to: "contact@garagepro.fr",
      subject: `Nouveau RDV: ${formData.client_name} - ${services.find(
        (s) => s.value === formData.service
      )?.label}`,
      body: `
        Nouveau rendez-vous demandé:

        Client: ${formData.client_name}
        Email: ${formData.email}
        Téléphone: ${formData.phone}

        Service: ${services.find((s) => s.value === formData.service)?.label}
        Véhicule: ${formData.vehicle_info}

        Date souhaitée: ${formData.preferred_date
          ? format(formData.preferred_date, 'EEEE d MMMM yyyy', { locale: fr })
          : 'Non précisée'}
        Heure: ${formData.preferred_time || 'Non précisée'}

        Message: ${formData.message || 'Aucun'}
      `,
    });

    setIsSuccess(true);
    setIsSubmitting(false);
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
            Demande envoyée !
          </h2>
          <p className="text-slate-600 mb-2">
            Votre demande de rendez-vous a bien été enregistrée.
          </p>
          <p className="text-slate-500 text-sm mb-8">
            Nous vous contacterons rapidement pour confirmer votre créneau.
          </p>
        </motion.div>
      </div>
    );
  }

  return <div className="pt-20">{/* UI unchanged */}</div>;
}
