import { createFileRoute } from "@tanstack/react-router";
import ContestsPage from "@/page/contests";

export const Route = createFileRoute("/contests")({
  component: ContestsPage,
});
