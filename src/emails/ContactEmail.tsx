import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Tailwind,
  Preview,
  Link,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmail = ({ name, email, message }: ContactEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission from {name}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#F7941D", // Vibrant orange
                secondary: "#000000", // Black
              },
            },
          },
        }}
      >
        <Body className="bg-gray-50 font-sans text-secondary">
          {/* Header */}
          <Container className="max-w-2xl mx-auto my-0 p-0">
            <Section className="bg-gradient-to-r from-primary to-orange-600 text-secondary p-6 rounded-t-lg">
              <Heading as="h1" className="text-2xl font-bold m-0">
                New Contact Message
              </Heading>
              <Text className="text-sm mt-1 opacity-90">
                Received on {new Date().toLocaleDateString()}
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="bg-white p-6">
              <Heading
                as="h2"
                className="text-xl font-semibold text-secondary mb-4"
              >
                From: {name}
              </Heading>
              <Text className="text-base mb-4">
                <strong className="text-primary">Email:</strong>{" "}
                <Link
                  href={`mailto:${email}`}
                  className="text-primary underline"
                >
                  {email}
                </Link>
              </Text>
              <Text className="text-base bg-gray-100 p-4 rounded-md whitespace-pre-wrap border border-gray-200">
                {message}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-50 p-6 border-t border-gray-200 rounded-b-lg">
              <Text className="text-sm text-gray-600 m-0">
                Sent via{" "}
                <Link
                  href="https://africascampusbattle.org/"
                  className="text-primary"
                >
                  Africa Campus Battle
                </Link>{" "}
                | Need help? Reply to this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;
