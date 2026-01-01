import z from "zod";
import { db } from "../db";
import { agent } from "../db/schema";
import { agentsInsertSchema } from "../modules/agents.schemas";
import {
  // baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "../trpc/init";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agent)
        .where(eq(agent.id, input.id));
      return existingAgent;
    }),

  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agent);

    // throw new TRPCError({
    //   code: "INTERNAL_SERVER_ERROR",
    //   message: "Failed to fetch agents",
    // });
    return data;
  }),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      // const {name, instructions} = input;
      // const { auth } = ctx;

      const [createdAgent] = await db
        .insert(agent)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();

      return createdAgent;
    }),
});
