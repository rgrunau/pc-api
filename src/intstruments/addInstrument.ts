import { Request, Response } from "express";
import { prismaClient } from "../helpers/primsa-client";

export const addInstrument = async (req: Request, res: Response) => {
  const { name, userProfileId, } = req.body;
  try {
    const result = await prismaClient.instrument.create({
      data: {
        name,
        userProfile: {
          connect: {
            id: Number(userProfileId),
          },
        }
      },
    });
    if (result) {
      res.json({
        message: "success",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
