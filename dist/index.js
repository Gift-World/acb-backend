"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const resend_1 = require("resend");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const render_1 = require("@react-email/render");
const ContactEmail_1 = require("./emails/ContactEmail");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));
const sendEmailHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const emailHtml = yield (0, render_1.render)((0, jsx_runtime_1.jsx)(ContactEmail_1.ContactEmail, { name: name, email: email, message: message }));
    const emailData = yield resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: [email],
        subject: `Email from ${name}`,
        html: emailHtml,
    });
    res.status(200).json({ success: true, data: emailData });
});
app.post("/api/send-email", sendEmailHandler);
app.use((error, _, res, __) => {
    console.error("Error:", error);
    const errorMessage = error.message || "Unknown error";
    res.status(500).json({
        error: "Failed to send email",
        details: errorMessage,
    });
});
app.get("/health", (_, res) => {
    res.status(200).json({ status: "OK" });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
