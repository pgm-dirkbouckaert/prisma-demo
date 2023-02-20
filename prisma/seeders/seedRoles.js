import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const newItems = [{ data: { name: "user" } }, { data: { name: "editor" } }, { data: { name: "admin" } }];
  for (const item of newItems) {
    const itemInDB = await prisma.role.findFirst({ where: { name: item.data.name } });
    console.log("itemInDB:", itemInDB);
    if (!itemInDB) await prisma.role.create(item);
  }
  const allItems = await prisma.role.findMany();
  console.log("All items from db: ", allItems);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
