import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
const upload = multer({ dest: "temp/" });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: "auto",
    });
    res.json(result.secure_url); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8000, () => console.log("running on port 8000"));
