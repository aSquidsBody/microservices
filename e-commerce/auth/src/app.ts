import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@asquidsbodytickets/common";

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

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// If all routes fail, thow a not found error (regardless of request type, which is why
// we didn't use app.get('*', ...), or post or something)
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Error handling middleware (must be last in the list of app.use's)
app.use(errorHandler);

export { app };
