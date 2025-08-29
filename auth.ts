import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import getUserByEmail, { getUserById } from "./data/user";
import { onBoardingMail } from "./lib/mail";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
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

        if (!existingUser) {
          await onBoardingMail(user.email!);
        }

        return true;
      }

      // Handle credentials sign in
      const existingUser = await getUserById(user.id!);

      if (!existingUser?.emailVerified) return false;

      return true;
    },

    async session({ session, token }) {
      // console.log("Session callback triggered", {
      //      tokenId: token.sub,
      //      userIdFromToken: token.id,
      //      sessionUser: session.user,
      // });
      try {
        if (token.sub && session.user) {
          session.user.id = token.sub;

          const user = await getUserById(token.sub);
          session.user.role = user?.role || "USER";
        }
      } catch (error) {
        console.error("Error in session callback:", error);
      }
      return session;
    },

    async jwt({ token, user, account }) {
      if (account && user) {
        (token.sub = user.id), (token.email = user.email);
        token.role = user.role;
      }

      const now = Math.floor(Date.now() / 1000);
      const maxAge = 86400; // 24 hours

      if (!token.exp || token.exp < now) {
        token.exp = now + maxAge;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    maxAge: 86400, //24 hours
    strategy: "jwt",
    updateAge: 300, // Update JWT every 5 minute
  },
  cookies: {
    sessionToken: {
      name: "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain:
          process.env.NODE_ENV === "production"
            ? ".www.palmtechniq.com"
            : undefined,
      },
    },
  },
  ...authConfig,
});
