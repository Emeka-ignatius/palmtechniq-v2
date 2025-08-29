import { Resend } from "resend";
import { signIn } from "@/auth";

const resend = new Resend("re_732KJ3em_21Vu3jkWV1ZtG22rxLcyYdAH");


export const onBoardingMail = async (email: string) => {
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL_ADDRESS!,
      to: email,
      subject: "Welcome to PalmTechnIQ",
      react: signIn(email),
    });
    return { success: "Signed-Up successfully!" };
  } catch (error) {
    console.error("Error creating account!", error);
    return { error: "Account Creation failed! Try again" };
  }
};
