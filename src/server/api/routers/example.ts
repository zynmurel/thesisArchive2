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
        address :z.string()
      }),
    )
    .mutation(async({ ctx, input }) => {
       
        const student =await ctx.prisma.students.create({
          data: {
            firstname: input.firstName,
            lastname: input.lastName,
            username: input.username,
            password: input.password,
            gender: input.gender,
            studentNo: input.studentNo,
            image: input.image,
            address: input.address
          },
        });
        return { success: true, student };
      }
    ),

     loginStudent:publicProcedure.input(z.object({

      username:z.string(),
      password:z.string(),

     })).mutation (async({ctx,input})=>{


        const hasStudent =  await ctx.prisma.students.findFirst({

          where: {
            AND:[{username:{equals:input.username}},
              {password:{equals:input.password}}
            
            ]
          }

        })
        return hasStudent



     }),


     loginAdmin:publicProcedure.input(z.object({

      username:z.string(),
      password:z.string(),

     })).mutation (async({ctx,input})=>{

        const hasStudent =  await ctx.prisma.admin.findFirst({
          where: {
            AND:[{username:{equals:input.username}},
              {password:{equals:input.password}}
          
            ]
          }

        })
        return hasStudent
     }),


     studentDetails: publicProcedure.input(z.object({
      id: z.string().nullish(),
    })).query(async ({ ctx, input }) => {
      const studentData = await ctx.prisma.students.findUnique({
        where: { id: input.id || "" },
        include: {
         
          Course: true,
        },
      });
      return studentData;
    }),
     

});


