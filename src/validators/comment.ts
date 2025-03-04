import { z } from "zod";

export const ReplySchema = z.array(
  z.object({
    replyId: z.string(),
    email: z.string().email(),
    userName: z.string(),
    comment: z.string(),
    like: z.array(z.any()),
    commentId: z.string(),
    createdAt: z.string(),
    isLiked: z.boolean(),
    likeCount: z.number(),
  })
);

export const CommentsSchema = z.array(
  z.object({
    novelId: z.string(),
    chapter: z.number(),
    email: z.string().email(),
    userName: z.string(),
    comment: z.string(),
    like: z.array(z.any()),
    replies: z.array(z.string()),
    _id: z.string(),
    createdAt: z.string(),
    isLiked: z.boolean(),
    likeCount: z.number(),
  })
);

export type ReplyType = z.infer<typeof ReplySchema>;

export type CommentType = z.infer<typeof CommentsSchema>;
