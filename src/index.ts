import "dotenv/config";
import express from "express";
import cors from "cors";
import { createUser } from "./user/createUser";
import { getSignInUser } from "./user/getSignInUser";
import { upload, uploadFile } from "./helpers/uploadHelper";
import { Request } from "express";

//@ts-ignore
declare module "express-serve-static-core" {
  interface Request {
    files: Express.Multer.File[];
  }
}

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.post("/api/user/create", createUser);
app.get("/api/user/get-user", getSignInUser);
app.post(
  "/api/user/profile-uploads",
  upload.single("avatar"),
  async (req: Request, res) => {
    try {
      const result = await uploadFile(req.file);
      res.json({
        message: "success",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
