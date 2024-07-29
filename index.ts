import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";


dotenv.config();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Connect database
database.connect();


app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`App listening port on ${port}`);
})

