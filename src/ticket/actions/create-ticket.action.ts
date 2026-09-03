import { backendApi } from "@/api/backendApi";
import type { TicketFormValues } from "../components/TicketForm";
import type { Ticket } from "../interfaces/ticket.interface";

export const createTicketAction = async (values: TicketFormValues): Promise<Ticket> => {
  const { data } = await backendApi.post<Ticket>("/tickets", values);
  return data;
};