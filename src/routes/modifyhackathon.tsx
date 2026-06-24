import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/ModifyHackathonPage";

export const Route = createFileRoute("/modifyhackathon")({
  component: PageComponent,
});
