import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/CreateHackathonPage";

export const Route = createFileRoute("/createhackathon")({
  component: PageComponent,
});
