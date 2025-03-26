"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Preview;
const jsx_runtime_1 = require("react/jsx-runtime");
// emails/preview.tsx
const ContactEmail_1 = require("./ContactEmail");
function Preview() {
    return ((0, jsx_runtime_1.jsx)(ContactEmail_1.ContactEmail, { name: "John Doe", email: "john@example.com", message: "This is a test message to preview the email template." }));
}
