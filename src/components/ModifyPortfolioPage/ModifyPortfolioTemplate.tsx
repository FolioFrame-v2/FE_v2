import { templateInfo } from "@/components/commmon/dummydata/templateInfo.jsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import React, { useState } from 'react';
import { Navigation, Pagination, A11y, Autoplay, Scrollbar } from 'swiper/modules';
import Logo from "@/assets/icons/Logo.png";

const ModifyPortfolioTemplate = ({ templates, setProjectTemplate  }) => {
    const [activeTemplateId, setActiveTemplateId] = useState(null); 

    function handleClick(templateId) {
        setActiveTemplateId(templateId);
        setProjectTemplate(templateId);
      }
    
    return(
        <>
        <div className="w-[80%] py-[40px] px-[40px] m-0 border-[1.5px] border-[#d0d1d9] rounded-[2em] h-[30em] flex flex-col items-center">
        <Swiper
        spaceBetween={100}
        slidesPerView={3}  
        modules={[ A11y, Scrollbar]}
        loop={templates.length > 3} 
        speed={400}
        scrollbar={{ draggable: true }} 
        className="flex justify-center items-center h-[35em] w-full max-w-[85%] py-[20px] px-0 mx-auto relative [&_.swiper-pagination-bullet]:bg-[#0a27a6] [&_.swiper-scrollbar]:absolute [&_.swiper-scrollbar]:bottom-0 [&_.swiper-scrollbar]:left-[10%] [&_.swiper-scrollbar]:w-[80%] [&_.swiper-scrollbar]:h-[8px] [&_.swiper-scrollbar]:bg-[#ddd] [&_.swiper-scrollbar]:rounded-[5px] [&_.swiper-scrollbar-drag]:bg-[#0A27A6] [&_.swiper-scrollbar-drag]:rounded-[5px]"
        // navigation
      >

        {templates.map((template) => (
          <SwiperSlide key={template.templateId}>
            <div className="flex -ml-[2em]">
              <div 
                className="relative bg-white rounded-[20px] my-[20px] mx-0 shadow-[0_5px_10px_rgba(0,0,0,0.1)] h-[20em] before:content-[''] before:absolute before:top-0 before:left-0 before:h-[60%] before:w-full before:bg-contain before:bg-no-repeat before:bg-center before:rounded-t-[20px] before:z-[1] before:[background-image:var(--bg-img)]"
                style={{ '--bg-img': `url(${template.picture || Logo})` }}
              > 
                <div className="flex flex-col items-center p-[55px] relative z-[100] w-[12em]">
                  <div className="flex flex-col justify-center items-center mt-[8em] grow">
                    <span className="text-[20px] font-[600] text-[#0A27A6] font-['OTF_B'] h-[3em] flex justify-center items-center">{template.templateName}</span>
                    <span className="text-[15px] font-[500] font-['OTF_R'] -mt-[10px]">{template.description} </span>
                  </div>
                  <div className="w-full flex gap-[16px] justify-center mt-[10px]">
                    <button   
                      className={`bg-white outline-none border border-[#0A27A6] text-[#0A27A6] py-[9px] px-[25px] rounded-[20px] text-[14px] transition-all duration-300 ease-in-out cursor-pointer font-['OTF_B'] hover:bg-[#0A27A6] hover:text-white focus:text-white focus:font-bold focus:bg-[#0A27A6] active:text-white active:font-bold active:bg-[#0A27A6] ${activeTemplateId === template.templateId ? 'text-white font-bold !bg-[#0A27A6]' : ''}`}
                      onClick={() => handleClick(template.templateId)}>선택하기</button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
            {/* <CreatePortfolioSlide templates={templateInfo}/> */}
        </div>
        </>
       
    );
};

export default ModifyPortfolioTemplate;

