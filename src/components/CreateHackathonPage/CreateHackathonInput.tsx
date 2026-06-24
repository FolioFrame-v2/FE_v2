import React from "react";
import { useState } from "react";
// import Calendar from "@/components/CreateHackathonPage/Calendar.jsx";
import CalendarInput from "@/components/CreateHackathonPage/CalendarInput.jsx";
// removed domain/features import

const CreateHackathonInput = ({ onInputChange, formData, onDateChange }) => {
  // 업로드 이미지 미리보기 코드
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
          target: { name: "pictures", value: uploadedPaths },
        });
        console.log("onInputChange 호출 후 formData 확인:", formData); // 상태 확인-> 나오는데 더미 데이터로 안 넘어간다?ㅍ왜지? -> 수연 언니 나온다아아아앙

        alert("사진 업로드 성공!");
      } catch (error) {
        console.error("사진 업로드 오류:", error);
      }
    };

  return(
    <>
     {/* 필수항목 */}
    <div className="w-[80%] py-[40px] px-[40px] mx-auto border-[1.5px] border-[#d0d1d9] rounded-[2em] h-[45em] flex flex-col items-center"> 
     <p className="text-black text-[1.5em] font-[800] font-['OTF_B']">필수 항목</p>
      <div className="flex gap-[5%] justify-between w-full">
        {/* 해커톤 이름 */}
          <div className="flex flex-col">
              <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">해커톤 이름</p>
              <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">해커톤 이름을 작성해주세요</p>
              <input 
                className="border border-[#d0d1d9] rounded-[2em] outline-none h-[2em] w-[35em] indent-[1em] placeholder:indent-[1em]"
                type="text"
                name="hackName" 
                value={formData.hackName}
                onChange={onInputChange}>
              </input>
          </div>
        {/* 링크 */}
        <div className="flex flex-col">
              <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">Links</p>
              <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">해커톤을 설명할 자료 링크를 입력해주세요.</p>
              <input 
                className="border border-[#d0d1d9] rounded-[2em] outline-none h-[2em] w-[35em] indent-[1em] placeholder:indent-[1em]"
                type="url"
                name="link" 
                value={formData.link}
                onChange={onInputChange}>
              </input>
          </div>
        </div>


        {/* 모집 부분 */}
        <div className="flex gap-[5%] justify-between w-full">
          <div className="flex flex-col">
              <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">모집 파트</p>
              <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">모집할 파트를 입력해주세요.</p>
              <input
                className="border border-[#d0d1d9] rounded-[2em] outline-none h-[2em] w-[35em] indent-[1em] placeholder:indent-[1em]"
                type="text"
                name="part" 
                value={formData.part}
                onChange={onInputChange}></input>
          </div>

        <div className="flex flex-col">
              <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">모집인원</p>
              <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">모집인원을 입력해주세요.</p>
              <input 
                className="border border-[#d0d1d9] rounded-[2em] outline-none h-[2em] w-[35em] indent-[1em] placeholder:indent-[1em]"
                type="text"
                name="maxMemNumber" 
                value={formData.maxMemNumber}
                onChange={onInputChange}
              ></input>
          </div>
        </div>

        <div className="flex gap-[1vw] justify-between w-full">
          {/* 참여기간 */}
          <div className="flex flex-col">
              <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">모집기간</p>
              <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">이 해커톤에 참여한 기간을 선택해주세요. </p>
              <CalendarInput
                startDate={formData.startDate}
                endDate={formData.endDate}
                onDateChange={onDateChange}
              />
          </div>
          {/* 공유 여부 */}
          <div className="flex flex-col">
              <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">해커톤 설명</p>
              <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">해커톤에 대해서 자세히 설명해주세요</p>
              <textarea
                className="border border-[#d0d1d9] rounded-[1em] outline-none h-[23em] w-[35em] indent-[1em] placeholder:indent-[1em]"
                name="description" 
                value={formData.description}
                onChange={onInputChange}
              ></textarea>
            </div>
        </div>
        
        

    </div>

    {/* 선택항목 */}
    <div className="w-[80%] py-[40px] px-[40px] mx-auto my-[8em] border-[1.5px] border-[#d0d1d9] rounded-[2em] h-[28em] flex flex-col items-center"> 
      <p className="text-black text-[1.5em] font-[800] font-['OTF_B']">선택 항목</p>
      <div className="flex gap-[20%] w-full">
        {/* 데모 비디오 */}
          <div className="flex flex-col">
              <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">홍보 비디오</p>
              <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">해커톤을 홍보하는 비디오를 링크에 추가하세요</p>
              <input className="border border-[#d0d1d9] rounded-[2em] outline-none h-[2em] w-[35em] indent-[1em] placeholder:indent-[1em]" type="url"></input>
          </div>
        {/* 커버 이미지*/}
          <div className="flex flex-col">
              <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">커버 이미지</p>
              <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">해커톤을 보여줄 표지 이미지를 업로드해주세요</p>
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
              <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">사진</p>
              <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">최대 4장의 사진을 업로드하여 해커톤을 소개해주세요</p>
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
              
              {/* <ChoiceInput type="file"></ChoiceInput> */}
          </div>
          {/* 로고 */}
          <div className="flex flex-col">
              <p className="text-[1.5em] font-[800] text-[#0a27a6] -mb-[0.2em] font-['OTF_B']">로고</p>
              <p className="text-black text-[0.8em] font-[800] font-['OTF_R']">해커톤을 나타내는 로고를 업로드해주세요</p>
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

    </>
    );
};

export default CreateHackathonInput;