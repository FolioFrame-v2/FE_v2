import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
// import {
//     setCurrentUser,
//     getCurrentUser,
// } from "../components/features/currentUser.js";

// import Eye from "../assets/icons/Login/Eye.png";
// import Eyeoff from "../assets/icons/Login/Eyeoff.png";

// import { userInfo } from "../components/commmon/dummydata/userInfo.jsx";
// import { hashFunction } from "../components/features/hashFunction.jsx";

const LoginPage = () => {
    const [eyeVisible, setEyeVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [emailOrId, setemailOrId] = useState("");
    const [password, setPassword] = useState("");
    const [Id, setId] = useState("");

    const navigate = useNavigate();

    // useEffect(() => {
    //     //이미 로그인된 사용자 있으면 홈으로
    //     const currentUser = getCurrentUser();
    //     if (currentUser) {
    //         navigate({ to: "/" });
    //     }
    // }, [navigate]);

    // 회원가입 페이지 이동

    // const onClickImg = () => {
    //     navigate({ to: "/MemberSelectionPage" });
    // };

    // 비밀번호 눈
    const toggleEyeVisible = () => {
        setEyeVisible(!eyeVisible);
    };

    // // 현혜징 X
    // const handleLogin = () => {
    //     const trimmedEmail = email.trim();
    //     const trimmedId = Id.trim();
    //     const trimmedPassword = password.trim();

    //     console.log("입력된 이메일 및 아이디 :", trimmedEmail, trimmedId);
    //     console.log("입력된 비밀번호 : ", trimmedPassword);
    //     console.log("더미 데이터:", userInfo);

    //     const promises = userInfo.map(async (value) => {
    //         const hashPwd = await hashFunction(trimmedPassword);
    //         if ((value.email && value.email.toLowerCase() === trimmedEmail.toLowerCase()) ||
    //             (value.id && value.id.toString() === trimmedId)) {
    //             return value.password === hashPwd ? value : null;
    //         }
    //         return null;
    //     });

    //     Promise.all(promises)
    //         .then((results) => {
    //             const user = results.find((result) => result !== null);
    //             if (user) {
    //                 console.log("로그인 성공!");
    //                 // 로그인한 유저 처리
    //                 setCurrentUser(user); //현재 사용자 정보 저장
    //                 navigate({ to: "/" });
    //             } else {
    //                 alert('아이디 혹은 이메일과 비밀번호를 정확하게 입력하세요.');
    //                 console.log("비밀번호가 일치하지 않거나, 유저 정보가 없습니다.");
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("로그인 오류:", error);
    //         });
    // };

    // const handleKeyDown = (e) => {
    //     if (e.key === "Enter") {
    //         handleLogin();
    //     }
    // };

    return (
        <div className="flex flex-col items-center justify-center w-[85%] py-[8%] px-[40px] mx-auto">
            <p className="text-[#0a27a6] text-[3em] font-bold font-['OTF_B'] cursor-pointer" onClick={() => navigate({ to: "/" })}>FolioFrame</p>
            <div className="flex flex-col items-center justify-center gap-[1em]">
                <input
                    className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-[200%] indent-[1em] outline-none placeholder:indent-[1em]"
                    placeholder="이메일 주소 또는 아이디"
                    value={emailOrId}
                    onChange={(e) => {
                        const inputValue = e.target.value.trim();
                        setemailOrId(inputValue);
                        if (inputValue.includes("@")) {
                            setEmail(inputValue);
                            setId(""); // ID는 초기화
                        } else {
                            setId(inputValue);
                            setEmail(""); // 이메일 초기화
                        }
                    }}
                // onKeyDown={handleKeyDown}
                />
                <div className="relative inline-block w-[200%] mb-[-1.25em]">
                    <input
                        className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-full indent-[1em] outline-none placeholder:indent-[1em] [&::-ms-reveal]:hidden"
                        type={eyeVisible ? "text" : "password"}
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    // onKeyDown={handleKeyDown}
                    />
                    {/* <img
                        className="absolute right-[1em] top-1/2 -translate-y-1/2 cursor-pointer w-[1.2em] h-[1.2em]"
                        src={eyeVisible ? Eyeoff : Eye}
                        alt="eye"
                        onClick={toggleEyeVisible}
                    /> */}
                </div>
            </div>
            {/* <button className="text-white text-[1em] font-extrabold rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[15em] my-[2em]" onClick={handleLogin}>로그인</button> */}
            <button className="text-white text-[1em] font-extrabold rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[15em] my-[2em]">로그인</button>

            <div className="flex gap-[1em] mt-[-2em]">
                <p className="text-[#d0d1d9] text-[1em] font-medium">회원이 아니신가요? |</p>
                <button className="text-[#d0d1d9] text-[1em] font-medium border-none bg-transparent cursor-pointer">회원가입</button>
                {/* <button className="text-[#d0d1d9] text-[1em] font-medium border-none bg-transparent cursor-pointer" onClick={onClickImg}>회원가입</button> */}

            </div>
        </div>
    );
};

export default LoginPage;