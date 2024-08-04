"use client";
import Footer from "@/components/footer";
import MainContent from "@/components/main/maincontent";
import NavBar from "@/components/navbar";
import Playerbar from "@/components/playerbar";
import RecentlyPlayed from "@/components/recently-played";
import SideBar from "@/components/siderbar";
import { PlayerProvider } from "@/contexts/playerbar/playerContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter()
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  return (
    <main id="container" className="bg-black grid grid-rows[2fr_auto] gap-3">
      <div className="grid gap-2 grid-cols-[2fr_8fr]">
        <>
          <SideBar />
        </>
        <>
          <MainContent />
        </>
      </div>
      <div className="flex items-center">
        <PlayerProvider>
          <Playerbar />
        </PlayerProvider>
      </div>
    </main>
  );
}
