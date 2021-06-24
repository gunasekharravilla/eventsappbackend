import multer from "multer";
import express from "express";
import sharp from "sharp";

const uploadRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
uploadRouter.use(express.static("./uploads"));

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });

uploadRouter.post("/", upload.single("image"), async (req, res) => {
  fs.access("./uploads", (error) => {
    if (error) {
      fs.mkdirSync("./uploads");
    }
  });
  const { buffer, originalname } = req.file;
  const timestamp = new Date().toISOString();
  const ref = `${timestamp}-${originalname}.jpg`;
  await sharp(buffer)
    .jpg({ quality: 20 })
    .toFile("./uploads/" + ref);
  const link = `http://localhost:3000/${ref}`;
  return res.json({ link });
});

// uploadRouter.post("/", upload.single("image"), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

export default uploadRouter;
