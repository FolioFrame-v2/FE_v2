import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/MemberSelectionPage";

export const Route = createFileRoute("/memberselection")({
  component: PageComponent,
});
