import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
export default function Footer() {
    return (
        <footer className="bg-black">
            <nav id="" className="px-8 pt-2 pb-10">
                <section className="flex items-start mt-8">
                    <div className="flex-auto grid gap-2 grid-cols-4">
                        <div className="">
                            <h4 className="text-white text-base">Công ty</h4>
                            <p className="text-white text-sm">Giới thiệu</p>
                            <p className="text-white text-sm">Việc làm</p>
                            <p className="text-white text-sm">For the Record</p>
                        </div>
                        <div className="">
                            <h4 className="text-white text-base">Cộng đồng</h4>
                            <p className="text-white text-sm">Dành cho các Nghệ sĩ</p>
                            <p className="text-white text-sm">Nhà phát triển</p>
                            <p className="text-white text-sm">Quảng cáo</p>
                            <p className="text-white text-sm">Nhà đầu tư</p>
                            <p className="text-white text-sm">Nhà cung cấp</p>
                        </div>
                        <div className="">
                            <h4 className="text-white text-base">Liên kết hữu ích</h4>
                            <p className="text-white text-sm">Hỗ trợ</p>
                            <p className="text-white text-sm">Ứng dụng Di động Miễn phí</p>
                        </div>
                        <div className="">
                            <h4 className="text-white text-base">Các gói của Spotify</h4>
                            <p className="text-white text-sm">Premium Individual</p>
                            <p className="text-white text-sm">Premium Student</p>
                            <p className="text-white text-sm">Spotify Free</p>
                        </div>
                    </div>
                    <div className="flex-grow-0 gap-3 space-x-3 flex items-start justify-between">
                        <FaInstagram className="p-2 bg-[#292929] hover:bg-[#858585] rounded-full cursor-pointer" color="white" size={40} />
                        <CiTwitter className="p-2 bg-[#292929] hover:bg-[#858585] rounded-full cursor-pointer" color="white" size={40} />
                        <CiFacebook className="p-2 bg-[#292929] hover:bg-[#858585] rounded-full cursor-pointer" color="white" size={40} />
                    </div>
                </section>
                <hr className="my-10 h-[1px] w-full bg-white " />
                <section className="flex items-start justify-between">
                    <div className=" space-x-2">
                        <span className="text-white">Pháp lý</span>
                        <span className="text-white">Trung tâm an toàn và quyền riêng tư</span>
                        <span className="text-white">Chính sách quyền riêng tư</span>
                        <span className="text-white">Cookie</span>
                        <span className="text-white">Giới thiệu Quảng cáo</span>
                        <span className="text-white">
                            Hỗ trợ tiếp cận
                        </span>
                    </div>
                    <div className="">
                        <span className="text-white">
                            © 2024 Spotify AB
                        </span>
                    </div>
                </section>
            </nav>
        </footer >
    );
}