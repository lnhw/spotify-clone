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
                    url: session?.user?.image || '/default-profile-image.jpg',
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
    return <>{children}</>
}