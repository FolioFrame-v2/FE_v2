import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';

const LoginPage = () => {
    const [eyeVisible, setEyeVisible] = useState(false);
    const [emailOrId, setemailOrId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onClickImg = () => {
        navigate({ to: `/memberselection` });
    };

    const toggleEyeVisible = () => {
        setEyeVisible(!eyeVisible);
    };

    const handleLogin = () => {
        console.log("Mock handleLogin", emailOrId, password);
        const isFirstLogin = localStorage.getItem('isFirstLogin');
        if (isFirstLogin === 'true') {
            localStorage.removeItem('isFirstLogin');
            navigate({ to: `/onboarding` });
        } else {
            navigate({ to: `/` });
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-[85%] min-h-screen py-[8%] px-[40px] mx-auto">
            <p className="text-[#0a27a6] text-[3em] font-bold font-['OTF_B'] cursor-pointer" onClick={() => navigate({ to: `/` })}>FolioFrame</p>
            <div className="flex flex-col items-center justify-center gap-[1em] pt-5">
                <input
                    className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-[200%] indent-[1em] outline-none placeholder:indent-[1em]"
                    placeholder="이메일 주소 또는 아이디"
                    value={emailOrId}
                    onChange={(e) => setemailOrId(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="relative inline-block w-[200%] mb-[-1.25em]">
                    <input
                        className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-full indent-[1em] outline-none placeholder:indent-[1em]"
                        type={eyeVisible ? "text" : "password"}
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    {eyeVisible ? (
                        <EyeOff
                            className="absolute right-[1em] top-1/2 -translate-y-1/2 cursor-pointer w-[1.2em] h-[1.2em] text-[#d0d1d9]"
                            onClick={toggleEyeVisible}
                        />
                    ) : (
                        <Eye
                            className="absolute right-[1em] top-1/2 -translate-y-1/2 cursor-pointer w-[1.2em] h-[1.2em] text-[#d0d1d9]"
                            onClick={toggleEyeVisible}
                        />
                    )}
                </div>
            </div>
            <button className="text-white text-[1em] font-extrabold rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[15em] my-[2em] cursor-pointer" onClick={handleLogin}>로그인</button>

            <div className="flex gap-[1em] mt-[-1.25em]">
                <p className="text-[#d0d1d9] text-[1em] font-medium">회원이 아니신가요? |</p>
                <button className="text-[#d0d1d9] text-[1em] font-medium border-none bg-transparent cursor-pointer" onClick={onClickImg}>회원가입</button>
            </div>
        </div>
    );
};

export default LoginPage;