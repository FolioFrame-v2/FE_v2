import { createFileRoute } from "@tanstack/react-router";
import MainPage from "@/page/mainpage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FolioFrame — 개발자 포트폴리오 제작 플랫폼" },
      {
        name: "description",
        content: "템플릿으로 시작하고, AI 진단으로 다듬고, 한 줄 링크로 공유하는 개발자 포트폴리오.",
      },
    ],
  }),
  component: MainPage,
});
