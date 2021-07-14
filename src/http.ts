import { AppError } from "@errors/AppError";
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import path from "path";
import "reflect-metadata";
import "./container";
import "express-async-errors";
import "./database";
import { Server, Socket } from "socket.io";

import routes from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.engine("html", require("ejs").renderFile);

app.set("view engiine", "html");

app.get("/", (req, res) => {
  res.render("html/client.html");
});

const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket) => console.log(socket.id));

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

export { http, io };
