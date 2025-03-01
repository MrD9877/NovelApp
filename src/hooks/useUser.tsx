"use client";
import { setUser, store } from "@/redux/userSlice";
import { LibrarySchema } from "@/validators/library";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const UnlockedSchema = z.object({
  novelId: z.string(),
  chapters: z.array(z.number()),
});
const UserSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  library: LibrarySchema,
  unlocked: z.array(UnlockedSchema),
});

export type UserData = z.infer<typeof UserSchema>;

export default function useUser() {
  const queryClient = useQueryClient();
  const fetchUser = async () => {
    console.log("fetch");
    try {
      const response = await fetch("/api/user");
      if (response.status === 200) {
        const user = await response.json();
        store.dispatch(setUser({ ...user }));
        return UserSchema.parse(user);
      } else {
        throw Error("error");
      }
    } catch (err) {
      throw Error(err);
    }
  };

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const mutateUser = useMutation({
    mutationFn: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  const reFetch = () => {
    mutateUser.mutate();
  };

  return { reFetch, userData: userQuery.data };
}
