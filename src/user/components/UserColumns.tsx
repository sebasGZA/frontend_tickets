import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "../interfaces/user.interface";

const roleConfig: Record<User["role"], { label: string; className: string }> = {
    Admin: { label: "Administrador", className: "bg-purple-100 text-purple-700" },
    Supervisor: { label: "Supervisor", className: "bg-blue-100 text-blue-700" },
    Soporte: { label: "Agente de soporte", className: "bg-slate-100 text-slate-700" },
};

export const userColumns = (
    onEdit: (user: User) => void
): ColumnDef<User, unknown>[] => [
        {
            accessorKey: "name",
            header: "Nombre",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "role",
            header: "Rol",
            cell: ({ row }) => {
                const config = roleConfig[row.original.role];
                return (
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${config.className}`}>
                        {config.label}
                    </span>
                );
            },
        },
        {
            accessorKey: "isActive",
            header: "Estado",
            cell: ({ row }) => (
                <Badge variant={row.original.isActive ? "default" : "outline"}>
                    {row.original.isActive ? "Activo" : "Inactivo"}
                </Badge>
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
                        <DropdownMenuItem onClick={() => onEdit(row.original)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            {row.original.isActive ? "Desactivar" : "Activar"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];