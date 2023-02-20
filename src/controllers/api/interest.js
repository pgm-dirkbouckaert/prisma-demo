import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getInterest = async (req, res, next) => {
  try {
    const interestRepo = AppDataSource.getRepository(Interest);
    if (!req.body.name) {
      const interests = await interestRepo.findMany();
      return res.json(interests);
    } else {
      const interest = await interestRepo.findFirst({ where: { id: req.body.name } });
      if (!interest) return res.json({ message: "The requested interest was not found." });
      return res.json(interest);
    }
  } catch (error) {
    next(error.message);
  }
};

export const postInterest = async (req, res, next) => {
  try {
    const interestRepo = AppDataSource.getRepository(Interest);
    const interestInDB = await interestRepo.findFirst({ where: { name: req.body.name } });
    if (interestInDB) return res.json({ message: "Interest already exists." });
    const insertedInterest = await interestRepo.save(req.body);
    return res.json(insertedInterest);
  } catch (error) {
    next(error.message);
  }
};

export const updateInterest = async (req, res, next) => {
  try {
    const interestRepo = AppDataSource.getRepository(Interest);
    // Get existing interest
    const interest = await interestRepo.findFirst({
      where: { id: req.body.id },
    });
    if (!interest) return res.json({ message: "The requested interest was not found." });
    // update the interest
    const update = await interestRepository.save({ ...interest, ...req.body });
    return res.json(update);
  } catch (error) {
    next(error.message);
  }
};

export const deleteInterest = async (req, res, next) => {
  try {
    const interestRepo = AppDataSource.getRepository(Interest);
    const { id } = req.params;
    // Get existing interest
    const interest = await interestRepository.findFirst({ where: { id } });
    if (!interest) return res.json({ message: "The requested interest was not found." });
    // Delete the user
    interestRepository.remove({ id });
    return res.json({ message: "The interest was succesfully deleted." });
  } catch (error) {
    next(error.message);
  }
};
