import { notesRouter } from './routers/notes';
import { createTRPCRouter } from "~/server/api/trpc";
import { topicsRouter } from "./routers/topics";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  topics: topicsRouter,
  notes: notesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
