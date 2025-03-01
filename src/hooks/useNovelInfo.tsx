import { NovelInfoSchema } from "@/validators/novelInfo";
import { useQuery } from "@tanstack/react-query";

export default function useNovelInfo(novelId: string) {
  const novelQuery = useQuery({
    queryKey: ["novelInfo", novelId],
    queryFn: async () => {
      const res = await fetch(`/api/novelInfo?novelId=${novelId}`);
      const jsonData = await res.json();
      if (res.status !== 200) throw new Error(jsonData.msg || "error");
      return NovelInfoSchema.parse(jsonData);
    },
    staleTime: 1000 * 60 * 5,
  });

  return novelQuery;
}
