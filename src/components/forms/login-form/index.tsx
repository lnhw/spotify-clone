"use client";
import React, { FormEvent, useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { z } from "zod";
//define the schema using Zod
const loginSchema = z.object({
    emailOrUser: z.string().nonempty("Email or Username is required"),
    password: z.string().nonempty("Password is required")
})
const LoginForm: React.FC = () => {

    const [showPwd, setShowPwd] = useState<boolean>(false);
    const [emailOrUser, setEmailOrUser] = useState<string>("");
    const [password, setPassWord] = useState<string>("");
    const [erros, setErrors] = useState<{
        emailOrUser?: string,
        password?: string,
    }>({});

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            // loginSchema.parse(formData);
            const formData = new FormData(event.currentTarget);
            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Failed to submit the data. Please try again.");
            }
            //handle response if necessary
            const data = await response.json();
        } catch (error) {
            //capture the error message to display to user
            // if (error instanceof z.ZodError) {
            //     //set validation erros
            //     const fieldErros = error.errors.reduce((acc, error) => {
            //         acc[error.path[0]] = error.message;
            //     }, {})
            //     setErrors(fieldErros);
            // }
            console.error(error);
        } finally {

        }
    }
    const togglePasswordVisibility = () => {
        setShowPwd(prevState => !prevState);
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <div className="pb-4">
                        <label className="block pb-2 text-sm text-[#ffff]" htmlFor="">Email Or Username</label>
                        <input type="text" className="w-full py-3 px-4 text-black text-base outline-none rounded border-none hover:border-white" />
                    </div>
                    <div className="relative pb-4">
                        <label className="block pb-2 text-sm text-[#ffff]" htmlFor="">Password</label>
                        <input
                            type={showPwd ? "text" : "password"}
                            className="w-full py-3 px-4 text-black text-base outline-none rounded border-none hover:border-white" />
                        <button
                            type="button"
                            className="absolute flex items-center right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={togglePasswordVisibility}
                        >
                            {showPwd ? <IoMdEye size={24} /> : <IoIosEyeOff size={24} />}
                        </button>
                    </div>
                    <div>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round text-xs">Remember me</span>
                        </label>
                    </div>
                    <div className="py-8">
                        <button className="bg-green-500 w-full h-12 rounded-full " type="button">
                            <span className="text-black  text-base font-bold px-2 py-8">Login</span>
                        </button>
                    </div>
                    <div>
                        <p className=" text-white text-center  text-base hover:text-green-500 cursor-pointer">
                            Forgot your password?
                        </p>
                    </div>
                </div>
            </form>
        </>
    );
}
export default LoginForm;