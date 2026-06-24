import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/PortfolioDetailPage";

export const Route = createFileRoute("/portfoliodetail")({
  component: PageComponent,
});
