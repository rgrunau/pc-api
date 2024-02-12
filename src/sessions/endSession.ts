import { Request, Response } from "express";
import { prismaClient } from "../helpers/primsa-client";

export const endSession = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    console.log(`ending session for user with id: ${id}`);
    const result = await prismaClient.practiceSession.update({
      where: {
        id: id,
      },
      data: {
        endTime: new Date(),
      },
    });
    res.json({
      message: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
