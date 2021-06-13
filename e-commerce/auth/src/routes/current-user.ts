import express from "express";

import { currentUser } from "@asquidsbodytickets/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  // Return the currentUser as determined by the middleware (given that it exists)
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
