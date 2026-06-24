import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";



import BoldIcon from "@/assets/icons/boldIcon.svg";
import ItalicIcon from "@/assets/icons/italic-5.svg?react";
import StrikeThroughIcon from "@/assets/icons/strikethrough-13.svg?react";
import ImageIcon from "@/assets/icons/imageIcon.svg?react";
import LinkIcon from "@/assets/icons/linkIcon.svg?react";

const WritingBox = ({ addComment }: any) => {
  const [markdown, setMarkdown] = useState("");
  const [lengthCount, setLengthCount] = useState(markdown.length);
  const [fontSize, setFontSize] = useState("0");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textareaRef = useRef(null);

  const applyFontSize = (e: any) => {
    const value = e.target.value;
    setFontSize(value);
    if (value === "0") return;

    const headerSyntax = "#".repeat(value) + " ";
    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd } = textarea;
    const before = markdown.substring(0, selectionStart);
    const after = markdown.substring(selectionEnd);

    setMarkdown(`${before}${headerSyntax}${after}`);
    textarea.setSelectionRange(
      selectionStart + headerSyntax.length,
      selectionStart + headerSyntax.length
    );
    textarea.focus();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setFontSize("0");
    }
  };

  const applyFormatting = (syntax: any) => {
    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd } = textarea;
    const before = markdown.substring(0, selectionStart);
    const selected = markdown.substring(selectionStart, selectionEnd);
    const after = markdown.substring(selectionEnd);

    if (selected.length > 0) {
      setMarkdown(`${before}${syntax}${selected}${syntax}${after}`);
      textarea.setSelectionRange(
        selectionStart + syntax.length,
        selectionEnd + syntax.length
      );
    } else {
      setMarkdown(`${before}${syntax}${after}`);
      textarea.setSelectionRange(
        selectionStart + syntax.length,
        selectionStart + syntax.length
      );
    }
    textarea.focus();
  };

  const addLink = () => {
    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd } = textarea;
    const before = markdown.substring(0, selectionStart);
    const selected = markdown.substring(selectionStart, selectionEnd);
    const after = markdown.substring(selectionEnd);

    const linkText = selected.length > 0 ? selected : "text";
    const linkSyntax = `[${linkText}]()`;
    setMarkdown(`${before}${linkSyntax}${after}`);
    textarea.setSelectionRange(
      selectionStart + linkSyntax.length - 4,
      selectionEnd + linkSyntax.length - 4
    );
    textarea.focus();
  };

  const handleMarkdownChange = (e: any) => {
    if (typeof e.target.value !== "string") {
      console.log("markdown의 value가 string이 아님.");
      console(e);
    }
    setMarkdown(e.target.value);
    setLengthCount(e.target.value.length);
  };

  const handleSubmit = () => {
    if (!markdown.trim()) {
      setErrorMessage("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      // 댓글 추가
      addComment(markdown);
      setMarkdown(""); // 입력 초기화
      setErrorMessage(""); // 에러 메시지 초기화
    } catch (error) {
      setErrorMessage("댓글 저장 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // const handleSubmit = () => {
  //   const currentUser = null;
  //   console.log(currentUser);
  //   if (markdown.trim() !== "") {
  //     const newComment = new Comment(
  //       null, // commentId, saveComment에서 생성
  //       null, // portfolioId
  //       currentUser.id, //userId
  //       markdown, //text
  //       new Date().toISOString().split("T")[0] //date
  //     );
  //     //console.log(newComment); -> 문제 없음.
  //     addComment(newComment);
  //     setMarkdown("");
  //   }
  // };

  return (
    <div className="flex flex-col w-full mb-[1em]">
      <div className="mt-[0.6em] h-[2em] flex items-center bg-[#fbfaff] text-[0.9em] overflow-x-scroll top-[60px]">
        <select
          className="flex justify-center pl-[0.25em] box-border border-[0.1vw] border-[#0a27a6] rounded-[0.4em] text-[1vw] font-['OTF_B'] font-[800] w-[6em] h-[1.75em] bg-transparent text-[#0a27a6] cursor-pointer focus:outline-none max-md:text-[0.75em]"
          name="fontSize"
          value={fontSize}
          onChange={applyFontSize}
        >
          <option value="0">폰트크기</option>
          <option value="1">1h</option>
          <option value="2">2h</option>
          <option value="3">3h</option>
          <option value="4">4h</option>
          <option value="5">5h</option>
          <option value="6">6h</option>
        </select>

        <div className="mx-[1.2em] my-0 text-[#a2a3b2]">|</div>
        <img className="h-[4vh] hover:filter-[invert(42%)_sepia(59%)_saturate(4229%)_hue-rotate(238deg)_brightness(100%)_contrast(105%)] max-md:w-[0.75em]" onClick={() => applyFormatting("**")} src={BoldIcon} />
        <img
          className="mr-[0.8vw] h-[3.5vh] hover:filter-[invert(42%)_sepia(59%)_saturate(4229%)_hue-rotate(238deg)_brightness(100%)_contrast(105%)] max-md:w-[0.75em]"
          onClick={() => applyFormatting("*")}
          src={ItalicIcon}
        />
        <img
          className="h-[2.3vh] hover:filter-[invert(42%)_sepia(59%)_saturate(4229%)_hue-rotate(238deg)_brightness(100%)_contrast(105%)] max-md:w-[0.75em]"
          onClick={() => applyFormatting("~~")}
          src={StrikeThroughIcon}
        />
        {/* <StyledBar>|</StyledBar>
        <FileInputLabel htmlFor="thumbNail">
          <StyledImageIcon src={ImageIcon} />
        </FileInputLabel>
        <ImageUploadInput type="file" id="thumbNail" accept="image/*" />
        <StyledLinkIcon onClick={addLink} src={LinkIcon} /> */}
        <div className="mx-[1.2em] my-0 text-[#a2a3b2]">|</div>
        <div className="border-[0.1vw] border-[#0a27a6] rounded-[0.4em] text-[1vw] font-['OTF_B'] font-[800] w-[6em] h-[1.75em] box-border px-[0.25em] leading-[1.75em] text-center bg-transparent text-[#0a27a6] cursor-pointer max-md:text-[0.75em]" onClick={() => setIsModalOpen(true)}>
          미리보기
        </div>
      </div>

      <div className="rounded-[15px] w-full h-auto p-[1em] pb-[0em] mt-[0.8125em] box-border flex flex-col items-center focus-within:shadow-[0_0.25em_1.25em_rgba(22,26,63,0.2)] transition-all duration-300">
        <textarea
          className="pt-[1.23em] pr-[1.23em] pl-[1.23em] pb-0 border-none w-full h-[10vh] leading-[1.845em] bg-transparent text-[1vw] font-[500] font-['NanumSquareNeo'] focus:outline-none placeholder:text-[#a2a3b2] placeholder:font-[700] resize-none"
          ref={textareaRef}
          value={markdown}
          onChange={handleMarkdownChange}
          onKeyDown={handleKeyDown}
          placeholder="댓글의 내용을 입력해주세요."
          maxLength="100"
        />
        <div className="w-full mt-[1em] flex flex-col">
          <div className={`text-[0.8125em] ml-auto font-bold ${lengthCount >= 100 ? "text-[red]" : "text-[#A2A3B2]"}`}>
            {lengthCount}/100 자
          </div>
          <hr className="my-[1em] mx-0 border-none w-full h-[1.5px] bg-[rgba(162,163,178,0.4)]" />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#0a27a6] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
          onClick={
            //console.log("게시글 업로드")
            handleSubmit
          }
        >
          댓글 업로드
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-10" onClick={() => setIsModalOpen(false)}>
          <div className="bg-[#fff] p-[2.4615em] rounded-[10px] w-[68em] max-h-[30.7692em] text-[0.8125em] overflow-y-auto relative max-md:w-[80%]" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-[1em] right-[1em] bg-none border-none text-[1.5em] cursor-pointer" onClick={() => setIsModalOpen(false)}>x</button>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingBox;
