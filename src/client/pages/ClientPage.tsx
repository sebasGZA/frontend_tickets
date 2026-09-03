import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";

import { CustomDataTable } from "@/components/custom/CustomDataTable";
import { ClientColumns } from "../components/ClientColumns";
import { ClientFilters } from "../components/ClientFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { getClientsAction } from "../actions/get-clients.action";

export const ClientsPage = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const debouncedSearch = useDebounce(search, 400);

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground mt-1">Empresas y contactos que generan tickets</p>
      </div>

      <ClientFilters
        term={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
      />

      <CustomDataTable
        columns={ClientColumns}
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