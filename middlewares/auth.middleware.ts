import { NextFunction, Request, Response } from "express";
import User from "../model/user.model";

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({
      token: token,
      deleted: false
    }).select("-password");
    if (user) {
      req["user"] = user;
    }
  }
  next();
}