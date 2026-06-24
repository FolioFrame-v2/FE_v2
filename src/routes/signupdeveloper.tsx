import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/signUpDeveloperPage";

export const Route = createFileRoute("/signupdeveloper")({
  component: PageComponent,
});
