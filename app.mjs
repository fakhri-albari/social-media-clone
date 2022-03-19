import express from "express";
import config from "./config.mjs";

const app = express();

const PORT = process.env.PORT || config.PORT;

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(PORT, () => {
  console.log(`App start using port ${PORT}`);
});
