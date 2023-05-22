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
    .input(z.object({ content: z.string(), date: z.date() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.desertLog.create({
        data: {
          authorId: ctx.session.user.id,
          content: input.content,
        },
      });
    }),

  deleteDesertLog: protectedProcedure
    .input(z.object({ desertLogId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
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
