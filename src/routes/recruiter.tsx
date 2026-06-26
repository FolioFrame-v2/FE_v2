import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/recruiter";

export const Route = createFileRoute("/recruiter")({
  component: PageComponent,
});
