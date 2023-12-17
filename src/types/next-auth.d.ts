import NextAuth, { DefaultSession } from "next-auth/next";
import { JWT } from "next-auth/jwt";
import { DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  _id: string;
  role: string;
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
