import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getUserProfile = async (req: Request, res: Response) => {
  const id = req.query.id as unknown as number;
  console.log(`looking for user with id: ${id}`);
  try {
    const result = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    console.log("looking for user profile");

    if (!result) {
      res.json({
        message: "error",
        data: "user not found",
      });
    } else {
      res.json({
        message: "success",
        data: result,
      });
    }
  } catch (err) {
    return {
      message: "error",
      data: err,
    };
  }
};
