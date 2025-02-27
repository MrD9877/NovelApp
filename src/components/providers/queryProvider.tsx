"use client"; // Ensures this runs in a Client Component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // Ensures the client persists across renders

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
