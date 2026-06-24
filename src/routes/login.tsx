import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/page/loginpage";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
