import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/RecruiterPage";

export const Route = createFileRoute("/recruiter")({
  component: PageComponent,
});
