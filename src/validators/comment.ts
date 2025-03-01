import { z } from "zod";

export const CommentsSchema = z.array(
  z.object({
    novelId: z.string(),
    chapter: z.number(),
    email: z.string().email(),
    userName: z.string(),
    comment: z.string(),
  })
);

export type CommentType = z.infer<typeof CommentsSchema>;
