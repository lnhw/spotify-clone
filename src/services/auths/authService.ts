import type {
  DefaultUser,
  NextAuthOptions,
  Session,
  User,
} from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { Scopes } from "@/libs/scope";
import { JWT } from "next-auth/jwt";
interface ExtendedUser extends DefaultUser {
  id: string;
}
interface ExtendedSession extends Session {
  user: ExtendedUser;
  accessToken?: string;
  error?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: number;
}
interface ExtendedToken extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  user: ExtendedUser,
  error?: string;
}
export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_SECRET!,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: Scopes
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    // async session({ session, user, token }): Promise<ExtendedSession> {
    //   if (session && user) {
    //     session.user = token.user as User;
    //     (session as ExtendedSession).accessToken = (token as ExtendedToken).accessToken;
    //     (session as ExtendedSession).error = (token as ExtendedToken).error;
    //     (session as ExtendedSession).refreshToken = (token as ExtendedToken).refreshToken;
    //     (session as ExtendedSession).accessTokenExpiresAt = (token as ExtendedToken).accessTokenExpiresAt
    //   }
    //   return {
    //     ...session,
    //     accessToken: (token as ExtendedToken).accessToken,
    //     error: (token as ExtendedToken).error,
    //     refreshToken: (token as ExtendedToken).refreshToken,
    //     accessTokenExpiresAt: (token as ExtendedToken).accessTokenExpiresAt,
    //     user: {
    //       id: token.sub!,
    //       name: token.name!,
    //       email: token.email!,
    //       image: token.picture!
    //     }
    //   } as ExtendedSession;
    // },
    async session({ session, user, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      session.accessToken = token.accessToken as string;
      session.error = token.error as string | undefined;
      session.refreshToken = token.refreshToken as string;
      session.accessTokenExpiresAt = token.accessTokenExpiresAt as number;
      return session
    },
    async jwt({ token, user, account, profile }) {
      if (account && user) {
        token = {
          ...token,
          accessToken: account.access_token! ?? "",
          refreshToken: account.refresh_token! ?? "",
          accessTokenExpiresAt: account.expires_at ? account.expires_at * 1000 : 0, // converted to ms
          user: user,
        } as ExtendedToken;
        console.log('FIRST TIME LOGIN, TOKEN: ', token);
      }
      if (Date.now() >= (token as ExtendedToken).accessTokenExpiresAt) {
        console.log("Access Token Expried, Refreshing...", token);
        try {
          const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET}`).toString("base64")}`,
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: (token as ExtendedToken).refreshToken,
            })
          })

          const refreshToken = await response.json();

          if (!response.ok) refreshToken

          token = {
            ...token,
            accessToken: refreshToken.access_token,
            accessTokenExpiresAt: Date.now() + refreshToken.expires_in * 1000,
            refreshToken: refreshToken.refresh_token ?? (token as ExtendedToken).refreshToken,
          } as ExtendedToken;
          console.log("Refresh token : ", token);
        } catch (error) {
          console.error("Error refreshing access token", error)
          token = {
            ...token,
            error: "RefreshAccessTokenError",
          } as ExtendedToken;
        }
      }
      return token;
    },
  },
  //   async jwt({ token, user, account, profile }) {
  //     if (account && user) {
  //       token = {
  //         ...token,
  //         accessToken: account.access_token!,
  //         refreshToken: account.refresh_token!,
  //         accessTokenExpiresAt: account.expires_at ? account.expires_at * 1000 : 0, // converted to ms
  //         // user: user as ExtendedUser,
  //         user: {
  //           id: user.id,
  //           name: user.name,
  //           email: user.email,
  //         }
  //       } as ExtendedToken
  //       console.log('FIRST TIME LOGIN, TOKEN: ', token);
  //     }
  //     if (Date.now() >= (token as ExtendedToken).accessTokenExpiresAt) {
  //       console.log("Access Token Expried, Refreshing...", token);
  //       try {
  //         const response = await fetch("https://accounts.spotify.com/api/token", {
  //           method: "POST",
  //           headers: {
  //             "conten-Type": "application/x-www-form-urlencoded",
  //             Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET}`).toString("base64")}`,
  //           },
  //           body: new URLSearchParams({
  //             grant_type: "refresh_token",
  //             refresh_token: (token as ExtendedToken).refreshToken,
  //           })
  //         })

  //         const refreshToken = await response.json();

  //         if (!response.ok) refreshToken

  //         token = {
  //           ...token,
  //           accessToken: refreshToken.access_token,
  //           accessTokenExpiresAt: Date.now() + refreshToken.expires_in * 1000,
  //           refreshToken: refreshToken.refresh_token ?? token.refreshToken,
  //         } as ExtendedToken
  //         console.log("Refresh token : ", token);
  //       } catch (error) {
  //         console.error("Error refreshing access token", error)
  //         token = {
  //           ...token,
  //           error: "RefreshAccessTokenError",
  //         } as ExtendedToken
  //       }
  //     }
  //     return token as ExtendedToken;
  //   },
  // },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
  },
  // debug: process.env.NODE_ENV === "development" ? true : false,
  debug: true,
};
