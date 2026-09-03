import type { PriorityType } from "../types/priority.type";
import type { StatusType } from "../types/status-type";

export interface Ticket {
  id: string;
  title: string;
  client: string;
  status: StatusType;
  priority: PriorityType;
  assignedTo: string | null;
  createdAt: string;
}