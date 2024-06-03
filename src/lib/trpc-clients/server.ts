import { appRouter } from '@/server';
import { httpBatchLink } from "@trpc/client";

// TRPC client for server-side requests
export const trpcServer = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});
