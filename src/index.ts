import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post("/user/create", async (req, res) => {
  console.log(`creating new user`);
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
