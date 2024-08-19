import Footer from '@/components/footer';
import NavBar from '@/components/navbar/navbar';
import Playerbar from '@/components/playerbar';
import SideBar from '@/components/siderbar';
import { PlayerProvider } from '@/contexts/playerbar/playerContext';
import { SearchProvider } from '@/contexts/searchContext';
import React, { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-black grid grid-rows[2fr_auto] gap-3">
      <SearchProvider>
        <div className="grid gap-2 grid-cols-[2fr_8fr]">
          <SideBar />
          <div className="h-screen overflow-y-scroll">
            <NavBar />
            <div className="flex flex-col justify-between space-x-3 gap-4">
              <>{children}</>
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
    </main>
  );
}
