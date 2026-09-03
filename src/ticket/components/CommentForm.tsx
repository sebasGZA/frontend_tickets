import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const commentSchema = z.object({
    content: z.string().min(3, "El comentario es muy corto"),
    isPublic: z.boolean(),
});

export type CommentFormValues = z.infer<typeof commentSchema>;

export interface CommentFormHandle {
    submit: () => void;
    reset: () => void;
}

interface CommentFormProps {
    onSubmit: (values: CommentFormValues) => void;
    canMarkPublic: boolean;
}

export const CommentForm = forwardRef<CommentFormHandle, CommentFormProps>(
    ({ onSubmit, canMarkPublic }, ref) => {
        const {
            register,
            handleSubmit,
            watch,
            setValue,
            reset,
            formState: { errors },
        } = useForm<CommentFormValues>({
            resolver: zodResolver(commentSchema),
            defaultValues: { content: "", isPublic: true },
        });

        useImperativeHandle(ref, () => ({
            submit: () => handleSubmit(onSubmit)(),
            reset: () => reset(),
        }));

        return (
            <form className="space-y-3">
                <Textarea
                    rows={3}
                    placeholder="Escribí un comentario..."
                    {...register("content")}
                />
                {errors.content && (
                    <p className="text-sm text-destructive">{errors.content.message}</p>
                )}

                {canMarkPublic && (
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="isPublic"
                            checked={watch("isPublic")}
                            onCheckedChange={(checked) => setValue("isPublic", checked === true)}
                        />
                        <Label htmlFor="isPublic" className="text-sm font-normal text-muted-foreground">
                            Comentario interno (no visible para el cliente)
                        </Label>
                    </div>
                )}
            </form>
        );
    }
);

CommentForm.displayName = "CommentForm";