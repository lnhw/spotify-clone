"use client"
import Image from "next/image";
import { IoIosAddCircleOutline, IoIosPause } from "react-icons/io";
import { LiaRandomSolid } from "react-icons/lia";
import { IoIosPlay } from "react-icons/io";
import Tooltip from "../Tooltip";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { CiRepeat } from "react-icons/ci";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { TbMicrophone2 } from "react-icons/tb";
import { CiBoxList } from "react-icons/ci";
import { MdDevicesOther } from "react-icons/md";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { FiMinimize } from "react-icons/fi";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import usePlayer from "@/hooks/usePlayer";

interface CustomCSSProperties extends React.CSSProperties {
    '--track-bg-color'?: string;
}
const Playerbar: React.FC = () => {
    const { state } = usePlayer();
    const track = state.currentTrack;
    // console.log(track)
    const handleMouseEnter = (event: React.MouseEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        (input.style as CustomCSSProperties)['--track-bg-color'] = '#4CAF50';
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        (input.style as CustomCSSProperties)['--track-bg-color'] = '#ddd';
    }
    return (
        <>
            <div id="container" className=" sticky bottom-0 left-0 right-0 w-full h-20rounded shadow">
                <div className="p-2 h-full">
                    <div className="h-full flex items-center justify-between">
                        <div className="h-full w-[30%] flex items-center justify-start space-x-3">
                            <div className="">
                                {track && (
                                    <Image
                                        src={`${track?.album.images[0].url}`}
                                        alt={`${track?.album.images[0].url}`}
                                        height={56}
                                        width={56}
                                        priority
                                    />
                                )}
                            </div>
                            <div className="h-full">
                                <div className="text-white">{track?.name}</div>
                                <span className="text-white text-xs">{track?.artists[0].name}</span>
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
                                            <div className="flex items-center justify-center">
                                                <span className="text-white text-xs"></span>
                                                <input className={`w-full h-1`}
                                                    type="range"
                                                    id="volume"
                                                    name="volume"
                                                    min="0"
                                                    max="100"
                                                    // value={() => { }}
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    style={{
                                                        '--track-bg-color': '#ddd',
                                                    } as CustomCSSProperties}
                                                // ref={volumeSliderRef}
                                                />
                                                <span className="text-white text-xs"></span>
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
                                    {/* <Tooltip content={state.isMuted ? "Bật tiếng" : "Tắt tiếng"} position="top">
                                    <button className="" onClick={toggleMute}>
                                        {state.isMuted ? <HiMiniSpeakerXMark size={26} /> : <HiMiniSpeakerWave size={26} />}
                                    </button>
                                </Tooltip> */}
                                    <span className=""></span>
                                    <input className="h-1 w-[100px] cursor-pointer"
                                        type="range"
                                        name="volume"
                                        min="0"
                                        max="100"
                                        // value={() => { }}
                                        onChange={() => { }}
                                        onMouseDown={() => { }}
                                        onMouseMove={() => { }}
                                        ref={() => { }}
                                    />
                                    <span className=""></span>
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
            </div>
            <style jsx>{`
                input[type="range"] {
          --track-bg-color: green;
          -webkit-appearance: none;
          width: 100%;
          height: 1px;
          background: var(--track-bg-color);
          outline: none;
          opacity: 0.7;
          transition: opacity .15s ease-in-out, background-color .15s ease-in-out;
        }
        input[type="range"]:hover {
          opacity: 1;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: var(--track-bg-color);
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #4CAF50;
          cursor: pointer;
          margin-top: -7.5px;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #4CAF50;
          cursor: pointer;
        }
        input[type="range"]::-ms-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #4CAF50;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-track {
          width: 100%;
          height: 1px;
          cursor: pointer;
        //   background: var(--track-bg-color);
        }
        input[type="range"]::-ms-track {
          width: 100%;
          height: 1px;
          cursor: pointer;
          background: transparent;
          border-color: transparent;
          color: transparent;
        }
        input[type="range"]:hover::-webkit-slider-runnable-track {
          background: var(--track-bg-color);
        }
        input[type="range"]:hover::-moz-range-track {
          background: var(--track-bg-color);
        }
        input[type="range"]:hover::-ms-track {
          background: var(--track-bg-color);
        }
            `}</style>
        </>
    );
}
export default Playerbar;