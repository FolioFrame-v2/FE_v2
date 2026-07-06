import { createFileRoute } from "@tanstack/react-router";
import MyPage from "@/page/MyPage";

export const Route = createFileRoute("/mypage")({
  component: MyPage,
});
