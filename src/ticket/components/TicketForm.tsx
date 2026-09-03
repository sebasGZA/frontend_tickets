import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
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

const ticketSchema = z.object({
    title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
    clientId: z.string().min(1, "Seleccioná un cliente"),
    priority: z.enum(["Baja", "Media", "Alta", "Critica"]),
});

export type TicketFormValues = z.infer<typeof ticketSchema>;

export interface TicketFormHandle {
    submit: () => void;
}

interface TicketFormProps {
    defaultValues?: Partial<TicketFormValues>;
    onSubmit: (values: TicketFormValues) => void;
    clients: Client[];
}

export const TicketForm = forwardRef<TicketFormHandle, TicketFormProps>(
    ({ defaultValues, onSubmit, clients }, ref) => {
        const {
            register,
            handleSubmit,
            control,
            reset,
            getValues,
            formState: { errors },
        } = useForm<TicketFormValues>({
            resolver: zodResolver(ticketSchema),
            defaultValues: {
                title: "",
                description: "",
                clientId: "",
                priority: "Media",
                ...defaultValues,
            },
        });

        useEffect(() => {
            if (defaultValues) reset({ ...getValues(), ...defaultValues });
        }, [defaultValues]);

        useImperativeHandle(ref, () => ({
            submit: () => handleSubmit(onSubmit)(),
        }));

        return (
            <form className="space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="title">Título</Label>
                    <Input
                        id="title"
                        placeholder="No se puede acceder al panel de facturación"
                        {...register("title")}
                    />
                    {errors.title && (
                        <p className="text-sm text-destructive">{errors.title.message}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                        id="description"
                        rows={4}
                        placeholder="Detalle del problema..."
                        {...register("description")}
                    />
                    {errors.description && (
                        <p className="text-sm text-destructive">{errors.description.message}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="clienteId">Cliente</Label>
                    <Controller
                        control={control}
                        name="clientId"
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={(v) => field.onChange(v ?? "")}>
                                <SelectTrigger className="w-full" id="clienteId">
                                    <SelectValue placeholder="Seleccioná un cliente">
                                        {(value: string) =>
                                            clients.find((c) => c.id === value)?.name ?? "Seleccioná un cliente"
                                        }
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {clients.map((c) => (
                                        <SelectItem key={c.id} value={c.id}>
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.clientId && (
                        <p className="text-sm text-destructive">{errors.clientId.message}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="prioridad">Prioridad</Label>
                    <Controller
                        control={control}
                        name="priority"
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={(v) => field.onChange(v ?? "media")}>
                                <SelectTrigger className="w-full" id="prioridad">
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
                    {errors.priority && (
                        <p className="text-sm text-destructive">{errors.priority.message}</p>
                    )}
                </div>
            </form>
        );
    }
);

TicketForm.displayName = "TicketForm";