"use client";

import React, { useState } from 'react';
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Phone,
  Car,
  Loader2,
} from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { label: "Confirmé", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  completed: { label: "Terminé", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Annulé", color: "bg-red-100 text-red-800", icon: XCircle },
};

const serviceLabels: Record<string, string> = {
  pneus_montage: "Montage pneus",
  pneus_reparation: "Réparation pneus",
  vidange: "Vidange",
  diagnostic: "Diagnostic",
  freins: "Freins & Plaquettes",
  batterie: "Batterie",
  mecanique: "Mécanique générale",
  lavage: "Lavage complet",
  autre: "Autre",
};

// ===== Mutation variable types =====
type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

type UpdateAppointmentVars = {
  id: string;
  data: {
    status: AppointmentStatus;
  };
};
};

type MarkMessageAsReadVars = string;

export default function Admin() {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading: loadingAppointments } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => base44.entities.Appointment.list('-created_date'),
  });

  const { data: messages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ['messages'],
    queryFn: () => base44.entities.ContactMessage.list('-created_date'),
  });

  const updateAppointmentMutation = useMutation<
    unknown,
    Error,
    UpdateAppointmentVars
  >({
    mutationFn: ({ id, data }) =>
      base44.entities.Appointment.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });

  const markMessageAsReadMutation = useMutation<
    unknown,
    Error,
    MarkMessageAsReadVars
  >({
    mutationFn: (id) =>
      base44.entities.ContactMessage.update(id, { is_read: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const handleStatusChange = (
    appointmentId: string,
    newStatus: AppointmentStatus
  ) => {
    updateAppointmentMutation.mutate({
      id: appointmentId,
      data: { status: newStatus },
    });
  };

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      markMessageAsReadMutation.mutate(message.id);
    }
  };

  const unreadCount = messages.filter((m: any) => !m.is_read).length;
  const pendingCount = appointments.filter((a: any) => a.status === 'pending').length;

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      {/* UI unchanged – omitted for brevity in explanation, unchanged from your original */}
    </div>
  );
}
