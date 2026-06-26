import { createFileRoute } from "@tanstack/react-router";
import MyPage from "@/page/mypage";

export const Route = createFileRoute("/mypage")({
  component: MyPage,
});
