import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import getUserByEmail, { getUserById } from "./data/user";
import { db } from "./lib/db";
import { onBoardingMail } from "./lib/mail";
import { verifyPassword } from "./lib/password";
import { loginSchema } from "./schemas";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await verifyPassword(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const existingUser = await getUserByEmail(user.email!);
        console.log({ user });
        if (!existingUser) {
          await onBoardingMail(user.email!, user.name || "");
        }

        return true;
      }

      // Handle credentials sign in
      const existingUser = await getUserById(user.id!);

      if (!existingUser?.emailVerified) return false;

      return true;
    },

    // This jwt callback is essential for the middleware
    async jwt({ token, user, account, trigger }) {
      if (account && user) {
        token.sub = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      if (trigger === "update" && token.sub) {
        const userActive = await db.user.findUnique({
          where: { id: token.sub },
          select: { role: true },
        });
        if (userActive?.role) token.role = userActive.role;
      }
      // Ensure role persists across token refreshes
      if (!token.role && token.sub) {
        try {
          const dbUser = await getUserById(token.sub);
          if (dbUser?.role) {
            token.role = dbUser.role;
          }
        } catch (error) {
          console.error("Error fetching user role in JWT callback:", error);
        }
      }

      // Token expiration handling
      const now = Math.floor(Date.now() / 1000);
      const maxAge = 86400; // 24 hours

      if (!token.exp || token.exp < now) {
        token.exp = now + maxAge;
      }

      // console.log("JWT callback result:", {
      //   tokenSub: token.sub,
      //   tokenRole: token.role,
      //   tokenEmail: token.email,
      // });

      return token;
    },

    async session({ session, token }) {
      // console.log("Session callback triggered", {
      //   tokenId: token.sub,
      //   tokenRole: token.role,
      //   sessionUser: session.user,
      // });

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as string;
      }

      // Add role to top-level session for middleware
      if (token.role) {
        session.role = token.role as string;
      }

      // console.log("Session callback result:", {
      //   userId: session.user?.id,
      //   userRole: session.user?.role,
      //   sessionRole: session.role,
      // });

      return session;
    },
  },

  adapter: PrismaAdapter(db),
  session: {
    maxAge: 86400, // 24 hours
    strategy: "jwt",
    updateAge: 300, // Update JWT every 5 minutes
  },

  cookies: {
    sessionToken: {
      name: "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // domain:
        //   process.env.NODE_ENV === "production"
        //     ? ".www.palmtechniq.com"
        //     : undefined,
      },
    },
  },
} satisfies NextAuthConfig;
