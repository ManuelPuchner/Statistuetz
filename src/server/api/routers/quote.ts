import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const quoteRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.quote.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const createdQuote = await ctx.prisma.quote.create({
        data: {
          text: input.text,
        },
      });
      console.log("Created quote: ", createdQuote);
      return createdQuote;
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deletedQuote = await ctx.prisma.quote.delete({
        where: {
          id: input.id,
        },
      });
      console.log("Deleted quote: ", deletedQuote);
      return deletedQuote;
    }),

  increment: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const quote = await ctx.prisma.quote.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!quote) {
        throw new Error("No quote found");
      }
      const updatedQuote = await ctx.prisma.quote.update({
        where: {
          id: quote.id,
        },
        data: {
          count: quote.count + 1,
        },
      });
      return updatedQuote;
    }),
  decrement: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const quote = await ctx.prisma.quote.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!quote) {
        throw new Error("No quote found");
      }
      const updatedQuote = await ctx.prisma.quote.update({
        where: {
          id: quote.id,
        },
        data: {
          count: quote.count - 1,
        },
      });
      return updatedQuote;
    }),
  changeText: publicProcedure
    .input(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedQuote = await ctx.prisma.quote.update({
        where: {
          id: input.id,
        },
        data: {
          text: input.text,
        },
      });
      return updatedQuote;
    }),
});
