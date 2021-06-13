import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { NotFoundError } from "@asquidsbodytickets/common";

const router = express.Router();

// Return a specific ticket
router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id); // find a record by a particular id

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as ShowTicketRouter };
