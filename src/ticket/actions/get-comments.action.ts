import { backendApi } from "@/api/backendApi";
import type { Comment } from "../interfaces/comment.interface";

export const getCommentsAction = async (ticketId: string): Promise<Comment[]> => {
    const { data } = await backendApi.get<Comment[]>(`/comments/ticket/${ticketId}`);
    return data;
};