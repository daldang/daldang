import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const desertLogRouter = createTRPCRouter({
  getAllDesertLogs: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.desertLog.findMany({
      where: {
        authorId: {
          equals: ctx.session.user.id,
        },
      },
    });
  }),

  createDesertLog: protectedProcedure
    .input(
      z.object({ authorId: z.string(), content: z.string(), date: z.date() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.desertLog.create({
        data: {
          authorId: input.authorId,
          content: input.content,
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