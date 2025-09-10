"use server";

import { signOut, signIn } from "@/auth";

export const logout = async () => {
  await signOut();
};
export const login = async () => {
  await signIn();
};
