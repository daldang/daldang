import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const desertLogRouter = createTRPCRouter({
  getAllDesertLogs: protectedProcedure
    .input(z.object({ authorId: z.string() }))
    .query(({ ctx }) => {
      return ctx.prisma.desertLog.findMany({
        where: {
          authorId: {
            equals: ctx.session.user.id,
          },
        },
      });
    }),

  getDesertLogById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.desertLog.findFirst({
        where: {
          id: {
            equals: input.id,
          },
        },
      });
    }),

  createDesertLog: protectedProcedure
    .input(
      z.object({
        authorId: z.string(),
        content: z.string(),
        date: z.date(),
        desertCharacter: z.string(),
        desertName: z.string(),
        score: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.desertLog.create({
        data: {
          authorId: input.authorId,
          content: input.content,
          date: input.date,
          desertName: input.desertName,
          desertCharacter: input.desertCharacter,
        },
      });
    }),

  deleteDesertLog: protectedProcedure
    .input(z.object({ authorId: z.string(), desertLogId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.authorId,
        },
        data: {
          desertLogs: {
            deleteMany: {
              id: input.desertLogId,
            },
          },
        },
      });
    }),
});
