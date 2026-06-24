import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/CreatePortfolioPage";

export const Route = createFileRoute("/createportfolio")({
  component: PageComponent,
});
