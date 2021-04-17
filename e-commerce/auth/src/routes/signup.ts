import express, { Request, Response } from "express";
import { body } from "express-validator"; // apply as middleware
import jwt from "jsonwebtoken";

import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      // process.env is how to access an enviroment variable
      process.env.JWT_KEY! // '!' tells Typescript that we are 100% sure that this value is defined
    );

    // Store it on the session object
    // In js, use req.session.jwt = userJwt;
    req.session = {
      jwt: userJwt,
    };

    // 201 == record was created
    res.status(201).send(user);
  }
);

export { router as signupRouter };
