import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Ticket } from "../interfaces/ticket.interface";

const statusConfig: Record<Ticket["status"], { label: string; className: string | "outline" }> = {
  Abierto: { label: "Abierto", className: "bg-slate-100 text-slate-700" },
  En_proceso: { label: "En proceso", className: "bg-blue-100 text-blue-700" },
  Cerrado: { label: "Cerrado", className: "bg-orange-100 text-orange-700" },
};

const priorityConfig: Record<Ticket["priority"], { label: string; className: string }> = {
  Baja: { label: "Baja", className: "bg-slate-100 text-slate-700" },
  Media: { label: "Media", className: "bg-blue-100 text-blue-700" },
  Alta: { label: "Alta", className: "bg-orange-100 text-orange-700" },
  Critica: { label: "Crítica", className: "bg-red-100 text-red-700" },
};

export const ticketColumns = (
  onEdit: (ticket: Ticket) => void,
  onReassign: (ticket: Ticket) => void,
  isSupervisor: boolean,
  isAdmin: boolean,
): ColumnDef<Ticket, unknown>[] => [
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
        return (
          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${config.className}`}>
            {config.label}
          </span>
        )
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
            {
              !isSupervisor &&
              (<DropdownMenuItem onClick={() => onEdit(row.original)}>
                Editar
              </DropdownMenuItem>)

            }
            {(isSupervisor || isAdmin) && (
              <DropdownMenuItem onClick={() => onReassign(row.original)}>
                Reasignar
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];