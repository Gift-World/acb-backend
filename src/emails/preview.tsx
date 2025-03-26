// emails/preview.tsx
import { ContactEmail } from "./ContactEmail";

export default function Preview() {
  return (
    <ContactEmail
      name="John Doe"
      email="john@example.com"
      message="This is a test message to preview the email template."
    />
  );
}
