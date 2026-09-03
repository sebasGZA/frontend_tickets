import { backendApi } from "@/api/backendApi";
import type { ReassignFormValues } from "../components/ReassignTicketForm";
import type { Ticket } from "../interfaces/ticket.interface";

export const reassignTicketAction = async (
    id: string,
    values: ReassignFormValues
): Promise<Ticket> => {
    const { data } = await backendApi.post<Ticket>(`/reassignments`, { ...values, ticketId: id });
    return data;
};