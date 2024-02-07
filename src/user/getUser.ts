import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getUserProfile = async (userId: number) => {
  try {
    const result = await prisma.userProfile.findUnique({
      where: {
        userId,
      },
      include: {
        instruments: true,
      }
    });
    console.log("profile result", result);
    return result;
  } catch (err) {
    return {
      message: "error",
      data: err,
    };
  }
};

export const getUser = async (req: Request, res: Response) => {
  let user = {};
  const id = req.query.id as unknown as number;
  try {
    const result = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    console.log("looking for user profile");
    const userProfile = await getUserProfile(id);
    console.log("user profile found");
    user = {
      ...result,
      userProfile,
    };
    if (!result) {
      res.json({
        message: "error",
        data: "user not found",
      });
    } else {
      res.json({
        message: "success",
        data: user,
      });
    }
  } catch (err) {
    return {
      message: "error",
      data: err,
    };
  }
};
