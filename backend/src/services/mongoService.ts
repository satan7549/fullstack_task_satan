import mongoose from "mongoose";

const mongoURL = process.env.MONGODB_URL!;

const collectionName = process.env.COLLECTION_NAME!;

mongoose.connect(mongoURL);

const taskSchema = new mongoose.Schema({
  task: String,
});

const Task = mongoose.model(collectionName, taskSchema);

export const saveTasksToMongoDB = async (tasks: string[]): Promise<void> => {
  await Task.insertMany(tasks.map((task) => ({ task })));
};
