"use client"
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import Playerbar from "@/components/playerbar";
import SideBar from "@/components/siderbar";
import { PlayerProvider } from "@/contexts/playerbar/playerContext";
import { SearchProvider } from "@/contexts/searchContext";
import useResponsive from "@/hooks/useResponsive";
import React from "react";

export default function LayoutSearch({ children }: { children: React.ReactNode }) {
    const { isMobile, isTablet, isDesktop } = useResponsive();
    return (
        <>
            {isMobile && (<>
                <main className="h-screen w-full bg-black overflow-hidden grid grid-rows[2fr_auto] gap-3">
                    <SearchProvider>
                        <div className="">
                            <div className="">
                                <NavBar />
                                <div className="">
                                    <>
                                        {children}
                                    </>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <PlayerProvider>
                                <Playerbar />
                            </PlayerProvider>
                        </div>
                    </SearchProvider>
                </main>
            </>)}
            {isDesktop && (<>
                <main className="bg-black grid grid-rows[2fr_auto] gap-3">
                    <SearchProvider>
                        <div className="grid gap-2 grid-cols-[2fr_8fr]">
                            <SideBar />
                            <div className="h-screen overflow-y-scroll">
                                <NavBar />
                                <div className="flex flex-col justify-between space-x-3 gap-4">
                                    <>
                                        {children}
                                    </>
                                    <Footer />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <PlayerProvider>
                                <Playerbar />
                            </PlayerProvider>
                        </div>
                    </SearchProvider>
                </main >
            </>)}
        </>
    );
}