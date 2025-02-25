import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/", async (req: Request, res: Response) => {
  const data = req.body;
  const users = await prisma.referal.findMany();
  res.json(users);
});

app.post("/refer", async (req: Request, res: Response) => {
  const userData = req.body;
  const formattedUserData = {
    ...userData,
    referrerAmt: Number(userData.referrerAmt),
    refereeAmt: Number(userData.refereeAmt),
  };
  console.log(formattedUserData);
  const insertedData = await prisma.referal.create({ data: formattedUserData });
  res.json(insertedData);
});

app.listen(PORT, () => {
  console.log(`server runnning at ${PORT}`);
});
