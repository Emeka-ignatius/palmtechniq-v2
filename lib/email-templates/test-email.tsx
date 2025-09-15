import * as React from "react";
import { Html, Button } from "@react-email/components";

interface TestEmailProps {
  email: string;
  token: string;
}

export function TestEmail({ email, token }: TestEmailProps) {
  const domain = process.env.NEXT_PUBLIC_URL;
  const confrimLink = `${domain}/verify?token=${token}`;

  return (
    <Html lang="en">
      <p>Hi {email},</p>
      <p>Click the link below to verify your email:</p>

      <Button href={confrimLink}>Verify Email</Button>

      <p>
        Thanks,
        <br />
        PalmTechnIQ Team
      </p>
    </Html>
  );
}

export default TestEmail;
