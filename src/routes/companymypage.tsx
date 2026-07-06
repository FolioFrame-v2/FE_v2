import { createFileRoute } from "@tanstack/react-router";
import CompanyMyPage from "@/page/CompanyMyPage";

export const Route = createFileRoute("/companymypage")({
  component: CompanyMyPage,
});
