import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const newItems = [
    { data: { text: "Artevelde", url: "https://arteveldehs.be" } },
    { data: { text: "Google", url: "https://google.be" } },
    { data: { text: "Facebook", url: "https://facebook.com" } },
  ];
  for (const item of newItems) {
    const itemInDB = await prisma.navigationItem.findFirst({ where: { text: item.data.text, url: item.data.url } });
    console.log("itemInDB:", itemInDB);
    if (!itemInDB) await prisma.navigationItem.create(item);
  }
  const allItems = await prisma.navigationItem.findMany();
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
