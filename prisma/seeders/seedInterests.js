import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const newItems = [
    { data: { name: "Mathematics" } },
    { data: { name: "Algorithms" } },
    { data: { name: "Computer Science" } },
    { data: { name: "Acting" } },
    { data: { name: "Architecture" } },
    { data: { name: "Calligrapy" } },
    { data: { name: "Coding" } },
    { data: { name: "Webdesign" } },
    { data: { name: "Robotics" } },
  ];
  for (const item of newItems) {
    const itemInDB = await prisma.interest.findFirst({ where: { name: item.data.name } });
    console.log("itemInDB:", itemInDB);
    if (!itemInDB) await prisma.interest.create(item);
  }
  const allItems = await prisma.interest.findMany();
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
