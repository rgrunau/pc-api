import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  console.log(`creating new user`);
  console.log(req.body);
  try {
    const result = await prisma.user.create({
      data: {
        ...req.body,
      },
    });
    console.log("user created");
    if (!result) {
      res.json({
        message: "error",
        data: "user not created",
      });
    }
    res.json({
      message: "success",
      data: result,
    });
    console.log(`created new user with id: ${result.id}`);
  } catch (err) {
    res.json({
      message: "error",
      data: err,
    });
  }
};
