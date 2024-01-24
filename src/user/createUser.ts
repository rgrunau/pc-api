import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  console.log(`creating new user`);
  console.log(req.body);
  const { screenName, ...rest } = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        ...rest,
      },
    });
    console.log(result);
    console.log("user created");
    if (!result) {
      res.json({
        message: "error",
        data: "user not created",
      });
    }
    const profile = await prisma.userProfile.create({
      data: {
        screenName,
        user: {
          connect: {
            id: result.id,
          },
        },
      },
    });
    if (!profile) {
      res.json({
        message: "error",
        data: "profile not created",
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
