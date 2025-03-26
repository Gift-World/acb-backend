import "express-async-errors";
import express, { Express, Request, Response, NextFunction } from "express";
import { Resend } from "resend";
import dotenv from "dotenv";
import cors from "cors";
import { render } from "@react-email/render";
import { ContactEmail } from "./emails/ContactEmail";

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 3001;

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  captchaToken: string;
}

interface CaptchaResponse {
  success: boolean;
  [key: string]: any;
}

interface ErrorWithMessage {
  message: string;
}

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

const sendEmailHandler = async (
  req: Request<{}, any, ContactFormData>,
  res: Response,
): Promise<void> => {
  const { name, email, message } = req.body;

  // const captchaResponse = await fetch("https://hcaptcha.com/siteverify", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   body: `response=${captchaToken}&secret=${process.env.HCAPTCHA_SECRET}`,
  // });
  //
  // const captchaData: CaptchaResponse = await captchaResponse.json();
  // if (!captchaData.success) {
  //   res.status(400).json({ error: "Invalid captcha" });
  //   return;
  // }

  const emailHtml = await render(
    <ContactEmail name={name} email={email} message={message} />,
  );

  const emailData = await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: [email],
    subject: `Email from ${name}`,
    html: emailHtml,
  });

  res.status(200).json({ success: true, data: emailData });
};

app.post("/api/send-email", sendEmailHandler);

app.use(
  (error: ErrorWithMessage, _: Request, res: Response, __: NextFunction) => {
    console.error("Error:", error);
    const errorMessage = error.message || "Unknown error";
    res.status(500).json({
      error: "Failed to send email",
      details: errorMessage,
    });
  },
);

app.get("/health", (_: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
