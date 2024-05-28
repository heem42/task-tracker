import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "@/server";

// TRPC client for client-side requests
export const trpc = createTRPCReact<AppRouter>({});
