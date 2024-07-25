import { Request, Response } from "express";
import {
  getTasksFromRedis,
  setTasksInRedis,
  flushTasksFromRedis,
} from "../services/redisService";
import { saveTasksToMongoDB } from "../services/mongoService";

export const fetchAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const tasks = await getTasksFromRedis();
  res.json(tasks);
};

export const addTask = async (task: string): Promise<void> => {
  let tasks = await getTasksFromRedis();
  tasks.push(task);

  if (tasks.length > 50) {
    await saveTasksToMongoDB(tasks);
    await flushTasksFromRedis();
  } else {
    await setTasksInRedis(tasks);
  }
};
