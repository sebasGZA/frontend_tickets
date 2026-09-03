import { backendApi } from "@/api/backendApi";
import type { TicketDetail } from "../interfaces/ticket-detail.inteface";

export const getTicketByIdAction = async (id: string): Promise<TicketDetail> => {
    const { data } = await backendApi.get<TicketDetail>(`/tickets/detail/${id}`);
    return data;
};