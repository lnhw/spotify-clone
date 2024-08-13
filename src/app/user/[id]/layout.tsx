import { getUserProfile } from '@/actions/userPrfileAction'
import Footer from '@/components/footer'
import NavBar from '@/components/navbar'
import Playerbar from '@/components/playerbar'
import SideBar from '@/components/siderbar'
import { PlayerProvider } from '@/contexts/playerbar/playerContext'
import { SearchProvider } from '@/contexts/searchContext'
import { authOptions } from '@/services/auths/authService'
import { Metadata } from 'next'
import { getServerSession } from "next-auth/next"

type Props = {
    params: { id: string }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const session = await getServerSession(authOptions)
    const id = params.id
    const data = await getUserProfile();
    return {
        title: session?.user?.name || 'User Profile',
        description: `${session?.user?.name}, user on Spotify`,
        openGraph: {
            title: session?.user?.name || 'User Profile',
            description: `${session?.user?.name}, user on Spotify`,
            url: `${process.env.NEXTAUTH_URL}/user/${id}`,
            siteName: 'Spotify',
            images: [
                {
                    url: data.images[0].url || '/default-profile-image.jpg',
                    width: 800,
                    height: 600,
                },
            ],
            locale: 'vi_VN',
            type: 'profile',
        },
    }
}

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (<>
        <main className="bg-black grid grid-rows[2fr_auto] gap-3">
            <SearchProvider>
                <div className="grid gap-2 grid-cols-[2fr_8fr]">
                    <SideBar />
                    <div className="h-screen overflow-y-scroll">
                        <NavBar />
                        <div className="flex flex-col justify-between space-x-3 gap-4">
                            <>
                                {children}
                            </>
                            <Footer />
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    {/* <PlayerProvider>
                        <Playerbar />
                    </PlayerProvider> */}
                </div>
            </SearchProvider>
        </main >
    </>);
}