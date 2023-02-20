import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const newItems = [
    { data: { firstname: "Ada", lastname: "Lovelace" } },
    { data: { firstname: "Gregorio", lastname: "Ramos" } },
    { data: { firstname: "Johan", lastname: "Smith" } },
  ];
  for (const item of newItems) {
    const itemInDB = await prisma.user.findFirst({ where: { firstname: item.data.firstname, lastname: item.data.lastname } });
    console.log("itemInDB:", itemInDB);
    if (!itemInDB) await prisma.user.create(item);
  }
  const allItems = await prisma.user.findMany();
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
