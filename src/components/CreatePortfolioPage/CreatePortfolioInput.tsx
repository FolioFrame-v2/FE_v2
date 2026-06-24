import React from "react";
import { useState } from "react";
// import Calendar from "./Calendar.jsx";
import CalendarInput from "./CalendarInput.jsx";
import {handleImageAdd, handleMultipleImageAdd } from "../features/fileUploadFeatures.jsx";

const CreatePortfolioInput = ({ onInputChange, formData, onDateChange }) => {
  // 업로드 이미지 미리보기 코드
  // const [coverimagePreview, setCoverImagePreview] = useState(null);
  const [LogoPreview, setLogoPreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLogo , setSelectedLogo ] = useState(null);
  const [selectedImage , setSelectedImage ] = useState(null);

  const [photosPreview, setPhotosPreview] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [isOn, setIsOn] = useState(true);

    // 파일 선택 핸들러
    const handleCoverImageChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const imageURL = URL.createObjectURL(file);
        setCoverImagePreview(imageURL); 
        setSelectedFile(file);
      }
    };
  
    const [file, setFile] = useState(null);

    let imagePath = "";


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('파일을 선택해 주세요.');
            return;
        }
        try {
          console.log("Selected File for Upload:", selectedFile);

          imagePath = await handleImageAdd(selectedFile);
          console.log("imagePath ", imagePath);
         
          onInputChange({
            target: {
                name: 'coverImage',
                value: imagePath,
                // defaultValue: String(imagePath)
            }
        });        
        alert("커버 이미지 업로드 성공!");
    
        } catch (error) {
          console.error('이미지 업로드 오류:', error);
        }
    };

    //로고 업데이트
    const handleLogoChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const imageURL = URL.createObjectURL(file);
        setLogoPreview(imageURL);
        setSelectedLogo(file);
      }
    };

    const handleSubmit2 = async (event) => {
      event.preventDefault();
    
      if (!selectedLogo) {
        alert("파일을 선택해 주세요.");
        return;
      }
    
      try {
        const uploadedLogoPath = await handleImageAdd(selectedLogo); 
        onInputChange({
          target: { name: "logo", value: uploadedLogoPath },
        });
        alert("로고 업로드 성공!");
      } catch (error) {
        console.error("로고 업로드 오류:", error);
        alert("로고 업로드 중 문제가 발생했습니다.");
      }
    };

    const handlePhotosChange = (index) => (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const newPhotosPreview = [...photosPreview];
        newPhotosPreview[index] = file; 
        setPhotosPreview(newPhotosPreview);
      } else {
        alert("이미지 파일만 업로드 가능합니다.");
      }
    };
    
    
    const handleSubmit3 = async (event) => {
      event.preventDefault();
    
      if (!photosPreview.length) {
        alert("파일을 선택해 주세요.");
        return;
      }
    
      try {
        // 사진 업로드 호출
        const uploadedPaths = await handleMultipleImageAdd(photosPreview);
        console.log("업로드된 이미지 경로들:", uploadedPaths); // 확인

        onInputChange({
          target: { name: "images", value: uploadedPaths },
        });
        console.log("onInputChange 호출 후 formData 확인:", formData); // 상태 확인-> 나오는데 더미 데이터로 안 넘어간다?ㅍ왜지? -> 수연 언니 나온다아아아앙

        alert("사진 업로드 성공!");
      } catch (error) {
        console.error("사진 업로드 오류:", error);
      }
    };

  const handleToggle = () => {
    console.log("토글 공유에 위치함:", !formData.share);
    const newShareValue = !formData.share;
    onInputChange({
      target: {
        name: "share",
        value: newShareValue,
      },
    });
  };
  

  return (
    <>
      {/* 필수항목 */}
      <div className="w-[80%] py-[40px] px-[40px] mx-auto border-[1.5px] border-[#d0d1d9] rounded-[2em] h-[53em] flex flex-col items-center">
        <p className="text-black text-[1.5em] font-[800] font-['OTF_B']">필수 항목</p>
        <div className="flex gap-[5%] justify-between w-full">
          {/* 포트폴리오 이름 */}
          <div className="flex flex-col">
            <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">포트폴리오 이름</p>
            <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">자신만의 포트폴리오 이름을 작성해주세요</p>
            <input
              className="border border-[#d0d1d9] rounded-[2em] outline-none h-[2em] w-[35em] indent-[1em] placeholder:indent-[1em]"
              type="text"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={onInputChange}
            ></input>
          </div>
          {/* 포트폴리오 설명 -> 글자수 제한해야한다.*/}
          <div className="flex flex-col">
            <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">포트폴리오 설명</p>
            <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">짧게 포트폴리오를 설명해주세요</p>
            <input
              className="border border-[#d0d1d9] rounded-[2em] outline-none h-[2em] w-[35em] indent-[1em] placeholder:indent-[1em]"
              type="text"
              name="description"
              value={formData.description}
              onChange={onInputChange}
            ></input>
          </div>
        </div>

        <div className="flex gap-[5%] justify-between w-full">
          {/* 사용한 프로그램 */}
          <div className="flex flex-col">
            <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">사용한 프로그램</p>
            <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">사용한 언어/프로그램을 작성해주세요</p>
            <input
              className="border border-[#d0d1d9] rounded-[2em] outline-none h-[2em] w-[35em] indent-[1em] placeholder:indent-[1em]"
              type="text"
              name="usedLanguage"
              value={formData.usedLanguage}
              onChange={onInputChange}
            ></input>
          </div>
          {/* 링크 */}
          <div className="flex flex-col">
            <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">Links</p>
            <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">
              Github, 웹사이트, 앱 스토어 등 프로젝트를 테스트할 수 있는 곳의
              링크를 추가하세요.
            </p>
            <input
              className="border border-[#d0d1d9] rounded-[2em] outline-none h-[2em] w-[35em] indent-[1em] placeholder:indent-[1em]"
              type="url"
              name="projectLink"
              value={formData.projectLink}
              onChange={onInputChange}
            ></input>
          </div>
        </div>

        <div className="flex gap-[5%] justify-between w-full">
          {/* The problem it solves -> 해결하는 문제 */}
          <div className="flex flex-col">
            <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">해결하는 문제</p>
            <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">
              무엇에 사용할 수 있는지, 그것이 어떻게 기존 작업을 더 쉽고
              안전하게 만드는지 등을 설명합니다
            </p>
            <textarea
              className="border border-[#d0d1d9] rounded-[1em] outline-none h-[6em] w-[35em] indent-[1em] placeholder:indent-[1em]"
              type="text"
              name="solving"
              value={formData.solving}
              onChange={onInputChange}
            ></textarea>
          </div>
          <div className="flex flex-col">
            <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">내가 마주친 도전</p>
            <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">
              이 프로젝트를 구축하는 동안 발생한 특정 버그,장애물에 대해
              알려주세요. 어떻게 극복하셨나요?{" "}
            </p>
            <textarea
              className="border border-[#d0d1d9] rounded-[1em] outline-none h-[6em] w-[35em] indent-[1em] placeholder:indent-[1em]"
              type="text"
              name="challenge"
              value={formData.challenge}
              onChange={onInputChange}
            ></textarea>
          </div>
        </div>

        <div className="flex gap-[1vw] justify-between w-full md:gap-[4vw]">
          {/* 참여기간 */}
          <div className="flex flex-col">
            <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">참여기간</p>
            <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">이 프로젝트에 참여한 기간을 선택해주세요. </p>
            <CalendarInput
              startDate={formData.startDate}
              endDate={formData.endDate}
              onDateChange={onDateChange}
            />
          </div>
          <div className="flex flex-col gap-[2em]">
              <div className="flex flex-col">
                <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">공개</p>
                <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">이 프로젝트의 공개 여부를 선택해주세요. <br></br>공개를 하시면 포트폴리오 열람 화면에서 확인하실 수 있습니다. </p>
                <div className="mt-[2em] flex items-center">
                {/* 공개 상태 */}
                <div
                  className={`text-[0.9em] font-bold cursor-pointer transition-all duration-300 ease-in-out ${formData.share ? 'text-[#0A27A6]' : 'text-[#A2A3B2]'}`}
                  onClick={handleToggle}
                >
                  공개
                </div>

                {/* 토글 박스 */}
                <div className="mx-[0.8em] my-0 border-[1.5px] border-[#0a27a6] rounded-[10px] w-[3.5em] h-[1.4375em] flex items-center relative cursor-pointer" onClick={handleToggle}>
                  <div className={`rounded-[30px] w-[1em] h-[1em] bg-[#0a27a6] absolute transition-all duration-300 ease-out ${formData.share ? 'left-[0.2em]' : 'left-[2.2em]'}`}></div>
                </div>

                {/* 비공개 상태 */}
                <div
                  className={`text-[0.9em] font-bold cursor-pointer transition-all duration-300 ease-in-out ${formData.share ? 'text-[#A2A3B2]' : 'text-[#0A27A6]'}`}
                  onClick={handleToggle}
                >
                  비공개
                </div>
              </div>
            </div>
            <div className="flex flex-col">
                  <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">카테고리</p>
                  <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">
                    이 프로젝트의 카테고리를 입력해주세요.
                  </p>
                  <input
                    className="border border-[#d0d1d9] rounded-[2em] outline-none h-[2em] w-[35em] indent-[1em] placeholder:indent-[1em]"
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={onInputChange}
                  ></input>
            </div>
          </div>
        </div>
      </div>

      {/* 선택항목 */}
      <div className="w-[80%] py-[40px] px-[40px] mx-auto my-[8em] border-[1.5px] border-[#d0d1d9] rounded-[2em] h-[28em] flex flex-col items-center">
        <p className="text-black text-[1.5em] font-[800] font-['OTF_B']">선택 항목</p>
        <div className="flex gap-[20%] w-full">
          {/* 데모 비디오 */}
          <div className="flex flex-col">
            <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">데모 비디오</p>
            <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">프로젝트 기능을 데모하는 비디오에 링크를 추가하세요</p>
            <input
              className="border border-[#d0d1d9] rounded-[2em] outline-none h-[2em] w-[35em] indent-[1em] placeholder:indent-[1em]"
              type="url"
              name="video"
              value={formData.video}
              onChange={onInputChange}
            ></input>
          </div>
          {/* 커버 이미지*/}
        <div className="flex flex-col">
        <p className="text-[1.5em] font-[800] text-[#0a27a6] font-['OTF_B']">커버 이미지</p>
            <form onSubmit={handleSubmit}>
                <input 
                  className="absolute p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]"
                  type="file" 
                  accept="image/*" 
                  id="coverphotos"
                  multiple={false}
                  onChange={handleCoverImageChange} 
                  required />
                <label
                  htmlFor="coverphotos"
                  className="w-[5em] h-[5em] text-[#d0d1d9] text-[inherit] leading-normal align-middle bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center inline-block"
                  style={{
                    backgroundImage: coverImagePreview
                      ? `url(${coverImagePreview})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!coverImagePreview && "+"}
                </label>
                <button className="border border-[#0a27a6] rounded-[2em] bg-white text-[#0a27a6] text-[1em] font-[800] font-['OTF_R'] mt-[1em]" type="submit">업로드</button>
            </form>
        </div>  


        </div>

        <div className="flex gap-[20%] w-full">
          {/* 사진 */}
          <div className="flex flex-col">
          <p className="text-[1.5em] font-[800] text-[#0a27a6] font-['OTF_B']">사진</p>
          <form onSubmit={handleSubmit3}>
            <div className="flex gap-[1em] justify-between w-full">
              {photosPreview.map((preview, index) => (
                <label
                  key={index}
                  htmlFor={`photos-${index}`}
                  className="w-[5em] h-[5em] text-[#d0d1d9] text-[inherit] leading-normal align-middle bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center inline-block"
                  style={{
                    backgroundImage: preview ? `url(${URL.createObjectURL(preview)})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <input
                    className="absolute p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]"
                    type="file"
                    accept="image/*"
                    id={`photos-${index}`}
                    onChange={handlePhotosChange(index)}
                    required={index === 0}
                  />
                  {!preview && "+"}
                </label>
              ))}
              {photosPreview.length < 5 && (
                <label
                  htmlFor={`photos-${photosPreview.length}`}
                  className="w-[5em] h-[5em] text-[#d0d1d9] text-[inherit] leading-normal align-middle bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center inline-block"
                  style={{
                    backgroundColor: "#f0f0f0",
                    border: "1px dashed #d0d0d0",
                  }}
                >
                  <input
                    className="absolute p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]"
                    type="file"
                    accept="image/*"
                    id={`photos-${photosPreview.length}`}
                    onChange={handlePhotosChange(photosPreview.length)}
                  />
                  +
                </label>
              )}
            </div>
            <button className="border border-[#0a27a6] rounded-[2em] bg-white text-[#0a27a6] text-[1em] font-[800] font-['OTF_R'] mt-[1em]" type="submit">업로드</button>
          </form>
        </div>

          {/* 로고 */}
          <div className="flex flex-col">
            <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">로고</p>
            <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">프로젝트를 나타내는 로고를 업로드해주세요</p>
            <div className="flex gap-[1em] justify-between w-full">
            <form onSubmit={handleSubmit2}>
              <input
               className="absolute p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]"
               type="file" 
               accept="image/*" 
               multiple={false}
               required
               id="Logo"
              onChange={handleLogoChange}
              />
              <label
                htmlFor="Logo"
                className="w-[5em] h-[5em] text-[#d0d1d9] text-[inherit] leading-normal align-middle bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center inline-block"
                style={{
                  backgroundImage: LogoPreview ? `url(${LogoPreview})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {" "}
                {!LogoPreview && "+"}
              </label>
              <button className="border border-[#0a27a6] rounded-[2em] bg-white text-[#0a27a6] text-[1em] font-[800] font-['OTF_R'] mt-[1em]" type="submit">업로드</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePortfolioInput;