import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";

import { CustomDataTable } from "@/components/custom/CustomDataTable";
import { userColumns } from "../components/UserColumns";
import { UsersFilters } from "../components/UserFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { getUsersAction } from "../actions/get-users.action";

export const UsersPage = () => {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("todos");
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

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

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight">Usuarios</h1>
                <p className="text-muted-foreground mt-1">Administrá las cuentas del equipo</p>
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
                columns={userColumns}
                data={data?.data ?? []}
                pageCount={data?.totalPages ?? 0}
                totalItems={data?.total ?? 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                isLoading={isLoading}
            />
        </div>
    );
};