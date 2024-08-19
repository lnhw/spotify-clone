'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { FaRegArrowAltCircleDown } from 'react-icons/fa';
import { CiBellOn, CiSearch } from 'react-icons/ci';
import { RxAvatar } from 'react-icons/rx';
import Tooltip from '../Tooltip';
import { signOut, useSession } from 'next-auth/react';
import ReactDOM from 'react-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Search from '../search';
import useResponsive from '@/hooks/useResponsive';
import { GoHome } from 'react-icons/go';
import { BiLibrary } from 'react-icons/bi';
import spotify from '@/assest/img/Spotify_Primary_Logo_RGB_Green.png';
import Image from 'next/image';

export default function NavBar() {

  const { data: session, status } = useSession();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [coord, setCoord] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({ x: 0, y: 0, width: 0, height: 0 });

  const { isMobile, isTablet, isDesktop } = useResponsive();

  const calculatePosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect() as DOMRect;
      setCoord({
        x: buttonRect.left,
        y: buttonRect.top + buttonRect.height + window?.scrollY,
        width: buttonRect.width,
        height: buttonRect.height,
      });
    }
  };
  const handleClick = () => {
    calculatePosition();
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleResie = () => {
      if (isOpen) {
        calculatePosition();
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    window.addEventListener('resize', handleResie);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
      window.removeEventListener('resize', handleResie);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error('Failed to logout', error);
    }
  }
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {isMobile && (
        <div data-testid="nav-mobile" className="z-10 bg-black h-[70px] fixed bottom-0 left-0 right-0 ">
          <div className="h-full w-full p-1 flex items-center justify-between">
            <button
              className="flex flex-col items-center"
              onClick={(e) => {
                e.preventDefault();
                router.push('/');
              }}
              data-testid="home-Btn"
            >
              <GoHome color="white" size={24} />
              <span className="text-[#B3B3B3] text-[11px]">Trang chủ</span>
            </button>
            <button
              data-testid="search-Btn"
              className="flex flex-col items-center"
              onClick={(e) => {
                e.preventDefault();
                router.push('/search');
              }}
            >
              <CiSearch color=" white" size={24} />
              <span className="text-[#B3B3B3] text-[11px]">Tìm kiếm</span>
            </button>
            <button className="flex flex-col items-center">
              <BiLibrary color="white" size={24} />
              <span className="text-[#B3B3B3] text-[11px]">Thư viện</span>
            </button>
            <button
              data-testid="down-Btn"
              className="flex flex-col items-center"
              onClick={(e) => {
                e.preventDefault();
                router.push('/download');
              }}
            >
              <Image src={spotify} alt="spotify icon" width={24} height={24} />
              <span className="text-[#B3B3B3] text-[11px]"> Taỉ úng dụng</span>
            </button>
          </div>
        </div>
      )}
      {isTablet && <></>}
      {isDesktop && (
        <div data-testid="nav-desktop"
          className={`z-10  lg:${pathname === '/' ? 'bg-transparent h-32' : 'bg-black h-20'}  sticky top-0`}
        >
          <div className="px-8">
            <div className="h-16 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  data-testid="btn-back"
                  type="button"
                  className="p-2 flex items-center justify-center rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    router.back();
                  }}
                >
                  <IoIosArrowBack color="white" size={20} />
                </button>
                <button
                  data-testid="btn-forward"
                  type="button"
                  className="p-2 flex items-center justify-center rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    router.forward();
                  }}
                >
                  <IoIosArrowForward color="white" size={20} />
                </button>
                {pathname === '/search' && <Search />}
              </div>
              <div className="flex items-center justify-around space-x-4">
                {status != 'authenticated' ? (
                  <>
                    <button
                      data-testid="btn-login"
                      className="py-2 px-8 bg-white rounded-full"
                      type="button"
                      role="button"
                    >
                      <Link href="/login">
                        <span className=" text-black text-base font-bold">
                          Đăng nhập
                        </span>
                      </Link>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      role="button"
                      className="bg-white text-black text-sm px-3 py-1 rounded-full"
                    >
                      khám phá cài đặt ứng dụng
                    </button>
                    <button
                      data-testid="down-btn"
                      type="button"
                      role="button"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push('/download');
                      }}
                      className="flex items-cente justify-between space-x-1 bg-black text-sm px-3 py-1 rounded-full"
                    >
                      <FaRegArrowAltCircleDown color="white" size={20} />
                      <span className="text-white">cài đăt ứng dụng</span>
                    </button>
                    <Tooltip content="Thông báo mới" position="bottom">
                      <button
                        type="button"
                        className="flex items-center justify-center bg-black text-white rounded-full"
                      >
                        <CiBellOn className="p-1" color="white" size={30} />
                      </button>
                    </Tooltip>
                    <>
                      <Tooltip
                        content={`${session?.user?.name}`}
                        position="bottom"
                      >
                        <button
                          data-testid="avatar"
                          ref={buttonRef}
                          type="button"
                          className="relative flex items-center justify-center rounded-full"
                          onClick={handleClick}
                        >
                          <RxAvatar color="white" size={30} />
                        </button>
                        {isOpen &&
                          ReactDOM.createPortal(
                            <ul
                              ref={menuRef}
                              className="z-10 bg-black absolute flex flex-col items-center justify-start max-w-64 border-none outline-none rounded-lg shadow [& > button flex items-center justify-between]"
                              style={{
                                top: coord.y + 10,
                                left: coord.x - 150,
                              }}
                              data-testid="avatar-menu"
                            >
                              <button
                                type="button"
                                role="button"
                                className="space-x-1 flex items-center justify-between w-full px-4 py-2 hover:bg-[#5a5a5a]"
                              >
                                <span className="text-white text-sm">
                                  Tài khoản
                                </span>
                                <FaExternalLinkAlt color="white" />
                              </button>
                              <Link
                                href={`/user/${session?.user?.id}`}
                                className="flex items-center justify-between w-full px-4 py-2 hover:bg-[#5a5a5a]"
                              >
                                <button type="button" role="button">
                                  <span className="text-white text-sm">
                                    Hồ sơ
                                  </span>
                                </button>
                              </Link>
                              <button
                                type="button"
                                role="button"
                                className=" space-x-1 flex items-center justify-between w-full px-4 py-2 hover:bg-[#5a5a5a]"
                              >
                                <span className="text-white text-nowrap text-sm">
                                  Nâng cấp lên premium
                                </span>
                                <FaExternalLinkAlt color="white" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  router.push('/preferences');
                                }}
                                type="button"
                                role="button"
                                className="flex items-center justify-between w-full px-4 py-2 hover:bg-[#5a5a5a]"
                              >
                                <span className="text-white text-sm">
                                  Cài đặt
                                </span>
                              </button>
                              <hr />
                              <button
                                data-testid="logout-btn"
                                onClick={handleLogout}
                                type="button"
                                role="button"
                                className="flex items-center justify-between w-full px-4 py-2 hover:bg-[#5a5a5a]"
                              >
                                <span className="text-white text-sm">
                                  Đăng xuất
                                </span>
                              </button>
                            </ul>,
                            document.body
                          )}
                      </Tooltip>
                    </>
                  </>
                )}
              </div>
            </div>
          </div>
          {pathname === '/' ? (
            <div className="px-8">
              <div className="h-14">
                <div className="flex items-center justify-start">
                  <div className="[& > button > text-sm font-medium] space-x-3">
                    <button
                      type="button"
                      className="px-3 py-1 bg-white rounded-full "
                    >
                      <span className="  text-black">Tất cả</span>
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 bg-transparent hover:bg-slate-500 cursor-pointer rounded-full"
                    >
                      <span className=" text-white">Nhac</span>
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 bg-transparent hover:bg-slate-500 cursor-pointer rounded-full"
                    >
                      <span className=" text-white">Podcast</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};
