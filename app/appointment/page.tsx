// "use client";

// import React, { useState } from 'react';
// import { motion } from "framer-motion";
// import { base44 } from "@/api/base44Client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
// import { format, addDays, isBefore, startOfToday } from "date-fns";
// import { fr } from "date-fns/locale";
// import {
//   CheckCircle,
//   Loader2,
//   CircleDot,
//   Wrench,
//   Gauge,
//   Droplets,
//   Battery,
//   Sparkles,
//   Disc,
// } from "lucide-react";

// const services = [
//   { value: "pneus_montage", label: "Montage pneus", icon: CircleDot },
//   { value: "pneus_reparation", label: "Réparation pneus", icon: CircleDot },
//   { value: "vidange", label: "Vidange", icon: Droplets },
//   { value: "diagnostic", label: "Diagnostic électronique", icon: Gauge },
//   { value: "freins", label: "Freins & Plaquettes", icon: Disc },
//   { value: "batterie", label: "Batterie", icon: Battery },
//   { value: "mecanique", label: "Mécanique générale", icon: Wrench },
//   { value: "lavage", label: "Lavage complet", icon: Sparkles },
//   { value: "autre", label: "Autre service", icon: Wrench },
// ];

// const timeSlots = [
//   "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
//   "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
//   "16:00", "16:30", "17:00", "17:30", "18:00",
// ];

// const saturdayTimeSlots = [
//   "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
//   "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
// ];

// export default function Appointment() {
//   const [step, setStep] = useState<number>(1);
//   const [formData, setFormData] = useState<{
//     client_name: string;
//     email: string;
//     phone: string;
//     service: string;
//     vehicle_info: string;
//     preferred_date: Date | null;
//     preferred_time: string;
//     message: string;
//   }>({
//     client_name: '',
//     email: '',
//     phone: '',
//     service: '',
//     vehicle_info: '',
//     preferred_date: null,
//     preferred_time: '',
//     message: '',
//   });

//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isSuccess, setIsSuccess] = useState<boolean>(false);

//   const handleDateSelect = (date: Date | undefined) => {
//     setFormData({
//       ...formData,
//       preferred_date: date ?? null,
//       preferred_time: '',
//     });
//   };

//   const getAvailableTimeSlots = (): string[] => {
//     if (!formData.preferred_date) return [];
//     const day = formData.preferred_date.getDay();
//     if (day === 6) return saturdayTimeSlots;
//     return timeSlots;
//   };

//   const disabledDays = (date: Date): boolean => {
//     const today = startOfToday();
//     return isBefore(date, today) || date.getDay() === 0;
//   };

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ): Promise<void> => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const appointmentData = {
//       ...formData,
//       preferred_date: formData.preferred_date
//         ? format(formData.preferred_date, 'yyyy-MM-dd')
//         : null,
//       status: 'pending',
//     };

//     await base44.entities.Appointment.create(appointmentData);

//     await base44.integrations.Core.SendEmail({
//       to: "contact@garagepro.fr",
//       subject: `Nouveau RDV: ${formData.client_name} - ${services.find(
//         (s) => s.value === formData.service
//       )?.label}`,
//       body: `
//         Nouveau rendez-vous demandé:

//         Client: ${formData.client_name}
//         Email: ${formData.email}
//         Téléphone: ${formData.phone}

//         Service: ${services.find((s) => s.value === formData.service)?.label}
//         Véhicule: ${formData.vehicle_info}

//         Date souhaitée: ${formData.preferred_date
//           ? format(formData.preferred_date, 'EEEE d MMMM yyyy', { locale: fr })
//           : 'Non précisée'}
//         Heure: ${formData.preferred_time || 'Non précisée'}

//         Message: ${formData.message || 'Aucun'}
//       `,
//     });

//     setIsSuccess(true);
//     setIsSubmitting(false);
//   };

//   if (isSuccess) {
//     return (
//       <div className="pt-20 min-h-screen flex items-center justify-center bg-slate-50">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white rounded-2xl p-12 shadow-xl text-center max-w-md mx-4"
//         >
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <CheckCircle className="w-10 h-10 text-green-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-slate-900 mb-4">
//             Demande envoyée !
//           </h2>
//           <p className="text-slate-600 mb-2">
//             Votre demande de rendez-vous a bien été enregistrée.
//           </p>
//           <p className="text-slate-500 text-sm mb-8">
//             Nous vous contacterons rapidement pour confirmer votre créneau.
//           </p>
//         </motion.div>
//       </div>
//     );
//   }

//   return <div className="pt-20">{/* UI unchanged */}</div>;
// }


"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle, Loader2 } from "lucide-react";

/* ================= TYPES ================= */

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00",
];

const saturdayTimeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];


type AppointmentFormData = {
  client_name: string;
  email: string;
  phone: string;
  service: string;
  vehicle_info: string;
  preferred_date: Date | undefined;
  preferred_time: string;
  message: string;
};

import {
  CircleDot,
  Droplets,
  Gauge,
  Disc,
  Battery,
  Wrench,
  Sparkles,
} from "lucide-react";

type Service = {
  value: string;
  label: string;
  icon: React.ElementType;
};

const services: Service[] = [
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

/* ================= COMPONENT ================= */

export default function Appointment() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [formData, setFormData] = useState<AppointmentFormData>({
    client_name: "",
    email: "",
    phone: "",
    service: "",
    vehicle_info: "",
    preferred_date: undefined,
    preferred_time: "",
    message: "",
  });

  /* ================= HANDLERS ================= */

  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      preferred_date: date ?? undefined,
      preferred_time: "",
    }));
  };

  const disabledDays = (date: Date) => {
    const today = startOfToday();
    return isBefore(date, today) || date.getDay() === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      preferred_date: formData.preferred_date
        ? format(formData.preferred_date, "yyyy-MM-dd")
        : null,
      status: "pending",
    };

    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la réservation", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= JSX (inchangé) ================= */

  const getAvailableTimeSlots = (): string[] => {
  if (!formData.preferred_date) return [];

  const day = formData.preferred_date.getDay();

  // Samedi
  if (day === 6) return saturdayTimeSlots;

  return timeSlots;
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
          <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
            <div className="text-sm text-slate-500 mb-1">Récapitulatif</div>
            <div className="font-medium text-slate-900">
              {services.find(s => s.value === formData.service)?.label}
            </div>
            {formData.preferred_date && (
              <div className="text-slate-600 text-sm">
                {format(formData.preferred_date, 'EEEE d MMMM yyyy', { locale: fr })} {formData.preferred_time && `à ${formData.preferred_time}`}
              </div>
            )}
          </div>
          <Button 
            onClick={() => {
              setIsSuccess(false);
              setStep(1);
              setFormData({
                client_name: '',
                email: '',
                phone: '',
                service: '',
                vehicle_info: '',
                preferred_date: undefined,
                preferred_time: '',
                message: ''
              });
            }}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900"
          >
            Nouveau rendez-vous
          </Button>
        </motion.div>
      </div>
    );
  }

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
              Réservation
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Prendre rendez-vous
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Réservez votre créneau en quelques clics. Nous vous confirmerons rapidement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                  step >= s 
                    ? 'bg-amber-500 text-slate-900' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-20 h-1 mx-2 rounded transition-colors ${
                    step > s ? 'bg-amber-500' : 'bg-slate-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 lg:p-10"
          >
            <form onSubmit={handleSubmit}>
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Choisissez votre service
                  </h2>
                  <p className="text-slate-600 mb-8">
                    Sélectionnez le type d'intervention souhaitée
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {services.map((service) => {
                      const Icon = service.icon;
                      const isSelected = formData.service === service.value;
                      return (
                        <button
                          key={service.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: service.value })}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-amber-500' : 'bg-slate-100'
                          }`}>
                            <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                          </div>
                          <span className={`font-medium ${isSelected ? 'text-amber-700' : 'text-slate-700'}`}>
                            {service.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-2 mb-8">
                    <Label htmlFor="vehicle_info">Informations véhicule</Label>
                    <Input
                      id="vehicle_info"
                      value={formData.vehicle_info}
                      onChange={(e) => setFormData({ ...formData, vehicle_info: e.target.value })}
                      placeholder="Marque, modèle, année (ex: Renault Clio 2020)"
                      className="h-12"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.service}
                    className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                  >
                    Continuer
                  </Button>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Choisissez une date
                  </h2>
                  <p className="text-slate-600 mb-8">
                    Sélectionnez votre créneau préféré
                  </p>

                  <div className="flex justify-center mb-8">
                    <Calendar
                      mode="single"
                      selected={formData.preferred_date}
                      onSelect={handleDateSelect}
                      disabled={disabledDays}
                      locale={fr}
                      className="rounded-xl border"
                      fromDate={new Date()}
                      toDate={addDays(new Date(), 60)}
                    />
                  </div>

                  {formData.preferred_date && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8"
                    >
                      <Label className="mb-3 block">Heure souhaitée</Label>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {getAvailableTimeSlots().map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData({ ...formData, preferred_time: time })}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                              formData.preferred_time === time
                                ? 'bg-amber-500 text-slate-900'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 h-14"
                    >
                      Retour
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!formData.preferred_date}
                      className="flex-1 h-14 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                    >
                      Continuer
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Vos coordonnées
                  </h2>
                  <p className="text-slate-600 mb-8">
                    Pour vous confirmer le rendez-vous
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="space-y-2">
                      <Label htmlFor="client_name">Nom complet *</Label>
                      <Input
                        id="client_name"
                        value={formData.client_name}
                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                        placeholder="Jean Dupont"
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jean@exemple.fr"
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="06 12 34 56 78"
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message (optionnel)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Précisions sur votre demande..."
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-8">
                    <h3 className="font-semibold text-slate-900 mb-3">Récapitulatif</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Service:</span>
                        <span className="text-slate-900 font-medium">
                          {services.find(s => s.value === formData.service)?.label}
                        </span>
                      </div>
                      {formData.vehicle_info && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Véhicule:</span>
                          <span className="text-slate-900">{formData.vehicle_info}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-500">Date:</span>
                        <span className="text-slate-900">
                          {formData.preferred_date && format(formData.preferred_date, 'EEEE d MMMM yyyy', { locale: fr })}
                        </span>
                      </div>
                      {formData.preferred_time && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Heure:</span>
                          <span className="text-slate-900">{formData.preferred_time}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1 h-14"
                    >
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.client_name || !formData.email || !formData.phone}
                      className="flex-1 h-14 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        'Confirmer le rendez-vous'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}