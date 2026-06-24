import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/HackathonDetailPage";

export const Route = createFileRoute("/hackathondetail")({
  component: PageComponent,
});
