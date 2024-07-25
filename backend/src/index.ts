import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import taskRoutes from "./routes/taskRoutes";
import { addTask } from "./controllers/taskController";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

app.use("/api", taskRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("add", async (task: string) => {
    console.log(task, "task");
    // await flushTasksFromRedis();
    await addTask(task);

    socket.broadcast.emit("taskAdded", task);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
