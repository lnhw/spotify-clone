"use client";
import useResponsive from "@/hooks/useResponsive";
import { IoIosArrowRoundBack } from "react-icons/io";
import SpotiftGreen from "@/assest/img/Spotify_Primary_Logo_RGB_Green.png";
import SpotifyWhite from "@/assest/img/Spotify_Primary_Logo_RGB_White.png";
import Mac from "@/assest/img/mac.3fbeb8c6.png"
import Image from "next/image";

export default function DownLoadPage() {
    const { isMobile, isDesktop } = useResponsive();
    return (
        <>
            {isMobile && (
                <div className="flex flex-col space-x-4">
                    <div className="bg-transparent h-14 w-full sticky top-0 left-0 right-0 flex items-center justify-start p-3">
                        <button className="" type="button" role="button">
                            <IoIosArrowRoundBack color="white" size={30} />
                        </button>
                    </div>
                    <div className="p-3 grid gap-3 grid-cols-1 grid-rows-2">
                        <div className="bg-[#ffffff4d] rounded-lg shadow">
                            <div className="p-2 flex flex-col items-center justify-center gap-3">
                                <div className="">
                                    <Image src={SpotiftGreen}
                                        alt="spotify green"
                                        width={47}
                                        height={47}
                                    />
                                </div>
                                <h4 className="text-white text-lg font-bold">Ứng dụng Di động Spotify</h4>
                                <p className="text-white text-base font-normal text-center">
                                    Tạo thư viện · Nghe podcast · Tiết kiệm dữ liệu · Hãy thử dùng Spotify Premium
                                </p>
                                <button className="bg-white rounded-full" type="button" role-="button">
                                    <span className="flex items-center justify-center px-6 py-2 text-black text-base font-bold">Tải ứng dụng</span>
                                </button>
                            </div>
                        </div>
                        <div className="bg-[#ffffff4d] rounded-lg shadow">
                            <div className="p-2 flex flex-col items-center justify-center gap-3">
                                <div>
                                    <Image
                                        src={SpotifyWhite}
                                        alt="spotify white"
                                        width={47}
                                        height={47}
                                    />
                                </div>
                                <h4 className="text-white text-lg font-bold">Spotify trên Màn hình Trang chủ</h4>
                                <p className="text-white text-base font-normal text-center">Mở Spotify bằng một chạm · Nghe trực tiếp trên trình duyệt · Không cần tải xuống · Tiết kiệm bộ nhớ điện thoại</p>
                                <button className="bg-white rounded-full" type="button" role="button">
                                    <span className="flex items-center justify-center px-6 py-2 text-black text-base font-bold">Thêm ngay</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isDesktop && (
                <div className="grid place-self-center place-items-center gap-3">
                    <div className="">
                        <Image src={Mac} alt="" height={640} width={396} />
                    </div>
                    <div className="max-w-[640px] h-auto flex flex-col items-center justify-center gap-5">
                        <div>
                            <h1 className="text-white text-3xl text-center font-bold">Nghe nhạc bạn thích không gián đoạn. Tải xuống ứng dụng Spotify dành cho máy tính.</h1>
                        </div>
                        <div>
                            <button className="bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-black px-8 py-2 text-base font-medium">Tải ứng dụng miễn phí của chúng tôi</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}