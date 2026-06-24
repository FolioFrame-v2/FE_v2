import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/MyProjectsPage";

export const Route = createFileRoute("/myprojects")({
  component: PageComponent,
});
