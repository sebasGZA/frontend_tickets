import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Ticket } from "../interfaces/ticket.interface";

const statusConfig: Record<Ticket["status"], { label: string; variant: "default" | "secondary" | "outline" }> = {
  abierto: { label: "Abierto", variant: "default" },
  en_progreso: { label: "En progreso", variant: "secondary" },
  cerrado: { label: "Cerrado", variant: "outline" },
};

const priorityConfig: Record<Ticket["priority"], { label: string; className: string }> = {
  baja: { label: "Baja", className: "bg-slate-100 text-slate-700" },
  media: { label: "Media", className: "bg-blue-100 text-blue-700" },
  alta: { label: "Alta", className: "bg-orange-100 text-orange-700" },
  critica: { label: "Crítica", className: "bg-red-100 text-red-700" },
};

export const ticketColumns: ColumnDef<Ticket, unknown>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <Link to={`/tickets/${row.original.id}`} className="font-medium hover:underline">
        #{row.original.id.slice(0, 8)}
      </Link>
    ),
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "client",
    header: "Cliente",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const config = statusConfig[row.original.status];
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
  },
  {
    accessorKey: "priority",
    header: "Prioridad",
    cell: ({ row }) => {
      const config = priorityConfig[row.original.priority];
      return (
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${config.className}`}>
          {config.label}
        </span>
      );
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Agente",
    cell: ({ row }) => row.original.assignedTo ?? (
      <span className="text-muted-foreground text-sm">Sin asignar</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Creado",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString("es-CO"),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem render={
            <Link to={`/tickets/${row.original.id}`}>Ver detalle</Link>
          } />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];