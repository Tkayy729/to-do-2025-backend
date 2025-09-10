import { prisma } from "../db/prisma.js";

export async function listTasks() {
  return prisma.task.findMany({ orderBy: { createdAt: "desc" } });
}
