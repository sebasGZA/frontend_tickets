import { MessageSquare, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Comment } from "../interfaces/comment.interface";

interface CommentListProps {
    comments: Comment[];
    isLoading: boolean;
}

export const CommentList = ({ comments, isLoading }: CommentListProps) => {
    if (isLoading) {
        return <p className="text-sm text-muted-foreground py-6 text-center">Cargando comentarios...</p>;
    }

    if (comments.length === 0) {
        return (
            <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
                <MessageSquare className="h-8 w-8" />
                <p className="text-sm">Todavía no hay comentarios</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        {comment.authorName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{comment.authorName}</span>
                            <span className="text-xs text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleString("es-CO", {
                                    day: "2-digit",
                                    month: "short",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                            {!comment.isPublic && (
                                <Badge variant="outline" className="gap-1 text-xs">
                                    <Lock className="h-3 w-3" />
                                    Interno
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-foreground/90 whitespace-pre-wrap">{comment.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};