import { backendApi } from '@/api/backendApi';
import type { TicketFormValues } from "../components/TicketForm";
import type { Ticket } from "../interfaces/ticket.interface";

export const updateTicketAction = async (
    id: string,
    values: TicketFormValues
): Promise<Ticket> => {
    const { data } = await backendApi.patch<Ticket>(`/tickets/${id}`, values);
    return data;
};