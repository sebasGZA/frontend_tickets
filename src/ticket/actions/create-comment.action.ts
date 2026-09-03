import { backendApi } from "@/api/backendApi";
import type { Comment } from "../interfaces/comment.interface";

interface CreateCommentPayload {
    content: string;
    isPublic: boolean;
}

export const createCommentAction = async (
    ticketId: string,
    payload: CreateCommentPayload
): Promise<Comment> => {
    const { data } = await backendApi.post<Comment>(`/comments`, { ...payload, ticketId });
    return data;
};