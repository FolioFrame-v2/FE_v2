import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/SignUpRecruiterEmailPage";

export const Route = createFileRoute("/signuprecruiteremail")({
  component: PageComponent,
});
