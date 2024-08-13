"use client"
import Image from "next/image";
import { IoIosAddCircleOutline, IoIosPause } from "react-icons/io";
import { LiaRandomSolid } from "react-icons/lia";
import { IoIosPlay } from "react-icons/io";
import Tooltip from "../Tooltip";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { CiHeart, CiPlay1, CiRepeat } from "react-icons/ci";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { TbMicrophone2 } from "react-icons/tb";
import { CiBoxList } from "react-icons/ci";
import { MdDevicesOther } from "react-icons/md";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { FiMinimize } from "react-icons/fi";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import usePlayer from "@/hooks/usePlayer";
import useResponsive from "@/hooks/useResponsive";

interface CustomCSSProperties extends React.CSSProperties {
    '--track-bg-color'?: string;
}
const Playerbar: React.FC = () => {
    const { state } = usePlayer();
    const { currentTrack, currentTime, duration } = state;
    const { isMobile, isTablet, isDesktop } = useResponsive();

    const handleMouseEnter = (event: React.MouseEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        (input.style as CustomCSSProperties)['--track-bg-color'] = '#4CAF50';
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        (input.style as CustomCSSProperties)['--track-bg-color'] = '#ddd';
    }
    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            {isMobile && (
                <div id="" className="fixed h-14 w-full bottom-[70px] right-0 left-0">
                    <div className="bg-[#2a3a1d] mx-2 p-2 rounded shadow">
                        <div className="flex flex-col ">
                            <div className="pb-2 flex items-center justify-between space-x-4">
                                <div className="">
                                    {currentTrack && (
                                        <Image className="rounded"
                                            src={`${currentTrack?.album.images[0].url}`}
                                            alt={`${currentTrack?.album.name}`}
                                            height={40}
                                            width={40}
                                        />
                                    )}
                                </div>
                                <div className="flex-grow flex flex-col items-start justify-start">
                                    <p className="text-white text-[13px]">{currentTrack?.name}</p>
                                    <p className="text-white text-[12px]">{currentTrack?.artists[0].name}</p>
                                </div>
                                <div className="flex items-center justify-evenly space-x-4">
                                    <CiHeart color="white" size={26} />
                                    <CiPlay1 color="white" size={26} />
                                </div>
                            </div>
                            <progress className="h-[1px] rounded shadow" max={100} value={0} />
                        </div>
                    </div>
                </div>
            )}
            {isDesktop && (
                <div id="container" className="sticky bottom-0 left-0 right-0 w-full h-20 rounded shadow">
                    <div className="p-2 h-full">
                        <div className="h-full flex items-center justify-between">
                            <div className="h-full w-[30%] flex items-center justify-start space-x-3">
                                <div className="">
                                    {currentTrack && (
                                        <Image
                                            src={`${currentTrack?.album.images[0].url}`}
                                            alt={`${currentTrack?.album.images[0].url}`}
                                            height={56}
                                            width={56}
                                            priority
                                        />
                                    )}
                                </div>
                                <div className="h-full">
                                    <div className="text-white">{currentTrack?.name}</div>
                                    <span className="text-white text-xs">{currentTrack?.artists[0].name}</span>
                                </div>
                                <div className=" cursor-pointer">
                                    <Tooltip position="top" content="Thêm vào bài hát đã thích">
                                        <IoIosAddCircleOutline color="white" />
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="h-full w-[40%] flex justify-center">
                                <div className="flex-grow">
                                    <>
                                        <div className="mb-2 flex items-center justify-center space-x-6">
                                            <div className="flex items-center justify-end space-x-3">
                                                <button>
                                                    <Tooltip content="Phát ngẫu nhiên" position="top">
                                                        <LiaRandomSolid color="white" size={26} />
                                                    </Tooltip>
                                                </button>
                                                <button type="button" onClick={() => { }}>
                                                    <Tooltip content="Vể trước " position="top">
                                                        <IoPlaySkipBack color="white" size={26} />
                                                    </Tooltip>
                                                </button>
                                            </div>
                                            <div className="">
                                                <button className="" type="button" onClick={() => { }}>
                                                    <Tooltip content={state.isPlaying ? "Tạm dừng" : "Phát"} position="top">
                                                        {state.isPlaying ?
                                                            <IoIosPause
                                                                className="flex items-center justify-center p-1 bg-white rounded-full"
                                                                size={26}
                                                                color="black"
                                                            />
                                                            :
                                                            <IoIosPlay
                                                                className="flex items-center justify-center p-1 bg-white rounded-full"
                                                                size={26}
                                                                color="black"
                                                            />
                                                        }
                                                    </Tooltip>
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-start space-x-3">
                                                <button className="" type="button" onClick={() => { }}>
                                                    <Tooltip content="Tiếp theo" position="top">
                                                        <IoPlaySkipForward color="white" size={26} />
                                                    </Tooltip>
                                                </button>
                                                <button className="">
                                                    <Tooltip content="Phát lại" position="top">
                                                        <CiRepeat color="white" size={26} />
                                                    </Tooltip>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="">
                                            {/* day la thach progress */}
                                            <div>
                                                <div className="flex items-center justify-center space-x-2">
                                                    <span className="text-white text-xs">{formatTime(currentTime)}</span>
                                                    <input className={`w-full h-1`}
                                                        type="range"
                                                        id="volume"
                                                        name="volume"
                                                        min="0"
                                                        max="100"
                                                        onMouseEnter={handleMouseEnter}
                                                        onMouseLeave={handleMouseLeave}
                                                        style={{
                                                            '--track-bg-color': '#ddd',
                                                        } as CustomCSSProperties}
                                                    />
                                                    <span className="text-white text-xs">{formatTime(duration)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                </div>
                            </div>
                            <div className="h-full w-[30%] flex justify-end space-x-4">
                                <div>
                                    <Tooltip content="Chế độ xem đang phát" position="top">
                                        <button type="button">
                                            <MdOutlinePlaylistPlay color="white" size={26} />
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip content="Lời bài hát" position="top">
                                        <button type="button">
                                            <TbMicrophone2 color="white" size={26} />
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip content="Danh sách chờ" position="top">
                                        <button>
                                            <CiBoxList color="white" size={26} />
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip content="kết nối với thiết bị khác" position="top">
                                        <button>
                                            <MdDevicesOther color="white" size={26} />
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <input className="h-1 w-[100px] cursor-pointer"
                                            type="range"
                                            name="volume"
                                            min="0"
                                            max="100"
                                            onChange={() => { }}
                                            onMouseDown={() => { }}
                                            onMouseMove={() => { }}
                                            ref={() => { }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Tooltip content="Thu nhỏ " position="top">
                                        <button className="">
                                            <FiMinimize color="white" size={26} />
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip content="Phóng to" position="top">
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-maximize-2">
                                                <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
                                                <line x1="21" x2="14" y1="3" y2="10" /><line x1="3" x2="10" y1="21" y2="14" />
                                            </svg>
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            )}
        </>
    );
}
export default Playerbar;