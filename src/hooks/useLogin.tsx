import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";

async function login(router: AppRouterInstance, email: string, password: string) {
  try {
    const res = await fetch("/api/login", { method: "POST", credentials: "include", body: JSON.stringify({ email, password }) });
    if (res.status === 200) {
      router.push("/home");
    } else if (res.status === 400) {
      const data = await res.json();
      toast(data.msg);
    } else if (res.status === 500) {
      console.log("500");
      toast("Internal server Error");
    } else {
      toast(`Error ${res.statusText}`);
    }
  } catch {
    toast("Server not responding");
  }
}

async function register(router: AppRouterInstance, email: string, password: string) {
  try {
    const res = await fetch("/api/signup", { method: "POST", credentials: "include", body: JSON.stringify({ email, password }) });
    if (res.status === 200) {
      toast("Welcome");
      router.push("/home");
    } else if (res.status === 400) {
      const data = await res.json();
      toast(data.msg);
    } else if (res.status === 500) {
      console.log("500");
      toast("Internal server Error");
    } else {
      toast(`Error ${res.statusText}`);
    }
  } catch {
    toast("Server not responding");
  }
}

export default function useLogin() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, submitAction, isPending] = useActionState(async (previousState: any, formData: FormData) => {
    const data = Object.fromEntries(formData);
    const email = (data.email as string).trim().toLowerCase();
    const password = data.password as string;
    const action = formData.get("action");
    if (action === "login") await login(router, email, password);
    if (action === "signup") await register(router, email, password);
    return null;
  }, null);
  return [error, submitAction, isPending] as const;
}
