'use client';
import { FaInstagram } from 'react-icons/fa';
import { CiTwitter } from 'react-icons/ci';
import { CiFacebook } from 'react-icons/ci';
import useResponsive from '@/hooks/useResponsive';

export default function Footer() {
  const { isMobile, isDesktop } = useResponsive();
  return (
    <>
      {isMobile && (
        <footer className="h-svh w-full bg-black pb-[70px]">
          <nav id="" className="px-8 pt-2 pb-10">
            <section className="gap-8 flex flex-col flex-wrap items-start mt-8">
              <div className="flex-auto flex flex-col">
                <div className="">
                  <h4 className="text-white text-base font-bold">Công ty</h4>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Giới thiệu
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">Việc làm</p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    For the Record
                  </p>
                </div>
                <div className="">
                  <h4 className="text-white text-base font-bold">Cộng đồng</h4>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Dành cho các Nghệ sĩ
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Nhà phát triển
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Quảng cáo
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Nhà đầu tư
                  </p>
                  <p className="ttext-[#b3b3b3] text-sm font-normal">
                    Nhà cung cấp
                  </p>
                </div>
                <div className="">
                  <h4 className="text-white text-base font-bold">
                    Liên kết hữu ích
                  </h4>
                  <p className="text-[#b3b3b3] text-sm font-normal">Hỗ trợ</p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Ứng dụng Di động Miễn phí
                  </p>
                </div>
                <div className=":">
                  <h4 className="text-white text-base font-bold">
                    Các gói của Spotify
                  </h4>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Premium Individual
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Premium Student
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Spotify Free
                  </p>
                </div>
              </div>
              <div className="left-0 flex-grow-0 gap-3 space-x-3 flex items-start justify-between">
                <FaInstagram
                  className="p-2 bg-[#292929] hover:bg-[#858585] rounded-full cursor-pointer"
                  color="white"
                  size={40}
                />
                <CiTwitter
                  className="p-2 bg-[#292929] hover:bg-[#858585] rounded-full cursor-pointer"
                  color="white"
                  size={40}
                />
                <CiFacebook
                  className="p-2 bg-[#292929] hover:bg-[#858585] rounded-full cursor-pointer"
                  color="white"
                  size={40}
                />
              </div>
            </section>
            <hr className="my-10 h-[1px] w-full bg-white " />

            <section className="flex [flex-flow:column_wrap] items-start justify-between space-x-1">
              <div className="flex flex-col flex-wrap gap-4">
                <span className="text-[#B3B3B3] text-sm">Pháp lý</span>
                <span className="text-[#B3B3B3] text-sm">
                  Trung tâm an toàn và quyền riêng tư
                </span>
                <span className="text-[#B3B3B3] text-sm">
                  Chính sách quyền riêng tư
                </span>
                <span className="text-[#B3B3B3] text-sm">Cookie</span>
                <span className="text-[#B3B3B3] text-sm">
                  Giới thiệu Quảng cáo
                </span>
                <span className="text-[#B3B3B3] text-sm">Hỗ trợ tiếp cận</span>
              </div>
              <div className="">
                <span className="text-[#B3B3B3]">© 2024 Spotify AB</span>
              </div>
            </section>
          </nav>
        </footer>
      )}
      {isDesktop && (
        <footer className="bg-black">
          <nav id="" className="px-8 pt-2 pb-10">
            <section className="flex flex-row flex-nowrap items-start mt-8">
              <div className="flex-auto grid gap-2 grid-cols-4">
                <div className="">
                  <h4 className="text-white text-base font-bold">Công ty</h4>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Giới thiệu
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">Việc làm</p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    For the Record
                  </p>
                </div>
                <div className="">
                  <h4 className="text-white text-base font-bold">Cộng đồng</h4>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Dành cho các Nghệ sĩ
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Nhà phát triển
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Quảng cáo
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Nhà đầu tư
                  </p>
                  <p className="ttext-[#b3b3b3] text-sm font-normal">
                    Nhà cung cấp
                  </p>
                </div>
                <div className="">
                  <h4 className="text-white text-base font-bold">
                    Liên kết hữu ích
                  </h4>
                  <p className="text-[#b3b3b3] text-sm font-normal">Hỗ trợ</p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Ứng dụng Di động Miễn phí
                  </p>
                </div>
                <div className=":">
                  <h4 className="text-white text-base font-bold">
                    Các gói của Spotify
                  </h4>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Premium Individual
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Premium Student
                  </p>
                  <p className="text-[#b3b3b3] text-sm font-normal">
                    Spotify Free
                  </p>
                </div>
              </div>
              <div className="left-0 flex-grow-0 gap-3 space-x-3 flex items-start justify-between">
                <FaInstagram
                  className="p-2 bg-[#292929] hover:bg-[#858585] rounded-full cursor-pointer"
                  color="white"
                  size={40}
                />
                <CiTwitter
                  className="p-2 bg-[#292929] hover:bg-[#858585] rounded-full cursor-pointer"
                  color="white"
                  size={40}
                />
                <CiFacebook
                  className="p-2 bg-[#292929] hover:bg-[#858585] rounded-full cursor-pointer"
                  color="white"
                  size={40}
                />
              </div>
            </section>
            <hr className="my-10 h-[1px] w-full bg-white " />

            <section className="">
              <div className="">
                <span className="text-white text-sm">Pháp lý</span>
                <span className="text-white text-sm">
                  Trung tâm an toàn và quyền riêng tư
                </span>
                <span className="text-white text-sm">
                  Chính sách quyền riêng tư
                </span>
                <span className="text-white text-sm">Cookie</span>
                <span className="text-white text-sm">Giới thiệu Quảng cáo</span>
                <span className="text-white text-sm">Hỗ trợ tiếp cận</span>
              </div>
              <div className="">
                <span className="text-white">© 2024 Spotify AB</span>
              </div>
            </section>
          </nav>
        </footer>
      )}
    </>
  );
}
