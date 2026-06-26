import { createFileRoute } from "@tanstack/react-router";
import BrowsePage from "@/page/browse";

export const Route = createFileRoute("/browse")({
  component: BrowsePage,
});
