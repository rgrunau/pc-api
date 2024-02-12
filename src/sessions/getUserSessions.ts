import { Request, Response } from "express";
import { prismaClient } from "../helpers/primsa-client";

export const getUserSessions = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log(`getting sessions for user with id: ${id}`);
    const result = await prismaClient.practiceSession.findMany({
      where: {
        userId: Number(id),
      },
    });
    console.log(result);
    res.json({
      message: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
