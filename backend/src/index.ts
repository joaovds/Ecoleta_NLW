import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Base server!");
});

app.listen(3333);
