import type { Client } from "./client.interface";

export interface ClientResponse {
    data: Client[];
    total: number;
    currentPage: number;
    totalPages: number;
}