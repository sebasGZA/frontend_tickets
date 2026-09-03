import type { Ticket } from "./ticket.interface";

export interface TicketsResponse {
    data: Ticket[];
    total: number;
    currentPage: number;
    totalPages: number;
}