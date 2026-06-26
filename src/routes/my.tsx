import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/MyPage_2";

export const Route = createFileRoute("/my")({
  component: PageComponent,
});
