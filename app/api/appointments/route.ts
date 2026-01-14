import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validation minimale
    if (
      !data.client_name ||
      !data.email ||
      !data.phone ||
      !data.service ||
      !data.preferred_date
    ) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        client_name: data.client_name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        vehicle_info: data.vehicle_info || null,
        preferred_date: new Date(data.preferred_date),
        preferred_time: data.preferred_time || null,
        message: data.message || null,
        status: "pending",
      },
    });

    const serviceLabel = data.service;

    // Mail admin
    await resend.emails.send({
      from: "Garage <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `Nouveau RDV - ${appointment.client_name}`,
      text: `
        Nouveau rendez-vous :

        Client : ${appointment.client_name}
        Email  : ${appointment.email}
        Téléphone : ${appointment.phone}

        Service : ${serviceLabel}
        Véhicule : ${appointment.vehicle_info || "Non précisé"}

        Date : ${appointment.preferred_date.toDateString()}
        Heure : ${appointment.preferred_time || "Non précisée"}

        Message :
        ${appointment.message || "Aucun"}
      `,
    });

    // Mail client
    await resend.emails.send({
      from: "Garage <onboarding@resend.dev>",
      to: appointment.email,
      subject: "Confirmation de votre demande de rendez-vous",
      text: `
Bonjour ${appointment.client_name},

Nous avons bien reçu votre demande de rendez-vous.

Récapitulatif :
- Service : ${serviceLabel}
- Date : ${appointment.preferred_date.toDateString()}
- Heure : ${appointment.preferred_time || "À confirmer"}

Nous vous contacterons rapidement pour confirmer ce créneau.

Cordialement,
Votre garage
      `,
    });

    return NextResponse.json({ success: true, id: appointment.id });
  } catch (error) {
    console.error("Erreur API appointments:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
