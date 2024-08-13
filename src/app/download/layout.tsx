"use client";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import Playerbar from "@/components/playerbar";
import SideBar from "@/components/siderbar";
import { PlayerProvider } from "@/contexts/playerbar/playerContext";
import { SearchProvider } from "@/contexts/searchContext";
import useResponsive from "@/hooks/useResponsive";
import React from "react";
export default function DownLoadLayout({ children }: { children: React.ReactNode }) {
    const { isMobile, isDesktop, isTablet } = useResponsive();
    return (
        <>
            {isMobile && (
                <div className="h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-black lg:grid lg:grid-rows[2fr_auto] lg:gap-3">
                    <SearchProvider>
                        <div className="grid lg:gap-2 lg:grid-cols-[2fr_8fr]">
                            <SideBar />
                            <div className="h-screen overflow-y-scroll">
                                <NavBar />
                                <div className="flex flex-col justify-between space-x-3 gap-4">
                                    <>
                                        {children}
                                    </>
                                    {/* <Footer /> */}
                                </div>
                            </div>
                        </div>
                        <div className="bottom-0 w-full h-[2%] bg-black">
                            <PlayerProvider>
                                <Playerbar />
                            </PlayerProvider>
                        </div>
                    </SearchProvider>
                </div>
            )}
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