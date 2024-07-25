import { createClient } from "redis";

const redisClient = createClient({
  url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient.connect();

export const getTasksFromRedis = async (): Promise<string[]> => {
  const tasks = await redisClient.get(
    `FULLSTACK_TASK_${process.env.FIRST_NAME}`
  );
  return tasks ? JSON.parse(tasks) : [];
};

export const setTasksInRedis = async (tasks: string[]): Promise<void> => {
  await redisClient.set(
    `FULLSTACK_TASK_${process.env.FIRST_NAME}`,
    JSON.stringify(tasks)
  );
};

export const flushTasksFromRedis = async (): Promise<void> => {
  await redisClient.del(`FULLSTACK_TASK_${process.env.FIRST_NAME}`);
};
