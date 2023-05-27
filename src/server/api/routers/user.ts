import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  updateUser: protectedProcedure
    .input(
      z.object({
        userid: z.string(),
        username: z.string(),
        profileImage: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.userid,
        },
        data: {
          name: input.username,
          image: input.profileImage,
        },
      });
    }),

  delteUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.delete({
        where: {
          id: input.userId,
        },
      });
    }),
});
