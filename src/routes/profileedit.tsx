import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/ProfileEditPage";

export const Route = createFileRoute("/profileedit")({
  component: PageComponent,
});
