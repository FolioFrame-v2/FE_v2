import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub 스타일의 마크다운 지원
import { getCurrentUser } from "../../features/currentUser";
import { oriComments } from "../../domain/startProgram";
//댓글 삭제
import { removeComment } from "../../features/saveComment";

const CommentList = ({ comments, setComments, portfolioId }) => {
  // const handleDelete = (index) => {
  //   const currentUser = getCurrentUser();
  //   const commentToDelete = comments[index];

  //   if (currentUser && commentToDelete.userId === currentUser.id) {
  //     oriComments.delete(commentToDelete.commentId); //oriComments에서 삭제

  //     setComments((prevComments) => prevComments.filter((_, i) => i !== index));
  //   } else {
  //     alert("본인이 작성한 댓글만 삭제할 수 있습니다.");
  //   }
  // };

  console.log("comments 데이터 확인:", comments); // 디버깅용 로그

  const handleDelete = async (index) => {
    const currentUser = getCurrentUser();
    const commentToDelete = comments[index];

    if (currentUser && commentToDelete.userId === currentUser.id) {
      try {
        // 서버와 파일에서 댓글 삭제
        await removeComment(commentToDelete.commentId);

        // 로컬 상태에서 삭제
        setComments((prevComments) =>
          prevComments.filter((_, i) => i !== index)
        );
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
    } else {
      alert("본인이 작성한 댓글만 삭제할 수 있습니다.");
    }
  };

  return (
    <div className="flex flex-col w-full mb-[1em]">
      {comments.map((comment, index) => (
        <div key={index} className="mt-[20px]">
          <div className="flex items-center gap-[1vw]">
            <span className="font-bold font-['OTF_B']">{comment.userId}</span>
            <span className="font-bold font-['OTF_R']">{comment.date}</span>
            {comment.userId === getCurrentUser().id && (
              <button className="py-[8px] px-[12px] border-none rounded-[4px] bg-[#0a27a6] text-white cursor-pointer mt-[5px] font-['OTF_B']" onClick={() => handleDelete(index)}>
                삭제
              </button>
            )}
          </div>
          <div className="my-[10px] mx-0">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {comment.text}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
