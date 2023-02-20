import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUser = async (req, res, next) => {
  if (!req.body.id) {
    const users = await prisma.user.findMany({
      include: { user_meta: true, roles: true, interests: true },
    });
    return res.json(users);
  } else {
    const user = await prisma.user.findFirst({
      where: { id: req.body.id },
      include: { user_meta: true, roles: true, interests: true },
    });
    if (!user) return res.json({ message: "The requested user was not found." });
    return res.json(user);
  }
};

export const postUser = async (req, res, next) => {
  const userInDB = await prisma.user.findFirst({ where: { firstname: req.body.data.firstname, lastname: req.body.data.lastname } });
  if (userInDB) return res.json({ message: "User already exists." });
  const insertedUser = await prisma.user.create({ ...req.body });
  return res.json(insertedUser);
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  // Get existing user
  const user = await prisma.user.findFirst({ where: { id: parseInt(id) } });
  if (!user) return res.json({ message: "The requested user was not found." });
  // update the user
  const update = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { ...req.body.data },
    include: { ...req.body.include },
  });
  return res.json(update);
};

export const deleteUser = async (req, res, next) => {
  let { id } = req.params;
  id = parseInt(id);
  // Get existing user
  const user = await prisma.user.findFirst({ where: { id } });
  if (!user) return res.json({ message: "The requested user was not found." });
  // Delete the user
  await prisma.user.delete({ where: { id } });
  return res.json({ message: "The user was succesfully deleted." });
};
