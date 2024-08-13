import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/SessionProvider ";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { NextUIProviders } from "@/components/NextUIProvider";
import { authOptions } from "@/services/auths/authService";
import { redirect } from 'next/navigation'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clone Spotify",
  description: "Clone Spotify by lnw",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
    redirect('/login')
  }
  return (
    <html lang="en">
      {/* <Head>
        <script async src="https://sdk.scdn.co/spotify-player.js"></script>
      </Head> */}
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <NextUIProviders>
            {children}
          </NextUIProviders>
        </NextAuthProvider>
      </body>
    </html>
  );
}
