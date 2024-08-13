
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import nextAuth, { DefaultSession, DefaultUser } from "next-auth";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // image: string;
    } & DefaultSession["user"]
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresAt?: number;
    error?: string;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresAt?: number;
    error?: string;
  }
}

// import { DefaultSession, DefaultUser } from "next-auth";
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string
//     } & DefaultSession["user"]
//   }
//   interface User extends DefaultUser {
//     id: string
//   }
// }