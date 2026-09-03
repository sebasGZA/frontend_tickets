import { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Client } from "@/client/interfaces/client.interface";
import { useAuthStore } from "@/auth/store/auth.store";

const baseSchema = {
    title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
    clientId: z.string().min(1, "Seleccioná un cliente"),
    priority: z.enum(["Baja", "Media", "Alta", "Critica"]),
};

const createTicketSchema = z.object({
    ...baseSchema,
    status: z.enum(["Abierto", "En_proceso", "Cerrado"]).optional(),
});

const editTicketSchema = z.object({
    ...baseSchema,
    status: z.enum(["Abierto", "En_proceso", "Cerrado"]),
});

export type TicketFormValues = z.infer<typeof editTicketSchema>;

export interface TicketFormHandle {
    submit: () => void;
}

interface TicketFormProps {
    mode: "create" | "edit";
    defaultValues?: Partial<TicketFormValues>;
    onSubmit: (values: TicketFormValues) => void;
    clients: Client[];
    assignedToId?: string | null;
}

const statusLabels: Record<string, string> = {
    Abierto: "Abierto",
    En_proceso: "En proceso",
    Cerrado: "Cerrado",
};

export const TicketForm = forwardRef<TicketFormHandle, TicketFormProps>(
    ({ mode, defaultValues, onSubmit, clients, assignedToId }, ref) => {
        const schema = mode === "edit" ? editTicketSchema : createTicketSchema;
        const { user, isAdmin } = useAuthStore();

        const admin = isAdmin();
        const isOwner = assignedToId === user?.userId;
        const canChangeStatus = admin || isOwner;


        const availableStatuses = admin
            ? ["Abierto", "En_proceso", "Cerrado"]
            : ["Abierto", "En_proceso"];

        const {
            register,
            handleSubmit,
            control,
            formState: { errors },
        } = useForm<TicketFormValues>({
            resolver: zodResolver(schema) as Resolver<TicketFormValues>,
            defaultValues: {
                title: "",
                description: "",
                clientId: "",
                priority: "Media",
                ...(mode === "edit" && { status: "Abierto" }),
                ...defaultValues,
            },
        });

        useImperativeHandle(ref, () => ({
            submit: () => handleSubmit(onSubmit)(),
        }));

        return (
            <form className="space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="title">Título</Label>
                    <Input id="title" placeholder="..." {...register("title")} disabled={mode === "edit" && !admin && !isOwner} />
                    {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea id="description" rows={4} {...register("description")} disabled={mode === "edit" && !admin && !isOwner} />
                    {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="clientId">Cliente</Label>
                    <Controller
                        control={control}
                        name="clientId"
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={(v) => field.onChange(v ?? "")} disabled={mode === "edit" && !admin}>
                                <SelectTrigger className="w-full" id="clientId">
                                    <SelectValue placeholder="Seleccioná un cliente">
                                        {(value: string) => clients.find((c) => c.id === value)?.name ?? "Seleccioná un cliente"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {clients.map((c) => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.clientId && <p className="text-sm text-destructive">{errors.clientId.message}</p>}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="priority">Prioridad</Label>
                    <Controller
                        control={control}
                        name="priority"
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={(v) => field.onChange(v ?? "Media")}>
                                <SelectTrigger className="w-full" id="priority">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Baja">Baja</SelectItem>
                                    <SelectItem value="Media">Media</SelectItem>
                                    <SelectItem value="Alta">Alta</SelectItem>
                                    <SelectItem value="Critica">Crítica</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.priority && <p className="text-sm text-destructive">{errors.priority.message}</p>}
                </div>

                {mode === "edit" && (
                    <div className="space-y-1.5">
                        <Label htmlFor="status">Estado</Label>
                        <Controller
                            control={control}
                            name="status"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(v) => field.onChange(v ?? "Abierto")}
                                    disabled={!canChangeStatus}
                                >
                                    <SelectTrigger className="w-full" id="status">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableStatuses.map((s) => (
                                            <SelectItem key={s} value={s}>{statusLabels[s]}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {!canChangeStatus && (
                            <p className="text-xs text-muted-foreground">
                                Solo el agente asignado o un administrador pueden cambiar el estado.
                            </p>
                        )}
                        {errors.status && (
                            <p className="text-sm text-destructive">{(errors as any).status?.message}</p>
                        )}
                    </div>
                )}
            </form>
        );
    }
);

TicketForm.displayName = "TicketForm";