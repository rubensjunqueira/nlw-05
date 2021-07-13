import { AppError } from "@errors/AppError";
import express, { NextFunction, Request, Response } from "express";

import "reflect-metadata";
import "./container";
import "express-async-errors";
import "./database";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "Internal server error!",
    message: err.message,
  });
});

app.listen(3000, () => console.log("Server is Running!"));
