import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 8000;

async function main() {}

app.get("/", async (req: Request, res: Response) => {
  const data = req.body;
  const users = await prisma.referal.findMany();
  res.json(users);
});

app.post("/", async (req: Request, res: Response) => {
  const data = await prisma.referal.create({
    data: {
      referrerName: "Ramesh",
      referrerMail: "ramesh@gmail.com",
      referrerAmt: 7000,
      refereeName: "Suresh",
      refereeMail: "suresh@gmail.com",
      refereeAmt: 6000,
      course: "Web Dev",
    },
  });
  res.json("done");
});

app.listen(PORT, () => {
  console.log(`server runnning at ${PORT}`);
});
