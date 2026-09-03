import { useRef, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { CustomDataTable } from "@/components/custom/CustomDataTable";
import { ticketColumns } from "../components/TicketColumns";
import { TicketsFilters } from "../components/TicketFilter";
import { useDebounce } from "@/hooks/useDebounce";
import { getTicketsAction } from "../actions/get-tickets.action";
import { CustomFormModal } from "@/components/custom/CustomFormModal";
import { TicketForm, type TicketFormHandle, type TicketFormValues } from "../components/TicketForm";
import { createTicketAction } from "../actions/create-ticket.action";
import { getClientsSelectAction } from "../actions/get-clients-select.action";
import type { Ticket } from "../interfaces/ticket.interface";
import { updateTicketAction } from "../actions/update-ticket.action";

export const TicketsPage = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("todos");
    const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const debouncedSearch = useDebounce(search, 400);

    const { data, isLoading } = useQuery({
        queryKey: ["tickets", pagination, debouncedSearch, status],
        queryFn: () =>
            getTicketsAction({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                term: debouncedSearch || undefined,
                status: status === "todos" ? undefined : status,
            }),
        placeholderData: (prev) => prev,
    });

    const [createOpen, setCreateOpen] = useState(false);
    const formRef = useRef<TicketFormHandle>(null);
    const queryClient = useQueryClient();

    const { data: clients = [] } = useQuery({
        queryKey: ["clients-select"],
        queryFn: getClientsSelectAction,
        enabled: createOpen || !!editingTicket,
    });

    const { mutate: create, isPending } = useMutation({
        mutationFn: createTicketAction,
        onSuccess: () => {
            toast.success("Ticket creado");
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            setCreateOpen(false);
        },
        onError: () => toast.error("No se pudo crear el ticket"),
    });

    const handleCreate = (values: TicketFormValues) => create(values);


    const editFormRef = useRef<TicketFormHandle>(null);

    const { mutate: update, isPending: isUpdating } = useMutation({
        mutationFn: (values: TicketFormValues) => updateTicketAction(editingTicket!.id, values),
        onSuccess: () => {
            toast.success("Ticket actualizado");
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            setEditingTicket(null);
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.status === 403
                    ? "No podés editar un ticket que no es tuyo"
                    : "No se pudo actualizar el ticket"
            );
        },
    });

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>
                    <p className="text-muted-foreground mt-1">Gestioná las solicitudes de soporte</p>
                </div>
                <Button onClick={() => setCreateOpen(true)} className="gap-1.5">
                    <Plus className="h-4 w-4" />
                    Nuevo ticket
                </Button>
            </div>

            <TicketsFilters
                search={search}
                onSearchChange={(value) => {
                    setSearch(value);
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
                status={status}
                onStatusChange={(value) => {
                    setStatus(value);
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
            />

            <CustomDataTable
                columns={ticketColumns(setEditingTicket)}
                data={data?.data ?? []}
                pageCount={data?.totalPages ?? 0}
                totalItems={data?.total ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                isLoading={isLoading}
            />

            <CustomFormModal
                open={createOpen}
                onOpenChange={setCreateOpen}
                title="Nuevo ticket"
                description="Registrá una nueva solicitud de soporte"
                onSubmit={() => formRef.current?.submit()}
                isSubmitting={isPending}
                submitLabel="Crear ticket"
            >
                <TicketForm ref={formRef} onSubmit={handleCreate} clients={clients} />
            </CustomFormModal>


            <CustomFormModal
                open={!!editingTicket}
                onOpenChange={(open) => !open && setEditingTicket(null)}
                title="Editar ticket"
                onSubmit={() => editFormRef.current?.submit()}
                isSubmitting={isUpdating}
                submitLabel="Guardar cambios"
            >
                {editingTicket && (
                    <TicketForm
                        key={editingTicket.id} // ✅ esto fuerza que React cree una instancia NUEVA del form
                        ref={editFormRef}
                        defaultValues={{
                            title: editingTicket.title,
                            description: editingTicket.description,
                            clientId: editingTicket.clientId,
                            priority: editingTicket.priority,
                        }}
                        onSubmit={(values) => update(values)}
                        clients={clients}
                    />
                )}
            </CustomFormModal>
        </div>
    );
};