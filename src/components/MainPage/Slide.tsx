import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import { Navigate, useNavigate} from "react-router-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import N1 from "@/assets/icons/Mainpage/N1.svg";
import N2 from "@/assets/icons/Mainpage/N2.svg";
import N3 from "@/assets/icons/Mainpage/N3.svg";
import N4 from "@/assets/icons/Mainpage/N4.svg";
import job from "@/assets/images/Mainpage/JOB.jpg";
import hackathon from "@/assets/images/Mainpage/hackathon.jpg";

export default () => {
    const [swiperIndex, setSwiperIndex] = useState(0); // -> 페이지네이션용
    // const [swiper, setSwiper] = useState<SwiperClass>(); // -> 슬라이드용

    // const handlePrev = () => {
    //     swiper?.slidePrev()
    // }
    // const handleNext = () => {
    //   swiper?.slideNext()
    // }
    const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-full mt-[2em]">

      <Swiper
        className="flex justify-center items-center h-[40em] w-full max-w-[85%] py-[40px] px-0 mx-auto [&_.swiper-pagination-bullet]:bg-[#0A27A6]"
        spaceBetween={50}
        modules={[Navigation, Pagination, A11y, Autoplay]}
        loop={true} // 슬아이드 반복 
        speed={400} // 슬라이드 속도
        autoplay={{ delay: 3000, disableOnInteraction: false }} //자동 슬라이드 (delay: 속도, disableInlnteraction: 만지면 기능 끄기)
        onActiveIndexChange={(e)=>setSwiperIndex(e.realIndex)} //index 변경 감지 
      //   onSwiper={(e) => {setSwiper(e)}}
        slidesPerView={1}
      //   navigation // < > 표시하고 싶다면 주석 X
        pagination={{ clickable: true }}
      >


          {/* 슬라이드 1 */}
          <SwiperSlide> 
                  <img className="w-[20em] mt-[10em] mr-auto" src={N1} alt="Number1"/>
                  <div className="flex items-center justify-center relative w-full">
                      <video className="w-[30em] h-[25em] object-cover" autoPlay loop muted>
                              <source src="/videos/Sharevideo2.mp4" type="video/mp4" />
                              비디오를 재생할 수 없습니다. 브라우저가 이 형식을 지원하지 않습니다.
                      </video>
                      <div className="flex flex-col items-start justify-center ml-[2em] -mt-[5em]">
                          <p className="text-[4em] font-[900] text-[#6633cc] mb-[0.2em] font-['OTF_B']">내가 만든 <br></br>포토폴리오를<br></br>공유해보세요</p>
                          <p className="text-[0.8em] font-[600] text-[#000] -mb-[1em] font-['OTF_R']">자신이 만든 포토폴리오를 공유해서 다른 사람들과 소통해보세요!</p>
                          <p className="text-[0.8em] font-[600] text-[#000] -mb-[1em] font-['OTF_R']">가장 인기있는 포토폴리오를 만들어 볼까요?</p>
                      </div>
                  </div>
          </SwiperSlide> 

          {/* 슬라이드 2 */}
          <SwiperSlide>
                  <img className="w-[20em] mt-[10em] mr-auto" src={N2} alt="Number2"/>
                  <div className="flex items-center justify-center relative w-full">
                      <img className="w-[38em]" src={hackathon} alt="해커톤"/>
                  <div className="flex flex-col items-start justify-center ml-[2em] -mt-[5em]">
                      <p className="text-[3em] font-[900] text-[#6633cc] mb-[0.2em] font-['OTF_B']">함께 경험을<br></br> 쌓아볼까요?</p>
                  </div>
              </div>
          </SwiperSlide>


          {/* 슬라이드 3 */}
          <SwiperSlide>
                  <img className="w-[20em] mt-[10em] mr-auto" src={N3} alt="Number2"/>
            <div className="flex items-center justify-center relative w-full">
                  <div className="w-[30em] h-[25em] object-cover">
                    <img className="w-[40em]" src={job} alt="채용"/>
                  </div>
                  <div className="flex flex-col items-start justify-center ml-[2em] -mt-[5em]">
                    <p className="text-[2.8em] font-[900] text-[#6633cc] mb-[0.2em] font-['OTF_B']">채용자에게 <br></br>내 포트폴리오를 <br></br>보여줄 수 있어요</p>
                  </div>
              </div>
          </SwiperSlide>
          
          {/* 슬라이드 4 */}
          <SwiperSlide>
                  <img className="w-[20em] mt-[10em] mr-auto" src={N4} alt="Number4"/>
                  <div className="flex items-center justify-center relative w-full">
                      <video className="flex flex-col items-center justify-center w-[80%]" autoPlay loop muted>
                              <source src="/videos/Drawvideo.mp4" type="video/mp4" />
                              비디오를 재생할 수 없습니다. 브라우저가 이 형식을 지원하지 않습니다.
                      </video>
                      <div className="flex-col absolute -mt-[2em]">
                          <p className="text-[5em] font-[800] text-[#0A27A6] font-['OTF_B'] flex items-center justify-center text-center ml-[1em]">함께 만드는 <br></br>포토폴리오</p>
                          <button className="text-[#fff] text-[1em] font-[800] rounded-[2em] border-none bg-[#0A27A6] h-[3em] w-[50%] -mt-[1em] font-['OTF_R'] ml-[10em]" onClick={() => navigate("/LoginPage")}>지금 시작하기</button>
                      </div>
                  </div>
          </SwiperSlide>
      </Swiper>
    </div>

  );
};
