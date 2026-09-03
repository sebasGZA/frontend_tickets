import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";

import { CustomDataTable } from "@/components/custom/CustomDataTable";
import { ClientColumns } from "../components/ClientColumns";
import { ClientFilters } from "../components/ClientFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { getClientsAction } from "../actions/get-clients.action";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClientForm, type ClientFormHandle, type ClientFormValues } from "../components/ClientForm";
import { createClientAction } from "../actions/create-client.action";
import { toast } from "sonner";
import { updateClientAction } from "../actions/update-client.actio";
import type { Client } from "../interfaces/client.interface";
import { CustomFormModal } from "@/components/custom/CustomFormModal";

export const ClientsPage = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const debouncedSearch = useDebounce(search, 400);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["clients", pagination, debouncedSearch],
    queryFn: () =>
      getClientsAction({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        term: debouncedSearch || undefined,
      }),
    placeholderData: (prev) => prev,
  });

  const [createOpen, setCreateOpen] = useState(false);
  const createFormRef = useRef<ClientFormHandle>(null);

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: createClientAction,
    onSuccess: () => {
      toast.success("Cliente creado");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setCreateOpen(false);
    },
    onError: () => toast.error("No se pudo crear el cliente"),
  });

  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const editFormRef = useRef<ClientFormHandle>(null);

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: (values: ClientFormValues) => updateClientAction(editingClient!.id, values),
    onSuccess: () => {
      toast.success("Cliente actualizado");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setEditingClient(null);
    },
    onError: () => toast.error("No se pudo actualizar el cliente"),
  });


  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground mt-1">Empresas y contactos que generan tickets</p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Nuevo cliente
        </Button>
      </div>

      <ClientFilters
        term={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
      />

      <CustomDataTable
        columns={ClientColumns(setEditingClient)}
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
        title="Nuevo cliente"
        description="Registrá una nueva empresa o contacto"
        onSubmit={() => createFormRef.current?.submit()}
        isSubmitting={isCreating}
        submitLabel="Crear cliente"
      >
        <ClientForm ref={createFormRef} onSubmit={(values) => create(values)} />
      </CustomFormModal>

      <CustomFormModal
        open={!!editingClient}
        onOpenChange={(open) => !open && setEditingClient(null)}
        title="Editar cliente"
        description={editingClient ? editingClient.email : undefined}
        onSubmit={() => editFormRef.current?.submit()}
        isSubmitting={isUpdating}
        submitLabel="Guardar cambios"
      >
        {editingClient && (
          <ClientForm
            key={editingClient.id}
            ref={editFormRef}
            defaultValues={{
              name: editingClient.name,
              email: editingClient.email,
            }}
            onSubmit={(values) => update(values)}
          />
        )}
      </CustomFormModal>
    </div>
  );
};