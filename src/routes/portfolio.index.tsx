import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/PortfolioPage";

export const Route = createFileRoute("/portfolio/")({
  component: PageComponent,
});
