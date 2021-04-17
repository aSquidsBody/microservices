import { Request, Response, NextFunction } from "express";

import { NotAuthorizedError } from "../errors/not-authorized-error";

// Will reject any request with faild authentication
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Assume the currentUser middleware has already been called
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
