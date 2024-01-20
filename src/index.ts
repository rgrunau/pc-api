import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.post("/api/user/create", async (req, res) => {
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
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
