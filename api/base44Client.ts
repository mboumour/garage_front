"use client";

type Appointment = {
  id: string;
  client_name: string;
  email: string;
  phone: string;
  service: string;
  vehicle_info?: string;
  preferred_date?: string | null;
  preferred_time?: string;
  message?: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
  created_date: string;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read?: boolean;
  created_date: string;
};

const seedAppointments: Appointment[] = [
  {
    id: "apt-1",
    client_name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33123456789",
    service: "pneus_montage",
    vehicle_info: "Peugeot 308",
    preferred_date: new Date().toISOString(),
    preferred_time: "10:00",
    message: "Montage pneus hiver",
    status: "pending",
    created_date: new Date().toISOString(),
  },
  {
    id: "apt-2",
    client_name: "Sophie Martin",
    email: "sophie.martin@example.com",
    phone: "+33198765432",
    service: "vidange",
    vehicle_info: "Renault Clio",
    preferred_date: new Date(Date.now() + 86400000).toISOString(),
    preferred_time: "15:30",
    message: "Entretien complet",
    status: "confirmed",
    created_date: new Date(Date.now() - 86400000).toISOString(),
  },
];

const seedMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Paul Leroy",
    email: "paul.leroy@example.com",
    subject: "Demande de devis",
    message: "Bonjour, je souhaite un devis pour un changement de pneus.",
    is_read: false,
    created_date: new Date().toISOString(),
  },
  {
    id: "msg-2",
    name: "Claire Dubois",
    email: "claire.dubois@example.com",
    subject: "Information",
    message: "Pouvez-vous vérifier mes freins la semaine prochaine ?",
    is_read: true,
    created_date: new Date(Date.now() - 3600 * 1000).toISOString(),
  },
];

const appointmentStore = new Map(seedAppointments.map((item) => [item.id, item]));
const messageStore = new Map(seedMessages.map((item) => [item.id, item]));

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const sortByDate = <T extends { created_date: string }>(items: T[], order: string) => {
  if (order.startsWith("-")) {
    return [...items].sort(
      (a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime(),
    );
  }
  return items;
};

export const base44 = {
  entities: {
    Appointment: {
      async list(order = "-created_date") {
        await delay();
        return sortByDate(Array.from(appointmentStore.values()), order);
      },
      async create(data: Partial<Appointment>) {
        await delay();
        const record: Appointment = {
          id: crypto.randomUUID(),
          client_name: data.client_name ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          service: data.service ?? "autre",
          vehicle_info: data.vehicle_info,
          preferred_date: data.preferred_date ?? null,
          preferred_time: data.preferred_time,
          message: data.message,
          status: (data.status as Appointment["status"]) ?? "pending",
          created_date: new Date().toISOString(),
        };
        appointmentStore.set(record.id, record);
        return record;
      },
      async update(id: string, updates: Partial<Appointment>) {
        await delay();
        const existing = appointmentStore.get(id);
        if (!existing) {
          throw new Error("Appointment not found");
        }
        const updated = { ...existing, ...updates };
        appointmentStore.set(id, updated);
        return updated;
      },
    },
    ContactMessage: {
      async list(order = "-created_date") {
        await delay();
        return sortByDate(Array.from(messageStore.values()), order);
      },
      async create(data: Partial<ContactMessage>) {
        await delay();
        const record: ContactMessage = {
          id: crypto.randomUUID(),
          name: data.name ?? "",
          email: data.email ?? "",
          subject: data.subject ?? "",
          message: data.message ?? "",
          is_read: data.is_read ?? false,
          created_date: new Date().toISOString(),
        };
        messageStore.set(record.id, record);
        return record;
      },
      async update(id: string, updates: Partial<ContactMessage>) {
        await delay();
        const existing = messageStore.get(id);
        if (!existing) {
          throw new Error("Message not found");
        }
        const updated = { ...existing, ...updates };
        messageStore.set(id, updated);
        return updated;
      },
    },
  },
  integrations: {
    Core: {
      async SendEmail(payload: { to: string; subject: string; body: string }) {
        await delay(150);
        if (process.env.NODE_ENV !== "production") {
          console.info(`[MockEmail] ${payload.subject} -> ${payload.to}`);
        }
        return { success: true };
      },
    },
  },
};
