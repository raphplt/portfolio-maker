import { UserInterface } from "@/type/user";
import NextAuth from "next-auth";
import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        refreshToken: string;
        accessToken?: string;
        user: UserInterface & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken?: string;a
        githubLogin?: string;
    }
}