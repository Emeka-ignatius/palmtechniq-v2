"use server";

import { db } from "@/lib/db";
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/schemas";
import {
  onBoardingMail,
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "@/lib/mail";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs";

import { UserRole } from "@prisma/client";
import getUserByEmail from "@/data/user";
import {
  generatePasswordResetToken,
  generateverificationToken,
} from "@/lib/token";
import z from "zod";
import { AuthError } from "next-auth";

// Signup Action
export async function signup(data: any) {
  try {
    // Validate input
    const validated = signupSchema.parse(data);

    // Check if user exists
    const existingUser = await getUserByEmail(validated.email);
    if (existingUser) {
      return { error: "Email already in use" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    // Create user
    const user = await db.user.create({
      data: {
        email: validated.email,
        name: validated.name,
        phone: validated.phone,
        password: hashedPassword,
        role: "USER" as UserRole,
        verificationToken: (
          await generateverificationToken(validated.email)
        ).token,
      },
    });

    // Create student profile (default for new users)
    await db.student.create({
      data: {
        userId: user.id,
        level: "BEGINNER",
        interests: [],
        goals: [],
      },
    });

    // Send verification email
    await sendVerificationEmail(user.email, user.verificationToken);

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "Failed to create account" };
  }
}

// Login Action
export async function login(
  values: z.infer<typeof loginSchema>,
  callbackUrl?: string | null
) {
  try {
    // Validate input
    const validated = loginSchema.safeParse(values);

    if (!validated.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password } = validated.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || existingUser.email || !existingUser.password) {
      return { error: "Email does not exist!" };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateverificationToken(
        existingUser.email
      );

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
      return { success: "Confirmation email sent!" };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      success: "Successfully Signed in!",
      redirectUrl: callbackUrl,
    };
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Incorrect email or password" };
        default:
          return { error: "Failed to login!" };
      }
    }

    if (process.env.NODE_ENV !== "production") {
      console.error("Error in Login:", error);
    }
    return { error: "An unexpected error occurred!" };
  }
}

// Forgot Password Action
export async function forgotPassword(data: any) {
  try {
    // Validate input
    const validated = forgotPasswordSchema.parse(data);

    const user = await getUserByEmail(validated.email);
    if (!user) {
      return { error: "Email not found" };
    }

    // Generate reset token
    const resetToken = generatePasswordResetToken(user.email);
    await db.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
      },
    });

    await sendPasswordResetEmail(user.email, resetToken);

    return { success: true };
  } catch (error) {
    console.error("Forgot password error:", error);
    return { error: "Failed to send reset link" };
  }
}

// Reset Password Action
export async function resetPassword(token: string, newPassword: string) {
  try {
    const resetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken || resetToken.expires < new Date()) {
      throw new Error("Invalid or expired reset token");
    }

    await db.user.update({
      where: { email: resetToken.email },
      data: { password: newPassword },
    });

    await db.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    return { success: true };
  } catch (error) {
    console.error("Reset password error:", error);
    return { error: "Failed to reset password" };
  }
}

// Email Verification Action
export async function verifyEmail(token: string) {
  try {
    const user = await db.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      return { error: "Invalid or expired verification token" };
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        emailVerified: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Verification error:", error);
    return { error: "Failed to verify email" };
  }
}
