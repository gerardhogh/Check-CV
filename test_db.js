const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany();
  console.log("Users:", users);
  const profiles = await prisma.talentProfile.findMany();
  console.log("Profiles:", profiles);
}
main().catch(console.error).finally(() => prisma.$disconnect());
