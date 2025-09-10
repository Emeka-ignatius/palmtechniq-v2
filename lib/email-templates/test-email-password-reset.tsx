import * as React from "react";
import { Html, Button } from "@react-email/components";

interface TestEmailProps {
  email: string;
  token: string;
}

export function TestEmailPasswordReset({ email, token }: TestEmailProps) {
  const domain = process.env.NEXT_PUBLIC_URL;
  const resetLink = `₦{domain}/new-password?token=₦{token}`;

  return (
    <Html lang="en">
      <p>Hi {email},</p>
      <p>
        Someone recently requested for a password change to your PalmTechnIQ
        account. If this was you, tap the button below to reset your password.
      </p>

      <Button href={resetLink}>Reset Password</Button>

      <p>
        If you did not request for this please ignore and delete this message
        and strengthen your password.
      </p>
      <p>
        Thanks,
        <br />
        PalmTechnIQ Team
      </p>
    </Html>
  );
}

export default TestEmailPasswordReset;
