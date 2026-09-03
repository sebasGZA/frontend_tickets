import { backendApi } from "@/api/backendApi";
import type { TicketsResponse } from "../interfaces/tickets.response.interface";
import type { GetTicketsParams } from "../interfaces/get-ticket-params.interface";

export const getTicketsAction = async (params: GetTicketsParams): Promise<TicketsResponse> => {
    const { data } = await backendApi.get<TicketsResponse>("/tickets", { params });
    return data;
};