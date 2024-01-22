import "dotenv/config";
import fs from "fs";
import path from "path";
import { S3Client, PutObjectAclCommand } from "@aws-sdk/client-s3";
import multer from "multer";

import multerS3 from "multer-s3";

export const upload = multer({
  dest: "uploads/",
});

const s3Config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-west-2",
};

const s3Client = new S3Client(s3Config);

export function uploadFile(file: Express.Multer.File | undefined) {
  if (!file) {
    throw new Error("No file");
  }
  const fileStream = fs.createReadStream(file?.path);
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file?.filename,
  };
  return s3Client.send(new PutObjectAclCommand(uploadParams));
}
