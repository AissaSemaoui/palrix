import { nextApp, nextHandler } from "./next_app";

import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/app", (req, res) => {
  console.log(req);
  res.json({
    message: "hello world",
  });
});

app.use((req, res) => nextHandler(req, res));

nextApp.prepare().then(() => {
  app.listen(PORT, () => {
    console.log("server is up and running");
  });
});
