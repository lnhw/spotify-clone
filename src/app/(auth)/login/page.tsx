"use client"

import React from "react";
import { AiOutlineSpotify } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";
import Link from "next/link";
import LoginForm from "@/components/forms/login-form";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Spotify from "@/assest/img/Spotify_Primary_Logo_RGB_Green.png"

export default function LogIn() {
    return (
        <div>
            <div className="bg-black h-screen flex items-center justify-center">
                <div id="box" className="p-8">
                    <div className="pt-8 pb-6 flex items-center justify-center">
                        <Image src={Spotify} alt="Spotify" height={110} width={110} priority />
                        {/* <AiOutlineSpotify className="w-9 h-9" /> */}
                    </div>
                    {/* <h1 className="">Log in to Spotify</h1> */}
                    <button className="p-2 text-center mb-8 rounded-full bg-green-600 shadow"
                        type="button"
                        onClick={() => signIn("spotify", {
                            callbackUrl: "/"
                        })}
                    >
                        <span className="p-1 text-white text-2xl">Login to Spotify</span>
                    </button>
                </div>
            </div>
        </div >
    );
}