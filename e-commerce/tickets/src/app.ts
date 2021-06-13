import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { createTicketRouter } from "./routes/new";
import { ShowTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@asquidsbodytickets/common";

const app = express();

// traffic is being proxied through nginx. By default, express won't like that.
app.set("trust proxy", true);

// Middleware
app.use(json()); // creates .json() function in response objects
app.use(
  // creates .session object in request objects
  cookieSession({
    signed: false, // not encrypted
    // if true: only allow cookies over https connections, else allow for insecure connection
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser); // AFTER the cookie has been set (even if a route doesn't use this, it doesn't hurt to define currentUser)

// Routes
app.use(createTicketRouter);
app.use(ShowTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

// If all routes fail, thow a not found error (regardless of request type, which is why
// we didn't use app.get('*', ...), or post or something)
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Error handling middleware (must be last in the list of app.use's)
app.use(errorHandler);

export { app };
