import { useRef } from "react";
import { useParams, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { getTicketByIdAction } from "../actions/get-ticket-id.action";
import { getCommentsAction } from "../actions/get-comments.action";
import { createCommentAction } from "../actions/create-comment.action";
import { CommentList } from "../components/CommentList";
import { CommentForm, type CommentFormHandle, type CommentFormValues } from "../components/CommentForm";
import { useAuthStore } from "@/auth/store/auth.store";
import type { Ticket } from "../interfaces/ticket.interface";

const statusConfig: Record<Ticket["status"], { label: string; className: string | "outline" }> = {
    Abierto: { label: "Abierto", className: "bg-slate-100 text-slate-700" },
    En_proceso: { label: "En proceso", className: "bg-blue-100 text-blue-700" },
    Cerrado: { label: "Cerrado", className: "bg-orange-100 text-orange-700" },
    Reabierto: { label: "Reabierto", className: "bg-red-100 text-red-700" },
};

const priorityConfig: Record<string, { label: string; className: string }> = {
    Baja: { label: "Baja", className: "bg-slate-100 text-slate-700" },
    Media: { label: "Media", className: "bg-blue-100 text-blue-700" },
    Alta: { label: "Alta", className: "bg-orange-100 text-orange-700" },
    Critica: { label: "Crítica", className: "bg-red-100 text-red-700" },
};

export const TicketDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const commentFormRef = useRef<CommentFormHandle>(null);
    const { isAdmin, isSupervisor } = useAuthStore();

    const { data: ticket, isLoading: isLoadingTicket } = useQuery({
        queryKey: ["ticket", id],
        queryFn: () => getTicketByIdAction(id!),
        enabled: !!id,
    });

    const { data: comments = [], isLoading: isLoadingComments } = useQuery({
        queryKey: ["comments", id],
        queryFn: () => getCommentsAction(id!),
        enabled: !!id,
    });

    const { mutate: createComment, isPending: isCommenting } = useMutation({
        mutationFn: (values: CommentFormValues) => createCommentAction(id!, values),
        onSuccess: () => {
            toast.success("Comentario agregado");
            queryClient.invalidateQueries({ queryKey: ["comments", id] });
            commentFormRef.current?.reset();
        },
        onError: () => toast.error("No se pudo agregar el comentario"),
    });

    if (isLoadingTicket) {
        return <p className="text-muted-foreground">Cargando ticket...</p>;
    }

    if (!ticket) {
        return <p className="text-muted-foreground">Ticket no encontrado.</p>;
    }

    const status = statusConfig[ticket.status];
    const priority = priorityConfig[ticket.priority];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver a tickets
            </Link>

            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-muted-foreground">#{ticket.id.slice(0, 8)}</span>
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${status.className}`}>
                        {status.label}
                    </span>                   
                     <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${priority.className}`}>
                        {priority.label}
                    </span>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">{ticket.title}</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Detalle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap">{ticket.description}</p>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Cliente</p>
                            <p className="font-medium">{ticket.client}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Creado por</p>
                            <p className="font-medium">{ticket.createdBy}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Agente asignado</p>
                            <p className="font-medium">{ticket.assignedTo ?? "Sin asignar"}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Creado</p>
                            <p className="font-medium">
                                {new Date(ticket.createdAt).toLocaleDateString("es-CO")}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">
                        Comentarios {comments.length > 0 && `(${comments.length})`}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <CommentForm
                        ref={commentFormRef}
                        onSubmit={(values) => createComment(values)}
                        canMarkPublic={isAdmin() || isSupervisor()}
                    />
                    <Button
                        size="sm"
                        onClick={() => commentFormRef.current?.submit()}
                        disabled={isCommenting}
                    >
                        {isCommenting ? "Enviando..." : "Comentar"}
                    </Button>

                    <Separator />

                    <CommentList comments={comments} isLoading={isLoadingComments} />
                </CardContent>
            </Card>
        </div>
    );
};