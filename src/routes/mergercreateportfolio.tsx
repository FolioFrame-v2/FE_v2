import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/MergerCreatePortfolioPage";

export const Route = createFileRoute("/mergercreateportfolio")({
  component: PageComponent,
});
