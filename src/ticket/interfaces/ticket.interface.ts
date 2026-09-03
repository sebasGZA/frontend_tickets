import type { PriorityType } from "../types/priority.type";
import type { StatusType } from "../types/status-type";
export interface Ticket {
  id: string;
  title: string;
  description: string;
  client: string;
  clientId: string;
  status: StatusType;
  priority: PriorityType;
  assignedTo: string | null;
  assignedToId: string | null;
  createdAt: string;
}