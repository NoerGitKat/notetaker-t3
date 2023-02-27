import { object, string } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      object({
        topicId: string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),

  create: protectedProcedure
    .input(object({ title: string(), content: string(), topicId: string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          topicId: input.topicId,
        },
      });
    }),

  delete: protectedProcedure
    .input(object({ id: string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
