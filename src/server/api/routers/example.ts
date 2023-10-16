/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function handleError(error: unknown, message: string) {
  if (error instanceof Error) {
    console.error(message, error);
  } else {
    console.error(message, "Unknown error occurred:", error);
  }
  return { success: false, message };
}

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  signupStudent: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        password: z.string(),
        gender: z.string(),
        studentNo: z.string(),
        image: z.string(),
        address: z.string(),
        course: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const student = await ctx.prisma.students.create({
        data: {
          firstname: input.firstName,
          lastname: input.lastName,
          username: input.username,
          password: input.password,
          gender: input.gender,
          studentNo: input.studentNo,
          image: input.image,
          address: input.address,
          courseId: input.course,
        },
      });
      return { success: true, student };
    }),

  signupStudentAdmin: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        password: z.string(),
        gender: z.string(),
        studentNo: z.string(),
        image: z.string(),
        address: z.string(),
        course: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const student = await ctx.prisma.students.create({
        data: {
          status: true,
          firstname: input.firstName,
          lastname: input.lastName,
          username: input.username,
          password: input.password,
          gender: input.gender,
          studentNo: input.studentNo,
          image: input.image,
          address: input.address,
          courseId: input.course,
        },
      });
      return { success: true, student };
    }),

  loginStudent: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hasStudent = await ctx.prisma.students.findFirst({
        where: {
          AND: [
            { studentNo: { equals: input.username } },
            { password: { equals: input.password } },
          ],
        },
      });
      return hasStudent;
    }),

  loginAdmin: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hasStudent = await ctx.prisma.admin.findFirst({
        where: {
          AND: [
            { username: { equals: input.username } },
            { password: { equals: input.password } },
          ],
        },
      });
      return hasStudent;
    }),

  studentDetails: publicProcedure
    .input(
      z.object({
        id: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const studentData = await ctx.prisma.students.findUnique({
        where: { id: input.id || "" },
        include: {
          Course: true,
          capstone: true,
        },
      });
      return studentData;
    }),

  editProfilepicture: publicProcedure
    .input(
      z.object({
        id: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        username: z.string(),
        password: z.string(),
        gender: z.string(),
        studentNo: z.string(),
        image: z.string(),
        address: z.string(),
        courseId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const student = await ctx.prisma.students.update({
        where: {
          id: input.id,
        },
        data: {
          firstname: input.firstname,
          lastname: input.lastname,
          username: input.username,
          password: input.password,
          gender: input.gender,
          studentNo: input.studentNo,
          image: input.image,
          address: input.address,
          courseId: input.courseId,
        },
      });
      return { success: true, student };
    }),

  editPassword: publicProcedure
    .input(
      z.object({
        id: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const student = await ctx.prisma.students.update({
        where: {
          id: input.id,
        },
        data: {
          password: input.password,
        },
      });
      return { success: true, student };
    }),

  approvedStudents: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.students.findMany({
      where: {
        status: true,
      },
      include: {
        Course: true,
      },
    });
  }),

  notApprovedStudents: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.students.findMany({
      where: {
        status: false,
      },
      include: {
        Course: true,
      },
    });
  }),

  verifyStudents: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const student = await ctx.prisma.students.update({
        where: {
          id: input.id,
          status: false,
        },
        data: {
          status: true,
        },
      });
      return { success: true, student };
    }),

  courseData: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.course.findMany({});
  }),
});
