import { z } from "zod";

export const LikedSchema = z.object({
  email: z.string().email(),
});

export const ReplySchema = z.object({
  replyId: z.string(),
  email: z.string().email(),
  userName: z.string(),
  comment: z.string(),
  like: z.array(LikedSchema),
});

export const CommentsSchema = z.array(
  z.object({
    novelId: z.string(),
    chapter: z.number(),
    email: z.string().email(),
    userName: z.string(),
    comment: z.string(),
    like: z.array(LikedSchema),
    replies: z.array(z.string()),
    _id: z.string(),
    createdAt: z.string(),
  })
);

export type ReplyType = z.infer<typeof ReplySchema>;

export type CommentType = z.infer<typeof CommentsSchema>;
