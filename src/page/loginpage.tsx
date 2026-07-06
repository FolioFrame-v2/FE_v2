import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { useLogin } from "@/api/generated/auth-api/auth-api";

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

    const { mutateAsync: loginMutate } = useLogin();

    const handleLogin = async () => {
        try {
            const res = await loginMutate({
                data: {
                    loginId: emailOrId,
                    password: password
                }
            });
            // 백엔드에서 받은 토큰과 유저 타입 저장
            const token = res.data?.result?.accessToken;
            const refreshToken = res.data?.result?.refreshToken;
            const fetchedUserType = res.data?.result?.memberType; // TALENT or COMPANY

            if (token) {
                localStorage.setItem('accessToken', token);
            }
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
            
            // 기존에 임시로 사용하던 userType 대신 백엔드에서 받은 memberType 활용
            let userType = fetchedUserType?.toLowerCase();
            if (fetchedUserType === 'COMPANY') {
                userType = 'recruiter';
            } else if (fetchedUserType === 'TALENT') {
                userType = 'developer';
            }
            
            if (userType) {
                localStorage.setItem('userType', userType);
            }

            console.log("Login success:", res);

            // 최초 로그인 여부는 가입 직후 localStorage.setItem('isFirstLogin', 'true')로 저장된다고 가정
            const isFirstLogin = localStorage.getItem('isFirstLogin');
            if (isFirstLogin === 'true') {
                localStorage.removeItem('isFirstLogin');
                if (userType === 'recruiter') {
                     navigate({ to: `/onboarding-recruiter` });
                } else {
                     navigate({ to: `/onboarding` });
                }
            } else {
                navigate({ to: `/` });
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
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