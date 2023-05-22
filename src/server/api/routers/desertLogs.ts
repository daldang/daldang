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
});
