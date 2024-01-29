import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateUserProfile = async (req: Request, res: Response) => {
  const request = req.body;
  const { id } = req.params;
  try {
    const userProfile = await prisma.userProfile.update({
      where: {
        id: Number(id),
      },
      data: {
        ...request,
      },
    });
    res.json({
      message: "success",
      data: userProfile,
    });
  } catch (error) {
    res.json({
      message: "error",
      error: "Something went wrong",
    });
  }
};
