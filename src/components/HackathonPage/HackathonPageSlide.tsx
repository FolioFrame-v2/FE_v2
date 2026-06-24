import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import React from 'react';
import { Navigation, Pagination, A11y, Autoplay, Scrollbar } from 'swiper/modules';
import Logo from "@/assets/icons/Logo.png";

const HackathonPageSlide = ({  }) => {
    const postIds = new Array(6).fill(null).map((_, index) => `post${index + 1}`);
    const HackathonName = ["우아한테크코스", "UMC", "멋쟁이사자처럼","NEXTERS","AI Stages","K Hackathon"]
    // const explanation = [
    //   ""
    // ]
    const Link = [
      "https://www.woowacourse.io/",
      "https://linktr.ee/unimakeuschallenge",
      "https://likelion.net/school/kdt-blockchain-6th?utm_source=google&utm_medium=pmax&utm_campaign=kdtbcs06_google_pmax_conversion_2410_new&utm_content=ad_pmax&utm_term=new_2534_pcmo&gad_source=1&gclid=Cj0KCQiAlsy5BhDeARIsABRc6Zt2MnMi-W1Elp8FbDyzX6DfJN_LovrH6L4g4q7UQu4SbG6tDPkzSsoaAl50EALw_wcB",
      "https://nexters.co.kr/",
      "https://stages.ai/",
      "http://www.k-hackathon.com/"
    ]
    return (
      <Swiper
        className="flex justify-center items-center h-[35em] w-full max-w-[85%] py-[20px] px-0 mx-auto relative [&_.swiper-pagination-bullet]:bg-[#0a27a6] [&_.swiper-scrollbar]:absolute [&_.swiper-scrollbar]:bottom-[8em] [&_.swiper-scrollbar]:left-[10%] [&_.swiper-scrollbar]:w-[80%] [&_.swiper-scrollbar]:h-[8px] [&_.swiper-scrollbar]:bg-[#ddd] [&_.swiper-scrollbar]:rounded-[5px] [&_.swiper-scrollbar-drag]:bg-[#0A27A6] [&_.swiper-scrollbar-drag]:rounded-[5px]"
        spaceBetween={30}
        slidesPerView={3}  
        modules={[ A11y, Scrollbar]}
        loop={postIds.length > 3} 
        speed={400}
        scrollbar={{ draggable: true }} 
        // navigation
      >

        {postIds.map((postId, index) => (
          <SwiperSlide key={postId}>
            <div className="flex gap-[1em] mt-[5em]">
              <div className="relative bg-[#fff] rounded-[20px] m-0 shadow-[0_5px_10px_rgba(0,0,0,0.1)] h-[20em]">
                <div 
                  className="absolute top-0 left-0 h-[60%] w-full bg-contain bg-no-repeat bg-center rounded-[20px_20px_0_0] z-[1]"
                  style={{ backgroundImage: `url(${Logo})` }}
                />
                <div className="flex flex-col items-center p-[55px] relative z-[100] w-[12em]">
                  <div className="flex flex-col justify-center items-center mt-[8em] grow">
                    <span className="text-[20px] font-[600] text-[#0A27A6] font-['OTF_B'] h-[3em] flex justify-center items-center">{HackathonName[index]}</span>
                  </div>
                  <div className="w-full flex gap-[16px] justify-center mt-[10px]">
                    <a href={Link[index]} target="_blank" rel="noopener noreferrer">
                      <button className="bg-[#fff] outline-none border border-[#0A27A6] text-[#0A27A6] py-[9px] px-[25px] rounded-[20px] text-[14px] transition-all duration-300 cursor-pointer font-['OTF_B'] hover:bg-[#0A27A6] hover:text-[#fff]">참여하기</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };
  
  export default HackathonPageSlide;
