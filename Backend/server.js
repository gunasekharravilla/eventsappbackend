import express from "express";
import mongoose from "mongoose";
import uploadRouter from "./routers/uploadRouter.js";
import path from "path";

import eventRouter from "./routers/eventRouter.js";

const app = express();

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/ramco", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/events", eventRouter);
app.use("/api/uploads", uploadRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("Server is ready");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
