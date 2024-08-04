// "use client";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Page({
//     params
// }: {
//     params: { id?: string, name?: string, email?: string, image?: string }
// }) {
//     const { data: session, status } = useSession();
//     const router = useRouter();
//     if (status === "loading") {
//         return <div>Loading...</div>;
//     }

//     if (status === "unauthenticated") {
//         router.push("/login");
//     }
//     return (
//         <div>
//             {/* <>{params.id}</> */}
//             <div className="">
//                 <div>
//                     <h1>Thông tin User</h1>
//                     <p>ID: {params.id}</p>
//                     <p>Tên: {params.name}</p>
//                     <p>Email: {params.email}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }
import { authOptions } from "@/services/auths/authService"
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'

export default async function Page({
    params
}: {
    params: { id: string }
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    return (
        <div>
            <div className="">
                <div>
                    <h1>Thông tin User</h1>
                    <p>ID: {params.id}</p>
                    <p>Tên: {session.user?.name}</p>
                    <p>Email: {session.user?.email}</p>
                </div>
            </div>
        </div>
    )
}