import "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string; // id stored in `sub`
    id?: string;
    role?: string;
    email?: string;
    exp?: number;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    image?: string | null; // ✅ allow null
    avatar?: string | null;
  }

  interface Session {
    user: User;
    role?: string;
    token?: {
      role: string;
    };
  }
}
