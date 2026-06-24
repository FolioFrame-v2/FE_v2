import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Consent from "../components/Consent/Consent.jsx";
import Eye from "../assets/icons/Login/Eye.png";
import Eyeoff from "../assets/icons/Login/Eyeoff.png";

//서버 연결
import { setId } from "../components/features/signUpDeveloper.jsx";
import { changedId } from "../components/features/signUpDeveloper.jsx";
import { setPhoneNumber } from "../components/features/signUpDeveloper.jsx";
import { changedPhoneNumber } from "../components/features/signUpDeveloper.jsx";
import { isPassword } from "../components/features/signUpDeveloper.jsx";
import { PasswordValidation } from "../components/features/signUpDeveloper.jsx";
import { idSignUpDeveloper } from "../components/features/signUpDeveloper.jsx";

const signUpDeveloperPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
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

  const toggleEyeVisible = () => {
    setEyeVisible(!eyeVisible);
  };

  const toggleEyeVisibleConfirm = () => {
    setEyeVisibleConfirm(!eyeVisibleConfirm);
  };

  const autoHyphen = (value) => {
    const cleanedValue = value.replace(/[^0-9]/g, "");
    const formattedValue = cleanedValue
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
      .replace(/(\-{1,2})$/, "");
    return formattedValue;
  };
  //아이디 중복 부분
  const handleIdInputChange = (e) => {
    setIdInput(e.target.value);
    setIdChecked(false);
    changedId();
  };

  const handleIdCheck = () => {
    const isValid = setId(idInput);
    if (isValid) {
      setIdChecked(true);
    } else {
      setIdChecked(false);
      changedId();
    }
  };

  // 전화번호 인증 부분
  const handlePhoneChange = (event) => {
    const { value } = event.target;
    setPhone(autoHyphen(value));
    setPhoneChecked(false);
    changedPhoneNumber();
   };
  const handlePhoneCheck = () => {
    console.log("입력된 전화번호:", phone);
    const isValid = setPhoneNumber(phone);
    // setPhoneChecked(isValid);
    if (isValid) {
      setPhoneChecked(true);
    } else {
      setPhoneChecked(false);
      changedPhoneNumber();
    }
  };


  // 비밀번호 유효성 검사 및 비밀번호 확인
  const handlePassValidation = () => {
    if (PasswordValidation(password)) {
      setIsPasswordValid(true);
      setIsRePasswordEnabled(true);
    } else {
      setIsPasswordValid(false);
      setPassword("");
      setIsRePasswordEnabled(false);
    }
  };
  let alertShown = false;

  const passwordCheck = () => {
      if (isPassword(password, repassword)) {
          if (!alertShown) { 
              alert("비밀번호가 인증되었습니다.");
              alertShown = true;
          }
      } else {
          setrePassword('');
          alertShown = false; 
      }
  };

  const handlePassinputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      const result =  await idSignUpDeveloper(name, birthday, idInput, password, repassword, phone); 

      // 성공적으로 끝났다는 것을 확인
      if (result.success) {
        alert('회원가입이 성공!');
        navigate("/LoginPage"); 
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error)
    }
};

  return (
    <div className="flex flex-col items-center justify-center w-[85%] py-[40px] px-[40px] mx-auto">
      <p className="text-[#0a27a6] text-[3em] font-bold font-['OTF_B'] cursor-pointer" onClick={() => navigate("/")}>FolioFrame</p>
      <div className="flex flex-col items-center justify-center gap-[1em]">
        <div className="flex gap-[1em]">
          <input
            className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-[40%] indent-[1em] outline-none placeholder:indent-[1em] placeholder:text-[#d0d1d9]"
            placeholder="이름"
            type="text"
            // value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex gap-[0.5em]">
            <p className="text-[#d0d1d9] text-[0.8em] font-medium mt-[1em]">생년월일</p>
            <input
              className="border border-[#d0d1d9] outline-none h-[2em] p-[0.5em] text-[1em] text-[#d0d1d9] rounded-[4px] mr-[-2em]"
              type="date"
              // value={birthday}
              onChange={(e) => setBirthday(e.target.value.split("-"))}
            />
          </div>
        </div>
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
            className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-[90%] indent-[1em] pr-[2.5em] outline-none placeholder:indent-[1em] placeholder:text-[#d0d1d9] [&::-ms-reveal]:hidden"
            type={eyeVisible ? "text" : "password"}
            placeholder="비밀번호 : 영문+특문+숫자로 12~20자"
            value={password}
            onChange={handlePassinputChange}
            onBlur={handlePassValidation}
            onKeyDown={(e) => e.key === "Enter" && handlePassValidation()}
          />
          <img
            className="absolute right-[1em] top-1/2 -translate-y-1/2 cursor-pointer w-[1.2em] h-[1.2em]"
            src={eyeVisible ? Eyeoff : Eye}
            alt="eye"
            onClick={toggleEyeVisible}
          />
        </div>
        <div className="relative w-full">
          <input
            className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-[90%] indent-[1em] pr-[2.5em] outline-none placeholder:indent-[1em] placeholder:text-[#d0d1d9] [&::-ms-reveal]:hidden"
            type={eyeVisibleConfirm ? "text" : "password"}
            placeholder="비밀번호 확인"
            value={repassword}
            onChange={(e) => setrePassword(e.target.value)}
            onBlur={passwordCheck}
            onKeyDown={(e) => e.key === "Enter" && passwordCheck()}
            disabled={!isRePasswordEnabled}
          />
          <img
            className="absolute right-[1em] top-1/2 -translate-y-1/2 cursor-pointer w-[1.2em] h-[1.2em]"
            src={eyeVisibleConfirm ? Eyeoff : Eye}
            alt="eye"
            onClick={toggleEyeVisibleConfirm}
          />
        </div>
        <div className="flex flex-col w-full gap-[0.5em]">
          <input
            className="rounded-[2em] border border-[#d0d1d9] h-[3em] w-full indent-[1em] outline-none placeholder:indent-[1em] placeholder:text-[#d0d1d9]"
            type="tel"
            maxLength="13"
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
      </div>
      <button className="text-white text-[1em] font-extrabold rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[15em] my-[2em]" onClick={handleSignUp}>시작하기</button>
      <div className="flex gap-[1em] mt-[-2em]">
        <p className="text-[#d0d1d9] text-[1em] font-medium">이미 회원이신가요? |</p>
        <button className="text-[#d0d1d9] text-[1em] font-medium border-none bg-transparent">로그인</button>
      </div>
      {/* 이메일로 회원가입 이동 버튼 */}
      <button className="text-[#d0d1d9] text-[1em] font-medium border-none bg-transparent cursor-pointer" onClick={() => navigate("/SignUpDeveloperEmailPage")}>
        이메일로 회원가입하기
      </button>
    </div>
  );
};

export default signUpDeveloperPage;
