import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const getSignInUser = async (req: Request, res: Response) => {
  try {
    const result = (await prisma.user.findUnique({
      where: {
        email: req.query.email as string,
      },
      include: {
        userProfile: true,
      },
    })) as User;
    console.log("user found");
    if (!result) {
      res.json({
        message: "error",
        data: "user not found",
      });
    } else {
      // @ts-ignore
      if (result?.clerkId === null) {
        await prisma.user.update({
          where: {
            email: result.email as string,
          },
          data: {
            // @ts-ignore
            clerkId: req.query.clerkId,
          },
        });
        console.log(`updated user with clerkId: ${req.query.clerkId}`);
      }
      res.json({
        message: "success",
        data: result,
      });
    }

    console.log(`found user with id: ${result?.id}`);
    console.log(result);
  } catch (err) {
    res.json({
      message: "error",
      data: err,
    });
  }
};
