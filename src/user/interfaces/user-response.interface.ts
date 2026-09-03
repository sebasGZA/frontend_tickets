import type { User } from "./user.interface";

export interface UsersResponse {
    data: User[];
    total: number;
    currentPage: number;
    totalPages: number;
}