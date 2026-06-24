import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/SignUpRecruiterPage";

export const Route = createFileRoute("/signuprecruiter")({
  component: PageComponent,
});
