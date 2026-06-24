import { React, useState } from "react";

const FormComponent = ({ onAgree, onDisagree, checkStates, setCheckStates, agree }: any) => {
  const allChecked = Object.values(checkStates).every((isChecked) => isChecked);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  // const agree = false;
  const disagree = false;
  const handleCheckboxChange = (key: any) => {
    setCheckStates((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAgreeClick = (e: any) => {
    e.preventDefault();
    if (allChecked) {
      console.log('동의 버튼 클릭!');
      agree = true;
      setIsPopupOpen(false);
      onAgree(true);
    }
  };

  const handleDisagreeClick = (e: any) => {
    e.preventDefault();
    console.log('비동의 버튼 클릭!');
    setIsPopupOpen(false);
    onDisagree(false);
  };

  return (
    <>
      {isPopupOpen && (
        <form id="joinForm" className="w-[460px] mx-auto">
          <ul className="border border-[#ddd] bg-[#fff] list-none">

            <li className="relative list-none first:w-[85%] first:p-[15px] first:font-[600] first:text-[#888]">
              <p>기본 약관</p>
            </li>
            <li className="relative list-none first:w-[85%] first:p-[15px] first:font-[600] first:text-[#888]">
              <ul className="clearfix">
                <li className="float-left text-[0.8em]">개인정보 보호 동의</li>
                <li className="absolute top-[50%] right-[30px] -mt-[4em] list-none">
                  <input
                    className="mr-[10px]"
                    type="checkbox"
                    name="chk"
                    checked={checkStates.privacy}
                    onChange={() => handleCheckboxChange('privacy')}
                  />
                </li>
              </ul>
              <textarea className="w-[96%] h-[90px] mx-[2%] bg-[#f7f7f7] text-[#888] border-none" readOnly>
                1.1 개인정보 사용 제한
                기업회원은 열람한 일반회원의 개인정보를 본 약관에 명시된 목적(채용 평가, 입사 지원 등) 외의 용도로 사용하거나 제3자에게 제공할 수 없습니다.

                1.2 비밀 유지
                기업회원은 일반회원의 개인정보를 철저히 보호해야 하며, 외부 유출 방지에 만전을 기해야 합니다. 이와 관련된 자료는 열람 목적이 달성된 이후 즉시 파기해야 합니다.
              </textarea>
            </li>

            <li className="relative list-none first:w-[85%] first:p-[15px] first:font-[600] first:text-[#888]">
              <ul className="clearfix">
                <li className="float-left text-[0.8em]">포트폴리오 무단 사용 금지 동의</li>
                <li className="absolute top-[50%] right-[30px] -mt-[4em] list-none">
                  <input
                    className="mr-[10px]"
                    type="checkbox"
                    name="chk"
                    checked={checkStates.portfolio}
                    onChange={() => handleCheckboxChange('portfolio')}
                  />
                </li>
              </ul>
              <textarea className="w-[96%] h-[90px] mx-[2%] bg-[#f7f7f7] text-[#888] border-none" readOnly>
                2.1 저작권 보호 기업회원은 일반회원의 포트폴리오에 포함된 모든 자료(텍스트, 이미지, 디자인, 코드 등)에 대한 저작권이 일반회원에게 있음을 인정합니다. 사전 서면 동의 없이 일반회원의 포트폴리오 내용을 복제, 배포, 게시, 수정할 수 없습니다.

                2.2 무단 사용 시 책임 기업회원이 본 약관을 위반하여 일반회원의 포트폴리오를 무단으로 사용한 경우, 이에 대한 모든 법적 책임은 기업회원에게 있으며, 일반회원은 이에 대해 법적 조치를 취할 수 있습니다.
              </textarea>
            </li>

            <li className="relative list-none first:w-[85%] first:p-[15px] first:font-[600] first:text-[#888]">
              <ul className="clearfix">
                <li className="float-left text-[0.8em]">위반 시 제재 및 손해배상</li>
                <li className="absolute top-[50%] right-[30px] -mt-[4em] list-none">
                  <input
                    className="mr-[10px]"
                    type="checkbox"
                    name="chk"
                    checked={checkStates.violation}
                    onChange={() => handleCheckboxChange('violation')} />
                </li>
              </ul>
              <textarea className="w-[96%] h-[90px] mx-[2%] bg-[#f7f7f7] text-[#888] border-none" readOnly>
                3.1 계정 제재본 약관을 위반할 경우, 기업회원의 계정이 일시 정지 또는 영구적으로 제한될 수 있습니다.

                3.2 손해배상 책임
                기업회원의 위반 행위로 인해 발생한 일반회원의 피해에 대해 모든 손해배상 책임을 집니다.
              </textarea>
            </li>

          </ul>

          <ul className="mt-[15px] list-none p-0 flex">
            <li className="w-[50%]">
              <button className="block w-full h-[2em] text-center text-[0.8em] border-none transition-all duration-300 bg-[#fff] text-[#888] cursor-pointer hover:bg-[#f0f0f0]" onClick={handleDisagreeClick}>닫기</button>
            </li>
            <li className="w-[50%]">
              <button className={`block w-full h-[2em] text-center text-[0.8em] border-none transition-all duration-300 ${!allChecked ? 'bg-[#fff] text-[#888] cursor-not-allowed hover:bg-[#f0f0f0]' : 'bg-[#5592FC] text-[#fff] cursor-pointer hover:bg-[#5592FC]'}`} disabled={!allChecked} onClick={handleAgreeClick}>동의</button>
            </li>
          </ul>

        </form>
      )}
    </>
  );
};

export default FormComponent;