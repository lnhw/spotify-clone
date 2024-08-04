import Playerbar from "@/components/playerbar";
import SideBar from "@/components/siderbar";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-black">
            <SideBar />
            <main>{children}</main>
            <Playerbar />
        </div>
    );
}