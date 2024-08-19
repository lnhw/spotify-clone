'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdHomeFilled } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { LuLibrary } from 'react-icons/lu';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrFormNextLink } from 'react-icons/gr';
import { CiCircleList } from 'react-icons/ci';
import { CiSearch } from 'react-icons/ci';
import { CiFolderOn } from 'react-icons/ci';
import Tooltip from '../Tooltip';
import { IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io';

const SideBar: React.FC = () => {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const handleClick = () => {
    setShowPlaylist(!showPlaylist);
  };
  return (
    <>
      <aside className="hidden lg:flex lg:flex-col lg:gap-2 h-full">
        <div>
          <ul className="px-3 py-2 bg-[#121212] rounded">
            <li className="px-3 py-1">
              <Link
                href={`/`}
                className="flex items-center justify-start space-x-4"
              >
                <MdHomeFilled color="white" size={35} />
                <span className="text-white">Trang Chủ</span>
              </Link>
            </li>
            <li className="px-3 py-1">
              <Link
                href={`/search`}
                className="flex items-center justify-start space-x-4"
              >
                <IoIosSearch color="white" size={35} />
                <span className="text-white">Tìm Kiếm</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1  bg-[#121212] rounded">
          <div className="px-4 py-2 flex items-center justify-between">
            <Tooltip content="Thu gọn thư viện" position="top">
              <button
                type="button"
                className=" space-x-2 flex items-center justify-between"
              >
                <LuLibrary color="white" size={20} />
                <span className="text-white">Thư viện</span>
              </button>
            </Tooltip>
            <div className=" space-x-2 flex items-center justify-between">
              <Tooltip content="Tạo danh sách phát hoăc thư mục" position="top">
                <button type="button" className="rounded-full">
                  <AiOutlinePlus color="white" size={20} />
                </button>
              </Tooltip>

              <Tooltip content="Xem thêm" position="top">
                <button type="button" className="rounded-full">
                  <GrFormNextLink color="white" size={20} />
                </button>
              </Tooltip>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <button className=" mx-4 my-2 rounded-full">
              <span className="text-white">Danh sách phát</span>
            </button>
          </div>
          <div className="px-2 pb-2">
            <div className="pt-[2px] pl-2 pr-1 flex items-center justify-between">
              <div className="flex items-center pl-2 pr-1 pt-[2px]">
                <Tooltip content="Tìm kiếm trong thư viện" position="top">
                  <CiSearch color="white" size={20} />
                </Tooltip>
                {/* <input type="input" /> */}
              </div>
              <div className="">
                <button className="flex items-center justify-between">
                  <span className="text-white">Gan day</span>
                  <CiCircleList color="white" size={20} />
                </button>
              </div>
            </div>
            <div className="p-2 hover:bg-[#1d1c1c] hover:cursor-pointer rounded">
              <div className="flex items-center justify-between space-x-1">
                <div className="">
                  <CiFolderOn color="white" size={40} />
                </div>
                <div className="flex-grow flex items-center justify-between">
                  <div className="">
                    <p className="text-white text-sm font-normal">
                      Thư mục mới
                    </p>
                    <p>
                      <span className=""></span>
                      <span className="text-white text-xs font-normal">
                        danh sách phát
                      </span>
                    </p>
                  </div>
                  <div className="">
                    <button type="button" onClick={handleClick}>
                      {showPlaylist ? (
                        <IoMdArrowDropdown size={20} />
                      ) : (
                        <IoMdArrowDropright size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
export default SideBar;
