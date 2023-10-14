/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const capstoneRouter = createTRPCRouter({
  createCapstone: publicProcedure
    .input(
      z.object({
        title: z.string(),
        abstract: z.string(),
        topic: z.string(),
        adviser: z.string(),
        url: z.string(),
        studentMembers: z.string(),
        studentNo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hasStudent = await ctx.prisma.students.findUnique({
        where: {
          studentNo: input.studentNo,
        },
      });
      if (hasStudent) {
        const createCapstone = await ctx.prisma.capstone
          .create({
            data: {
              title: input.title,
              abstract: input.abstract,
              topic: input.topic,
              adviser: input.adviser,
              url: input.url,
              studentMembers: input.studentMembers,
              status: "approved",
            },
            include: {
              Students: true,
            },
          })
          .then(async (data) => {
            return await ctx.prisma.students.update({
              where: {
                studentNo: input.studentNo,
              },
              data: {
                capstoneId: data.id,
              },
            });
          });
        return createCapstone;
      } else {
        return null;
      }
    }),
  notApprovedCapstone: publicProcedure
    .input(
      z.object({
        title: z.string(),
        abstract: z.string(),
        topic: z.string(),
        adviser: z.string(),
        url: z.string(),
        studentMembers: z.string(),
        studentNo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hasStudent = await ctx.prisma.students.findUnique({
        where: {
          studentNo: input.studentNo,
        },
      });
      if (hasStudent) {
        const createCapstone = await ctx.prisma.capstone
          .create({
            data: {
              title: input.title,
              abstract: input.abstract,
              topic: input.topic,
              adviser: input.adviser,
              url: input.url,
              studentMembers: input.studentMembers,
              status: "notapproved",
            },
            include: {
              Students: true,
            },
          })
          .then(async (data) => {
            return await ctx.prisma.students.update({
              where: {
                studentNo: input.studentNo,
              },
              data: {
                capstoneId: data.id,
              },
            });
          });
        return createCapstone;
      } else {
        return null;
      }
    }),

  approvedCapstone: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.capstone.findMany({
      where: {
        status: "approved",
      },
      include: {
        Students: {
          include: {
            Course: true,
          },
        },
      },
    });
  }),
});
