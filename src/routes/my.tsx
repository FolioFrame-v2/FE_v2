import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/MyPage";

export const Route = createFileRoute("/my")({
  component: PageComponent,
});
