import { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const baseUserSchema = {
    name: z.string().min(2, "El nombre es muy corto"),
    email: z.string().email("Email inválido"),
    role: z.enum(["Admin", "Supervisor", "Soporte"]),
};

const createUserSchema = z.object({
    ...baseUserSchema,
    password: z.string().min(8, "Mínimo 8 caracteres"),
});

const editUserSchema = z.object({
    ...baseUserSchema,
    password: z
        .union([z.string().min(8, "Mínimo 8 caracteres"), z.literal("")])
        .optional(),
});

export type UserFormValues = z.infer<typeof createUserSchema>;

export interface UserFormHandle {
    submit: () => void;
}

interface UserFormProps {
    mode: "create" | "edit";
    defaultValues?: Partial<UserFormValues>;
    onSubmit: (values: UserFormValues) => void;
}

export const UserForm = forwardRef<UserFormHandle, UserFormProps>(
    ({ mode, defaultValues, onSubmit }, ref) => {
        const schema = mode === "edit" ? editUserSchema : createUserSchema;

        const {
            register,
            handleSubmit,
            control,
            formState: { errors },
        } = useForm<UserFormValues>({
            resolver: zodResolver(schema) as Resolver<UserFormValues>,
            defaultValues: {
                name: "",
                email: "",
                role: "Soporte",
                password: "",
                ...defaultValues,
            },
        });

        useImperativeHandle(ref, () => ({
            submit: () => handleSubmit(onSubmit)(),
        }));

        return (
            <form className="space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Nombre completo" {...register("name")} />
                    {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="nombre@empresa.com"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="role">Rol</Label>
                    <Controller
                        control={control}
                        name="role"
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={(v) => field.onChange(v ?? "agente_soporte")}
                            >
                                <SelectTrigger className="w-full" id="role">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Administrador</SelectItem>
                                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                                    <SelectItem value="Soporte">Agente de soporte</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.role && (
                        <p className="text-sm text-destructive">{errors.role.message}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="password">
                        {mode === "edit" ? "Nueva contraseña" : "Contraseña"}
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder={
                            mode === "edit" ? "Dejar en blanco para no cambiarla" : "Mínimo 8 caracteres"
                        }
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                </div>
            </form>
        );
    }
);

UserForm.displayName = "UserForm";