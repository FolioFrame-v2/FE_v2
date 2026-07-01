import React, { useState } from "react";
import { Navigate, useNavigate } from "@tanstack/react-router";
import Consent from "@/components/Consent/Consent.js";
import { Eye, EyeOff } from 'lucide-react';
// 서버 연결
// removed domain/features import
// removed domain/features import
// removed domain/features import
// removed domain/features import
// removed domain/features import
// removed domain/features import
// removed domain/features import

const SignUpRecruiterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState<any[]>([]);
    const [agree, setAgree] = useState(false); // agree 상태 관리

    //아이디 중복 확인
    const [idInput, setIdInput] = useState("");
    const [idChecked, setIdChecked] = useState(false);
    //전화번호 중복 확인
    const [phone, setPhone] = useState("");
    const [phoneChecked, setPhoneChecked] = useState(false);
    //비밀번호 확인
    const [eyeVisible, setEyeVisible] = useState(false);
    const [eyeVisibleConfirm, setEyeVisibleConfirm] = useState(false);
    const [password, setPassword] = useState("");
    const [repassword, setrePassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isRePasswordEnabled, setIsRePasswordEnabled] = useState(false);

    //눈 아이콘
    const toggleEyeVisible = () => {
        setEyeVisible(!eyeVisible);
    };
    const toggleEyeVisibleConfirm = () => {
        setEyeVisibleConfirm(!eyeVisibleConfirm);
    };

    //팝업창 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkStates, setCheckStates] = useState({
        privacy: false,
        portfolio: false,
        violation: false,
    });

    //팝업 창 
    const handleCheckBoxClick = (value: any) => {
        setIsModalOpen(true);
        setAgree(value);
    };
    const closeModal = (value: any) => {
        setIsModalOpen(false);
        setAgree(false);

    };
    const handleAgree = (value: any) => {
        setAgree(value);
        setIsModalOpen(false);
    };

    const handleDisagree = () => {
        setAgree(false);
        setIsModalOpen(false);

    };


    const autoHyphen = (value: any) => {
        const cleanedValue = value.replace(/[^0-9]/g, "");
        const formattedValue = cleanedValue
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
            .replace(/(\-{1,2})$/, "");
        return formattedValue;
    };

    //아이디 중복 부분
    const handleIdInputChange = (e: any) => {
        setIdInput(e.target.value);
        setIdChecked(false);
    };

    const handleIdCheck = () => {
        setIdChecked(true);
    };

    // 전화번호 인증 부분
    const handlePhoneChange = (event: any) => {
        const { value } = event.target;
        setPhone(autoHyphen(value));
        setPhoneChecked(false);
    };

    const handlePhoneCheck = () => {
        console.log("입력된 전화번호:", phone);
        setPhoneChecked(true);
    };


    // 비밀번호 유효성 검사 및 비밀번호 확인
    const handlePassValidation = () => {
        setIsPasswordValid(true);
        setIsRePasswordEnabled(true);
    };


    const passwordCheck = () => {
        alert("비밀번호가 인증되었습니다.");
    };
    const handlePassinputChange = (e: any) => {
        setPassword(e.target.value);
    };

    //회사 인증
    const [Comemail, setComEmail] = useState('');
    const [isCompanyChecked, setCompanyChecked] = useState(false);

    //사업자등록번호 인증
    const [businessNumber, setBusinessNumber] = useState('');
    const [isBusinessChecked, setBusinessChecked] = useState(false);

    const handleEmailChange = (event: any) => {
        setComEmail(event.target.value);
        setCompanyChecked(false);
    }

    const handleCompanyCheck = (email: any) => {
        setCompanyChecked(!isCompanyChecked);
    }

    const handleSignUp = async () => {
        // 기본약관 동의 여부 확인
        if (!agree) {
            alert("가입 기본약관에 동의해야 회원가입이 가능합니다.");
            return;
        }

        console.log("Mock handleSignUp");
        alert('회원가입 성공!');
        localStorage.setItem('isFirstLogin', 'true');
        navigate({ to: `/login` });
    };

    return (
        <div className="flex flex-col items-center justify-center w-[85%] min-h-screen py-[40px] px-[40px] mx-auto">
            <p className="text-[#0a27a6] text-[3em] font-bold font-['OTF_B'] cursor-pointer pt-5" onClick={() => navigate({ to: `/` })}>FolioFrame</p>
            <div className="flex flex-col justify-center gap-[1em]">
                {/* 이름, 생년월일 */}
                <div className="flex gap-[1em] w-full">
                    <input
                        className="rounded-[2em] border border-[#d0d1d9] h-[3em] flex-1 indent-[1em] outline-none placeholder:indent-[1em] placeholder:text-[#d0d1d9]"
                        placeholder="이름"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    <div className="flex items-center gap-[0.5em] flex-1 justify-end">
                        <p className="text-[#d0d1d9] text-[0.9em] font-medium">생년월일</p>
                        <input className="border border-[#d0d1d9] outline-none h-[2.5em] p-[0.5em] text-[0.9em] text-[#d0d1d9] rounded-[4px]" type="date" onChange={(e: any) => setBirthday(e.target.value.split('-'))} />
                    </div>
                </div>

                {/* 아이디, 비밀번호, 비밀번호 확인 */}
                <div className="flex flex-col w-full gap-[0.5em]">
                    <input
                        className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-full indent-[1em] outline-none placeholder:indent-[1em] placeholder:text-[#d0d1d9]"
                        placeholder="아이디 : 영소문, 숫자, _, .로 이루어진 6~20자"
                        type="text"
                        value={idInput}
                        onChange={handleIdInputChange}
                    />
                    <div className="flex items-center">
                        <input
                            className="border border-[#d0d1d9]"
                            type="checkbox"
                            id="IDcheck"
                            onClick={handleIdCheck}
                            checked={idChecked}
                        />
                        <label htmlFor="IDcheck">중복확인</label>
                    </div>
                </div>
                <div className="relative w-full">
                    <input
                        className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-full indent-[1em] pr-[2.5em] outline-none placeholder:indent-[1em] placeholder:text-[#d0d1d9] [&::-ms-reveal]:hidden"
                        type={eyeVisible ? "text" : "password"}
                        placeholder="비밀번호 : 영문+특문+숫자로 12~20자"
                        value={password}
                        onChange={handlePassinputChange}
                        onBlur={handlePassValidation}
                        onKeyDown={(e) => e.key === "Enter" && handlePassValidation()}
                    />
                    {eyeVisible ? (
                        <Eye
                            className="absolute right-[1em] top-1/2 -translate-y-1/2 cursor-pointer w-[1.2em] h-[1.2em] text-[#d0d1d9] hover:text-[#5e5e60]"
                            onClick={toggleEyeVisible}
                        />
                    ) : (
                        <EyeOff
                            className="absolute right-[1em] top-1/2 -translate-y-1/2 cursor-pointer w-[1.2em] h-[1.2em] text-[#d0d1d9] hover:text-[#5e5e60]"
                            onClick={toggleEyeVisible}
                        />
                    )}
                </div>
                <div className="relative w-full">
                    <input
                        className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-full indent-[1em] pr-[2.5em] outline-none placeholder:indent-[1em] placeholder:text-[#d0d1d9] [&::-ms-reveal]:hidden"
                        type={eyeVisibleConfirm ? "text" : "password"}
                        placeholder="비밀번호 확인"
                        value={repassword}
                        onChange={(e) => setrePassword(e.target.value)}
                        // onBlur={passwordCheck}
                        // onBlur={() => {
                        //     if (password && repassword) {
                        //         setIsPasswordConfirmed(false); 
                        //         passwordCheck();
                        //     }
                        // }}
                        onKeyDown={(e) => e.key === "Enter" && passwordCheck()}
                        disabled={!isRePasswordEnabled}
                    />
                    {eyeVisibleConfirm ? (
                        <Eye
                            className="absolute right-[1em] top-1/2 -translate-y-1/2 cursor-pointer w-[1.2em] h-[1.2em] text-[#d0d1d9] hover:text-[#5e5e60]"
                            onClick={toggleEyeVisibleConfirm}
                        />
                    ) : (
                        <EyeOff
                            className="absolute right-[1em] top-1/2 -translate-y-1/2 cursor-pointer w-[1.2em] h-[1.2em] text-[#d0d1d9] hover:text-[#5e5e60]"
                            onClick={toggleEyeVisibleConfirm}
                        />
                    )}
                </div>
                {/* 전화번호  */}
                <div className="flex flex-col w-full gap-[0.5em]">
                    <input
                        className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-full indent-[1em] outline-none placeholder:indent-[1em] placeholder:text-[#d0d1d9]"
                        type="tel"
                        // maxLength="13"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="휴대폰 번호"
                        id="tel"
                        autoComplete="off"
                        name="users_phone"
                    />
                    <div className="flex items-center">
                        <input
                            className="border border-[#d0d1d9]"
                            type="checkbox"
                            id="Phonecheck"
                            onClick={handlePhoneCheck}
                            checked={phoneChecked}
                        />
                        <label htmlFor="Phonecheck">중복확인</label>
                    </div>

                </div>

                {/* 회사인증 */}
                <div className="flex flex-col w-full gap-[0.5em]">
                    <input
                        className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-full indent-[1em] outline-none placeholder:indent-[1em] placeholder:text-[#d0d1d9]"
                        placeholder="사업자등록번호 (예: 123-45-67890)"
                        type="text"
                        value={businessNumber}
                        onChange={(e) => setBusinessNumber(e.target.value)}
                    />
                </div>
                <div className="flex items-center mt-[-0.5em] gap-[1em]">
                    <div className="flex items-center">
                        <input
                            className="border border-[#d0d1d9] mr-1"
                            type="checkbox"
                            id="company"
                            checked={isCompanyChecked}
                            onChange={() => handleCompanyCheck(Comemail)}
                            disabled={!Comemail}
                        />
                        <label htmlFor="company">이메일 인증</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            className="border border-[#d0d1d9] mr-1"
                            type="checkbox"
                            id="business"
                            checked={isBusinessChecked}
                            onChange={() => setBusinessChecked(!isBusinessChecked)}
                            disabled={!businessNumber}
                        />
                        <label htmlFor="business">사업자 인증</label>
                    </div>

                    <div className="flex items-center ml-auto">
                        <input
                            className="border border-[#d0d1d9] mr-1"
                            onClick={handleCheckBoxClick}
                            type="checkbox"
                            id="Join"
                            checked={agree}
                        />
                        <label htmlFor="Join">가입 기본약관</label>
                    </div>
                </div>
            </div>

            <button className="text-white text-[1em] font-extrabold rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[15em] my-[2em]" onClick={handleSignUp} >시작하기</button>
            <div className="flex gap-[1em] mt-[-1.25em]">
                <p className="text-[#d0d1d9] text-[1em] font-medium">이미 회원이신가요? |</p>
                <button className="text-[#d0d1d9] text-[1em] font-medium border-none bg-transparent cursor-pointer" onClick={() => navigate({ to: `/login` })}>로그인</button>
            </div>

            {/* 팝업창 */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-[2em] rounded-[8px] text-center w-[80%] max-w-[500px]">
                        <Consent
                            checkStates={checkStates}
                            setCheckStates={setCheckStates}
                            agree={agree}
                            onAgree={handleAgree}
                            onDisagree={handleDisagree}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUpRecruiterPage;