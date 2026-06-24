import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/HackathonPage";

export const Route = createFileRoute("/hackathon")({
  component: PageComponent,
});
