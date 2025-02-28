import { z } from "zod";

const novel = z.object({
  novelId: z.string(),
  name: z.string(),
  tags: z.string(),
  author: z.string(),
  cover: z.string(),
  genres: z.array(z.string()),
});

export const novelsSchema = z.array(novel);
