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
  Loader2
} from "lucide-react";

const statusConfig = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { label: "Confirmé", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  completed: { label: "Terminé", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Annulé", color: "bg-red-100 text-red-800", icon: XCircle }
};

const serviceLabels = {
  pneus_montage: "Montage pneus",
  pneus_reparation: "Réparation pneus",
  vidange: "Vidange",
  diagnostic: "Diagnostic",
  freins: "Freins & Plaquettes",
  batterie: "Batterie",
  mecanique: "Mécanique générale",
  lavage: "Lavage complet",
  autre: "Autre"
};

export default function Admin() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading: loadingAppointments } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => base44.entities.Appointment.list('-created_date'),
  });

  const { data: messages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ['messages'],
    queryFn: () => base44.entities.ContactMessage.list('-created_date'),
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Appointment.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    }
  });

  const markMessageAsReadMutation = useMutation({
    mutationFn: (id) => base44.entities.ContactMessage.update(id, { is_read: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });

  const handleStatusChange = (appointmentId, newStatus) => {
    updateAppointmentMutation.mutate({ id: appointmentId, data: { status: newStatus } });
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      markMessageAsReadMutation.mutate(message.id);
    }
  };

  const unreadCount = messages.filter(m => !m.is_read).length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Administration
          </h1>
          <p className="text-slate-600">
            Gérez vos rendez-vous et messages clients
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{appointments.length}</div>
                <div className="text-slate-500 text-sm">Total RDV</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{pendingCount}</div>
                <div className="text-slate-500 text-sm">En attente</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{messages.length}</div>
                <div className="text-slate-500 text-sm">Messages</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{unreadCount}</div>
                <div className="text-slate-500 text-sm">Non lus</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="bg-white shadow-sm p-1 rounded-xl">
            <TabsTrigger value="appointments" className="rounded-lg">
              Rendez-vous
              {pendingCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages" className="rounded-lg">
              Messages
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {loadingAppointments ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  Aucun rendez-vous pour le moment
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date souhaitée</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => {
                      const status = statusConfig[appointment.status || 'pending'];
                      return (
                        <TableRow key={appointment.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-slate-900">{appointment.client_name}</div>
                              <div className="text-sm text-slate-500">{appointment.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{serviceLabels[appointment.service] || appointment.service}</div>
                            {appointment.vehicle_info && (
                              <div className="text-sm text-slate-500">{appointment.vehicle_info}</div>
                            )}
                          </TableCell>
                          <TableCell>
                            {appointment.preferred_date ? (
                              <div>
                                <div>{format(new Date(appointment.preferred_date), 'd MMM yyyy', { locale: fr })}</div>
                                {appointment.preferred_time && (
                                  <div className="text-sm text-slate-500">{appointment.preferred_time}</div>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-400">Non précisée</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={status.color}>
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedAppointment(appointment)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Select
                                value={appointment.status || 'pending'}
                                onValueChange={(value) => handleStatusChange(appointment.id, value)}
                              >
                                <SelectTrigger className="w-32 h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">En attente</SelectItem>
                                  <SelectItem value="confirmed">Confirmé</SelectItem>
                                  <SelectItem value="completed">Terminé</SelectItem>
                                  <SelectItem value="cancelled">Annulé</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {loadingMessages ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  Aucun message pour le moment
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Expéditeur</TableHead>
                      <TableHead>Sujet</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow 
                        key={message.id}
                        className={!message.is_read ? 'bg-amber-50/50' : ''}
                      >
                        <TableCell>
                          <div>
                            <div className={`font-medium ${!message.is_read ? 'text-slate-900' : 'text-slate-700'}`}>
                              {message.name}
                            </div>
                            <div className="text-sm text-slate-500">{message.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={!message.is_read ? 'font-medium' : ''}>
                            {message.subject || 'Sans sujet'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(new Date(message.created_date), 'd MMM yyyy HH:mm', { locale: fr })}
                        </TableCell>
                        <TableCell>
                          {message.is_read ? (
                            <Badge variant="secondary">Lu</Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800">Non lu</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewMessage(message)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Appointment Detail Dialog */}
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Détails du rendez-vous</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 font-bold text-lg">
                    {selectedAppointment.client_name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{selectedAppointment.client_name}</div>
                  <div className="text-sm text-slate-500">{selectedAppointment.email}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <a href={`tel:${selectedAppointment.phone}`} className="text-amber-600 hover:underline">
                    {selectedAppointment.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-slate-400" />
                  <span>{selectedAppointment.vehicle_info || 'Non précisé'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>
                    {selectedAppointment.preferred_date 
                      ? format(new Date(selectedAppointment.preferred_date), 'EEEE d MMMM yyyy', { locale: fr })
                      : 'Non précisée'
                    }
                    {selectedAppointment.preferred_time && ` à ${selectedAppointment.preferred_time}`}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="text-sm text-slate-500 mb-1">Service demandé</div>
                <div className="font-medium">{serviceLabels[selectedAppointment.service] || selectedAppointment.service}</div>
              </div>

              {selectedAppointment.message && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="text-sm text-slate-500 mb-1">Message</div>
                  <div className="text-slate-700">{selectedAppointment.message}</div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <a href={`mailto:${selectedAppointment.email}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </a>
                <a href={`tel:${selectedAppointment.phone}`} className="flex-1">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900">
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler
                  </Button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Message</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {selectedMessage.name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{selectedMessage.name}</div>
                  <div className="text-sm text-slate-500">{selectedMessage.email}</div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="text-sm text-slate-500 mb-1">Sujet</div>
                <div className="font-medium">{selectedMessage.subject || 'Sans sujet'}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="text-sm text-slate-500 mb-2">Message</div>
                <div className="text-slate-700 whitespace-pre-wrap">{selectedMessage.message}</div>
              </div>

              <div className="text-sm text-slate-400 text-center">
                Reçu le {format(new Date(selectedMessage.created_date), 'd MMMM yyyy à HH:mm', { locale: fr })}
              </div>

              <a href={`mailto:${selectedMessage.email}`}>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900">
                  <Mail className="w-4 h-4 mr-2" />
                  Répondre par email
                </Button>
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
