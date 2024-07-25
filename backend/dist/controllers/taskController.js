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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = exports.fetchAllTasks = void 0;
const redisService_1 = require("../services/redisService");
const mongoService_1 = require("../services/mongoService");
const fetchAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, redisService_1.getTasksFromRedis)();
    res.json(tasks);
});
exports.fetchAllTasks = fetchAllTasks;
const addTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    let tasks = yield (0, redisService_1.getTasksFromRedis)();
    tasks.push(task);
    if (tasks.length > 50) {
        yield (0, mongoService_1.saveTasksToMongoDB)(tasks);
        yield (0, redisService_1.flushTasksFromRedis)();
    }
    else {
        yield (0, redisService_1.setTasksInRedis)(tasks);
    }
});
exports.addTask = addTask;
