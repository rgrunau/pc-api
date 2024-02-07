import { Request, Response } from "express";
import { prismaClient } from "../helpers/primsa-client";

export const createNewSession = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    console.log(`creating new session for user with id: ${id}`);
    const result = await prismaClient.practiceSession.create({
      data: {
        userId: id,
        startTime: new Date(),
        title: "New Session",
        description: "New Session",
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
