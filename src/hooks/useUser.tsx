"use client";
import { setUser, store } from "@/redux/userSlice";
import { useEffect, useState } from "react";
import { z } from "zod";

const LibrarySchema = z.object({
  novelId: z.string(),
  lastRead: z.number(),
});
const UnlockedSchema = z.object({
  novelId: z.string(),
  chapters: z.array(z.number()),
});
const UserSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  library: z.array(LibrarySchema),
  unlocked: z.array(UnlockedSchema),
});

type UserData = z.infer<typeof UserSchema>;

export default function useUser() {
  const [userData, setUserData] = useState<UserData>();
  const [isPending, setPending] = useState(false);

  const fetchUser = async () => {
    console.log("fetch");
    try {
      setPending(true);
      const response = await fetch("/api/user");
      if (response.status === 200) {
        const user = await response.json();
        setUserData(UserSchema.parse(user));
      } else {
        throw Error("error");
      }
    } catch {
    } finally {
      setPending(false);
    }
  };

  const reFetch = async () => {
    fetchUser();
  };

  useEffect(() => {
    if (userData) {
      store.dispatch(setUser({ ...userData }));
      console.log("dispatch");
    }
  }, [userData]);
  return { reFetch, isPending, userData };
}
