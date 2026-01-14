import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const msg = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject || "",
        message: data.message,
      },
    });

    await resend.emails.send({
      from: "Garage <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `Nouveau message : ${msg.subject || "Sans sujet"}`,
      text: `
            Nom: ${msg.name}
            Email: ${msg.email}

            ${msg.message}
                `,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
