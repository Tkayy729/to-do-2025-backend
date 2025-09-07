import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
    log: ["error", "warn"],        // avoid noisy logs in dev; tune as needed
  });
  
  // Optional: graceful shutdown so connections close cleanly
  export async function disconnectPrisma() {
    await prisma.$disconnect();
  }