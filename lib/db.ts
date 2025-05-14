// This file would contain your database connection and models
// For a PostgreSQL database with Prisma, it might look like this:

import { PrismaClient } from "@prisma/client"

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma

// In a real application, you would define your database schema in prisma/schema.prisma
// Example schema for this application:

/*
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  address   String
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ratings   Rating[]
  store     Store?
}

model Store {
  id        String   @id @default(cuid())
  name      String
  email     String
  address   String
  ownerId   String   @unique
  owner     User     @relation(fields: [ownerId], references: [id])
  ratings   Rating[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Rating {
  id        String   @id @default(cuid())
  rating    Int
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  storeId   String
  store     Store    @relation(fields: [storeId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, storeId])
}
*/
