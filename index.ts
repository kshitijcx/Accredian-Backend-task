import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "*",
  })
); 
app.use(express.json());

const PORT = process.env.PORT || 8000;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (
  rName: string,
  rMail: string,
  rAmt: number,
  reName: string,
  reMail: string,
  reAmt: number,
  course: string
) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: `${rMail}`,
      subject: "Thank you for using our service",
      html: `<h2>Welcome, ${rName}!</h2>
      <p>Thank you for using our service.</p>
      <p>You have referred ${reName} and earned Rs.<strong>${rAmt}</strong>.</p>
      <p>Course Chosen: ${course}</p>`,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: `${reMail}`,
      subject: "Thank you for using our service",
      html: `<h2>Welcome, ${reName}!</h2>
      <p>Thank you for using our service</p>
      <p>You have been referred by ${rName} and earned Rs.<strong>${reAmt}</strong></p>
      <p>Course Chosen: ${course}</p>`,
    });
    console.log("emails sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

app.get("/", async (req: Request, res: Response) => {
  const data = req.body;
  const users = await prisma.referal.findMany();
  res.json(users);
});

app.post("/refer", async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const formattedUserData = {
      ...userData,
      referrerAmt: Number(userData.referrerAmt),
      refereeAmt: Number(userData.refereeAmt),
    };
    const insertedData = await prisma.referal.create({
      data: formattedUserData,
    });
    await sendMail(
      formattedUserData.referrerName,
      formattedUserData.referrerMail,
      formattedUserData.referrerAmt,
      formattedUserData.refereeName,
      formattedUserData.refereeMail,
      formattedUserData.refereeAmt,
      formattedUserData.course
    );
    res.json(insertedData);
  } catch (error) {
    res.status(500).json("error");
  }
});

app.listen(PORT, () => {
  console.log(`server runnning at ${PORT}`);
});
