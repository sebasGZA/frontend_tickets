import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { CustomDataTable } from "@/components/custom/CustomDataTable";
import { userColumns } from "../components/UserColumns";
import { UsersFilters } from "../components/UserFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { getUsersAction } from "../actions/get-users.action";
import { UserForm, type UserFormHandle, type UserFormValues } from "../components/UserFrom";
import { CustomFormModal } from "@/components/custom/CustomFormModal";
import { createUserAction } from "../actions/create-user.action";
import type { User } from "../interfaces/user.interface";
import { updateUserAction } from "../actions/update-user.action";

export const UsersPage = () => {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("todos");
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const queryClient = useQueryClient();
    const debouncedSearch = useDebounce(search, 400);

    const { data, isLoading } = useQuery({
        queryKey: ["users", pagination, debouncedSearch, role],
        queryFn: () =>
            getUsersAction({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                term: debouncedSearch || undefined,
                role: role === "todos" ? undefined : role,
            }),
        placeholderData: (prev) => prev,
    });

    const [createOpen, setCreateOpen] = useState(false);
    const createFormRef = useRef<UserFormHandle>(null);

    const { mutate: create, isPending: isCreating } = useMutation({
        mutationFn: createUserAction,
        onSuccess: () => {
            toast.success("Usuario creado");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setCreateOpen(false);
        },
        onError: () => toast.error("No se pudo crear el usuario"),
    });

    const [editingUser, setEditingUser] = useState<User | null>(null);
    const editFormRef = useRef<UserFormHandle>(null);

    const { mutate: update, isPending: isUpdating } = useMutation({
        mutationFn: (values: UserFormValues) => updateUserAction(editingUser!.id, values),
        onSuccess: () => {
            toast.success("Usuario actualizado");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setEditingUser(null);
        },
        onError: () => toast.error("No se pudo actualizar el usuario"),
    });


    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Usuarios</h1>
                    <p className="text-muted-foreground mt-1">Administrá las cuentas del equipo</p>
                </div>
                <Button onClick={() => setCreateOpen(true)} className="gap-1.5">
                    <Plus className="h-4 w-4" />
                    Nuevo usuario
                </Button>
            </div>


            <UsersFilters
                term={search}
                onSearchChange={(value) => {
                    setSearch(value);
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
                role={role}
                onRoleChange={(value) => {
                    setRole(value);
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
            />


            <CustomDataTable
                columns={userColumns(setEditingUser)}
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
                title="Nuevo usuario"
                description="Creá una cuenta para un miembro del equipo"
                onSubmit={() => createFormRef.current?.submit()}
                isSubmitting={isCreating}
                submitLabel="Crear usuario"
            >
                <UserForm mode="create" ref={createFormRef} onSubmit={(values) => create(values)} />
            </CustomFormModal>

            <CustomFormModal
                open={!!editingUser}
                onOpenChange={(open) => !open && setEditingUser(null)}
                title="Editar usuario"
                description={editingUser ? editingUser.email : undefined}
                onSubmit={() => editFormRef.current?.submit()}
                isSubmitting={isUpdating}
                submitLabel="Guardar cambios"
            >
                {editingUser && (
                    <UserForm
                        mode="edit"
                        key={editingUser.id}
                        ref={editFormRef}
                        defaultValues={{
                            name: editingUser.name,
                            email: editingUser.email,
                            role: editingUser.role,
                            password: "",
                        }}
                        onSubmit={(values) => update(values)}
                    />
                )}
            </CustomFormModal>
        </div>
    );
};