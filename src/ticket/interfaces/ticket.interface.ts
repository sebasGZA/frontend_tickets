export interface Ticket {
  id: string;
  title: string;
  client: string;
  status: "abierto" | "en_progreso" | "cerrado";
  priority: "baja" | "media" | "alta" | "critica";
  assignedTo: string | null;
  createdAt: string;
}