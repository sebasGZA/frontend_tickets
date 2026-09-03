import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";

import { CustomDataTable } from "@/components/custom/CustomDataTable";
import { ticketColumns } from "../components/TicketColumns";
import { TicketsFilters } from "../components/TicketFilter";
import { useDebounce } from "@/hooks/useDebounce";
import { getTicketsAction } from "../actions/get-tickets.action";

export const TicketsPage = () => {
    const [search, setSearch] = useState("");
    const [status, setEstado] = useState("todos");
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

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>
                <p className="text-muted-foreground mt-1">Gestioná las solicitudes de soporte</p>
            </div>

            <TicketsFilters
                search={search}
                onSearchChange={(value) => {
                    setSearch(value);
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
                status={status}
                onStatusChange={(value) => {
                    setEstado(value);
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
            />

            <CustomDataTable
                columns={ticketColumns}
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