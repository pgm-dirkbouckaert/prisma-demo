/**
 * A Home Controller
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const home = async (req, res) => {
  // Get menu items
  const menuItems = await prisma.navigationItem.findMany();
  console.log("menuItems:", menuItems);
  // Get user data
  const userData = {
    firstname: "Ada",
    lastname: "Lovelace",
    interests: [
      {
        name: "Mathematics",
      },
      {
        name: "Algorithms",
      },
      {
        name: "Computer Science",
      },
    ],
  };

  res.render("home", {
    menuItems,
    userData,
  });
};
