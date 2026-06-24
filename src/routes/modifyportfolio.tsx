import { createFileRoute } from "@tanstack/react-router";
import PageComponent from "@/page/ModifyPortfolioPage";

export const Route = createFileRoute("/modifyportfolio")({
  component: PageComponent,
});
