
import { getUserProfile } from "@/actions/userPrfileAction";
import { authOptions } from "@/services/auths/authService"
import { fetchSpotify } from "@/utils/spotify/fecthSpotify";
import { getServerSession } from "next-auth/next"
import Image from "next/image"
export default async function Page({
    params
}: {
    params: { id: string, name?: string, email?: string, image?: string }
}) {
    const data = await getUserProfile();
    return (
        <div className="min-h-screen bg-gray-900">
            <div className="p-2 flex items-center justify-start">
                <div className="mr-3 relative w-44 h-44 rounded-full shadow overflow-hidden">
                    <Image
                        className="w-full h-auto object-cover"
                        src={data.images[1].url}
                        alt={data.display_name}
                        quality={100}
                        fill
                    />
                </div>
                <div className="">
                    <div className="flex flex-col items-start justify-end space-x-12">
                        <div className="">
                            <p className="text-white text-sm">Hồ sơ</p>
                        </div>
                        <p className="text-white text-[6rem] font-semibold !ml-0">{data.display_name}</p>
                    </div>
                    <div>
                        <p className="text-white">Email: {data.email}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
