'use client';
import Footer from '@/components/footer';
import MainContent from '@/components/main/maincontent';
import NavBar from '@/components/navbar/navbar';
import Playerbar from '@/components/playerbar';
import RecentlyPlayed from '@/components/recently-played';
import SideBar from '@/components/siderbar';
import { PlayerProvider } from '@/contexts/playerbar/playerContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CiSettings } from 'react-icons/ci';
import Logo from '@/assest/img/Spotify_Primary_Logo_RGB_Green.png';
import useResponsive from '@/hooks/useResponsive';
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarWidth, setSidebarWidth] = useState<number | string>('2fr');
  const [isResizing, setIsResizing] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      // let newSidebarWidth = e.clientX - containerRect.left;
      const containerWidth = containerRef.current.clientWidth;
      let newSidebarWidth = e.clientX;
      // Giới hạn kích thước tối thiểu và tối đa
      const maxSidebarWidth = containerWidth * 0.5; // 50% of container width (5fr out of 10fr)
      if (newSidebarWidth > maxSidebarWidth) {
        newSidebarWidth = maxSidebarWidth;
      }
      setSidebarWidth(newSidebarWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  return (
    <>
      {isMobile && (
        <>
          <main
            id="container"
            className="h-screen w-full overflow-hidden bg-black grid grid-rows[2fr_auto] gap-3"
          >
            <div>
              <>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="relative h-[56px] w-[56px] rounded-full overflow-hidden">
                      <Image
                        className="object-cover"
                        src={Logo}
                        alt="Spotify logo"
                        fill
                        priority
                      />
                    </div>
                  </div>
                  <CiSettings color="white" size={30} />
                </div>
              </>
              <>
                <MainContent />
              </>
            </div>

            {/* player bar */}
            <div className="flex items-center">
              <PlayerProvider>
                <Playerbar />
              </PlayerProvider>
            </div>
          </main>
        </>
      )}
      {isTablet && <>Tablet !</>}
      {isDesktop && (
        <>
          <main
            id="container"
            className="bg-black grid grid-rows[2fr_auto] gap-3"
            ref={containerRef}
          >
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `${typeof sidebarWidth === 'number' ? `${sidebarWidth}px` : sidebarWidth} 8fr`,
              }}
            >
              <div className="flex">
                <div className="flex-1">
                  <SideBar />
                </div>
                <div
                  ref={sidebarRef}
                  className={`w-[1px] cursor-ew-resize hover:bg-white ${isResizing ? 'bg-white' : ''}`}
                  onMouseDown={handleMouseDown}
                  onMouseDownCapture={handleMouseDown}
                ></div>
              </div>
              <>
                <MainContent />
              </>
            </div>
            {/* player bar */}
            <div className="flex items-center">
              <PlayerProvider>
                <Playerbar />
              </PlayerProvider>
            </div>
          </main>
        </>
      )}
    </>
  );
}
