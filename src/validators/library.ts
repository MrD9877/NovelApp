import { z } from "zod";

export const Library = z.object({
  novelId: z.string(),
  cover: z.string(),
  lastRead: z.number(),
  totalChapters: z.number(),
  name: z.string(),
});
export const LibrarySchema = z.array(Library);

export type Library = z.infer<typeof Library>;
