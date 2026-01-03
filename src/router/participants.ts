import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { createAndUpdateUserParticipants } from "../utils/validation.js";

export const participantsRoute = new Hono()
  .get("/", async (c) => {
    const participants = await prisma.participants.findMany();
    return c.json({ participant: participants });
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const participant = await prisma.participants.findFirst({ where: { id: id } });
    return c.json({ participant: participant });
  })
  .post("/", zValidator("json", createAndUpdateUserParticipants), async (c) => {
    const body = await c.req.json();
    const newParticipant = await prisma.participants.create({
      data: {
        name: body.name,
        email: body.email,
        eventId: body.eventId,
      },
    });
    return c.json({ participant: newParticipant });
  })
  .patch("/:id", zValidator("json", createAndUpdateUserParticipants), async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updatedParticipant = await prisma.participants.update({
      where: { id: id },
      data: {
        name: body.name,
        email: body.email,
        eventId: body.eventId,
      },
    });
    return c.json({ participant: updatedParticipant });
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await prisma.participants.delete({ where: { id: id } });
    return c.json({ participant: `deleted ${id}` });
  });