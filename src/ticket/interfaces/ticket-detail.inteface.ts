import type { PriorityType } from "../types/priority.type";
import type { StatusType } from "../types/status-type";

export interface TicketDetail {
    id: string;
    title: string;
    description: string;
    status: StatusType;
    priority: PriorityType;
    client: string;
    createdBy: string;
    assignedTo?: string;
    createdAt: string;
    updatedAt?: string;
    closedAt?: string;
}