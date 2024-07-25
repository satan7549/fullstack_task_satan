"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const taskController_1 = require("./controllers/taskController");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(app);
// const io = new Server(httpServer);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
app.use(express_1.default.json());
app.use("/api", taskRoutes_1.default);
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("add", (task) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, taskController_1.addTask)(task);
        // await flushTasksFromRedis();
        socket.broadcast.emit("taskAdded", task);
    }));
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
