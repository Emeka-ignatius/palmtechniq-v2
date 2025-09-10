import { Resend } from "resend";
import EmailVerification from "./email-templates/email-verification";
import PasswordReset from "./email-templates/password-reset";
import SignIn from "./email-templates/signin";
import { TestEmail } from "./email-templates/test-email";
import TestEmailPasswordReset from "./email-templates/test-email-password-reset";

const resend = new Resend("re_J6eina6x_DwFFkBAXKsPtzqyKLhomX6vX");
// const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_URL;

export const onBoardingMail = async (email: string, fullName: string) => {
  try {
    await resend.emails.send({
      // from: process.env.FROM_EMAIL_ADDRESS!,
      from: "PalmTechnIQ V2 <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to PalmTechnIQ",
      react: SignIn({ fullName }),
    });
    return { success: "Signed-Up successfully!" };
  } catch (error) {
    console.error("Error creating account!", error);
    return { error: "Account Creation failed! Try again" };
  }
};

export const sendPasswordResetToken = async (email: string, token: string) => {
  await resend.emails.send({
    // from: process.env.FROM_EMAIL_ADDRESS!,
    from: "PalmTechnIQ V2 <onboarding@resend.dev>",
    to: email,
    subject: "Password Reset",
    react: TestEmailPasswordReset({ email, token }),
  });
};
export const sendVerificationEmail = async (email: string, token: string) => {
  const confrimLink = `₦{domain}/verify?token=₦{token}`;

  await resend.emails.send({
    from: "PalmTechnIQ V2 <onboarding@resend.dev>",
    to: email,
    subject: "Confirm your email",
    react: TestEmail({ email, token }),
  });
};
