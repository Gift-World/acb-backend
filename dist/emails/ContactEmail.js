"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactEmail = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const ContactEmail = ({ name, email, message }) => {
    return ((0, jsx_runtime_1.jsxs)(components_1.Html, { children: [(0, jsx_runtime_1.jsx)(components_1.Head, {}), (0, jsx_runtime_1.jsxs)(components_1.Preview, { children: ["New Contact Form Submission from ", name] }), (0, jsx_runtime_1.jsx)(components_1.Tailwind, { config: {
                    theme: {
                        extend: {
                            colors: {
                                primary: "#F7941D", // Vibrant orange
                                secondary: "#000000", // Black
                            },
                        },
                    },
                }, children: (0, jsx_runtime_1.jsx)(components_1.Body, { className: "bg-gray-50 font-sans text-secondary", children: (0, jsx_runtime_1.jsxs)(components_1.Container, { className: "max-w-2xl mx-auto my-0 p-0", children: [(0, jsx_runtime_1.jsxs)(components_1.Section, { className: "bg-gradient-to-r from-primary to-orange-600 text-secondary p-6 rounded-t-lg", children: [(0, jsx_runtime_1.jsx)(components_1.Heading, { as: "h1", className: "text-2xl font-bold m-0", children: "New Contact Message" }), (0, jsx_runtime_1.jsxs)(components_1.Text, { className: "text-sm mt-1 opacity-90", children: ["Received on ", new Date().toLocaleDateString()] })] }), (0, jsx_runtime_1.jsxs)(components_1.Section, { className: "bg-white p-6", children: [(0, jsx_runtime_1.jsxs)(components_1.Heading, { as: "h2", className: "text-xl font-semibold text-secondary mb-4", children: ["From: ", name] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { className: "text-base mb-4", children: [(0, jsx_runtime_1.jsx)("strong", { className: "text-primary", children: "Email:" }), " ", (0, jsx_runtime_1.jsx)(components_1.Link, { href: `mailto:${email}`, className: "text-primary underline", children: email })] }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "text-base bg-gray-100 p-4 rounded-md whitespace-pre-wrap border border-gray-200", children: message })] }), (0, jsx_runtime_1.jsx)(components_1.Section, { className: "bg-gray-50 p-6 border-t border-gray-200 rounded-b-lg", children: (0, jsx_runtime_1.jsxs)(components_1.Text, { className: "text-sm text-gray-600 m-0", children: ["Sent via", " ", (0, jsx_runtime_1.jsx)(components_1.Link, { href: "https://africascampusbattle.org/", className: "text-primary", children: "Africa Campus Battle" }), " ", "| Need help? Reply to this email."] }) })] }) }) })] }));
};
exports.ContactEmail = ContactEmail;
exports.default = exports.ContactEmail;
