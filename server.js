"use strict";

import express from "express";
import path from "path";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, "dist");

app.use(express.static(DIST_DIR));
app.listen(PORT, () => {
  console.log("server is running");
});
