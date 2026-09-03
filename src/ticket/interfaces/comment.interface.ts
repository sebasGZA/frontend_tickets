export interface Comment {
    id: string;
    content: string;
    ticketId: string;
    createdById: string;
    authorName: string;
    isPublic: boolean;
    createdAt: string;
}