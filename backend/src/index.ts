import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import taskRoutes from "./routes/taskRoutes";
import { addTask } from "./controllers/taskController";
import cors from "cors";
import { flushTasksFromRedis } from "./services/redisService";

const app = express();

app.use(cors());

const httpServer = createServer(app);

// const io = new Server(httpServer);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

app.use("/health", (req, res) => {
  res.status(200).json("server is running");
});

app.use("/api", taskRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("add", async (task: string) => {
    await addTask(task);
    socket.emit("taskAdded", task);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
