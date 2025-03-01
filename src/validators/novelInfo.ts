import { z } from "zod";

export const NovelInfoSchema = z.object({
  overview: z.array(z.string()),
  totalChapters: z.number(),
  lastUpdate: z.string(),
  cover: z.string(),
  name: z.string(),
  author: z.string(),
  novelId: z.string(),
  genres: z.array(z.string()),
  tags: z.string(),
  status: z.string(),
});

export type NovelInfoType = z.infer<typeof NovelInfoSchema>;
