import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator"; // apply as middleware

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    // apply middleware. If something is wrong with the body of the request, some info will be appended to the
    // request
    body("email")
      .isEmail() // checks if valid email
      .withMessage("Email must be valid"), // handle error with this message
    body("password")
      .trim() // remove leading and trailing whitespace
      .isLength({ min: 4, max: 20 }) // length requirements
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {
    // Check if errors were appended to the request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array()); // array() makes a json-safe array
    }

    const { email, password } = req.body;

    console.log("Creating a user...");

    res.send({});
  }
);

export { router as signupRouter };
