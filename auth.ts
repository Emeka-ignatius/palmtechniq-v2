import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const runtime = "nodejs";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
