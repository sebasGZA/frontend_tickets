import { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { User } from "@/user/interfaces/user.interface";

const reassignSchema = z.object({
    assignedToId: z.string().min(1, "Seleccioná un agente"),
});

export type ReassignFormValues = z.infer<typeof reassignSchema>;

export interface ReassignFormHandle {
    submit: () => void;
}

interface ReassignTicketFormProps {
    defaultValues?: Partial<ReassignFormValues>;
    onSubmit: (values: ReassignFormValues) => void;
    agents: User[];
    currentAgentId?: string | null;
}

export const ReassignTicketForm = forwardRef<ReassignFormHandle, ReassignTicketFormProps>(
    ({ defaultValues, onSubmit, agents, currentAgentId }, ref) => {
        const {
            handleSubmit,
            control,
            formState: { errors },
        } = useForm<ReassignFormValues>({
            resolver: zodResolver(reassignSchema),
            defaultValues: {
                assignedToId: "",
                ...defaultValues,
            },
        });

        useImperativeHandle(ref, () => ({
            submit: () => handleSubmit(onSubmit)(),
        }));

        return (
            <form className="space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="assignedToId">Nuevo agente</Label>
                    <Controller
                        control={control}
                        name="assignedToId"
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={(v) => field.onChange(v ?? "")}>
                                <SelectTrigger className="w-full" id="assignedToId">
                                    <SelectValue placeholder="Seleccioná un agente">
                                        {(value: string) =>
                                            agents.find((a) => a.id === value)?.name ?? "Seleccioná un agente"
                                        }
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {agents.map((a) => (
                                        <SelectItem
                                            key={a.id}
                                            value={a.id}
                                            disabled={a.id === currentAgentId}
                                        >
                                            {a.name}
                                            {a.id === currentAgentId && " (actual)"}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.assignedToId && (
                        <p className="text-sm text-destructive">{errors.assignedToId.message}</p>
                    )}
                </div>
            </form>
        );
    }
);

ReassignTicketForm.displayName = "ReassignTicketForm";