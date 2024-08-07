const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function fetchUsers() {
  return prisma.$queryRaw`SELECT * FROM Users`;
}

export async function fetchFilteredUsers(query) {
  return prisma.$queryRaw`SELECT * FROM Users WHERE Users.name LIKE ${`%${query}%`}`;
}

export async function fetchUserById(id) {
  return prisma.$queryRaw`SELECT id, name, age FROM Users WHERE id = ${id}`;
}
