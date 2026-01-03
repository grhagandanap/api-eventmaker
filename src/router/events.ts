import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { createAndUpdateUserEvents } from "../utils/validation.js";

export const eventRoute = new Hono()
  .get("/", async (c) => {
    const events = await prisma.events.findMany({
      include: { participants: true },
    });
    return c.json({ event: events });
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const event = await prisma.events.findFirst({
      where: { id: id },
      include: { participants: true },
    });
    return c.json({ event: event });
  })
  .post("/", zValidator("json", createAndUpdateUserEvents), async (c) => {
    const body = await c.req.json();
    const newEvent = await prisma.events.create({
      data: {
        name: body.name,
        dateTime: body.dateTime,
        location: body.location,
        description: body.description,
        organizer: body.organizer,
      },
    });
    return c.json({ event: newEvent });
  })
  .patch("/:id", zValidator("json", createAndUpdateUserEvents), async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updatedEvent = await prisma.events.update({
      where: { id: id },
      data: {
        name: body.name,
        dateTime: body.dateTime,
        location: body.location,
        description: body.description,
        organizer: body.organizer,
      },
    });

    return c.json({ event: updatedEvent });
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await prisma.events.delete({ where: { id: id } });
    return c.json({ event: `deleted ${id}` });
  });
