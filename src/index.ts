import "dotenv/config";
import express from "express";
import cors from "cors";
import { createUser } from "./user/createUser";
import { getSignInUser } from "./user/getSignInUser";
import { updateUserProfile } from "./user/updateUserProfile";
import { upload, uploadFile } from "./helpers/uploadHelper";
import { addInstrument } from "./intstruments/addInstrument";
import { Request } from "express";
import { getUser } from "./user/getUser";
import { createNewSession } from "./sessions/createNewSession";

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
  }),
);
app.use(express.json());
app.patch("/api/user/update-profile/:id", updateUserProfile);
app.post("/api/user/create", createUser);
app.get("/api/user/get-user", getSignInUser);
// app.post("/api/user/create-profile", createUserProfile)
app.post("/api/user-profile/add-instrument", addInstrument);
app.get("/api/user/user-profile", getUser);
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
  },
);
app.post("/api/sessions/create", createNewSession);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
