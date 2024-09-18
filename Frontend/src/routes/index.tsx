import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../components/pages";

export const Route = createFileRoute('/')({
  component: HomePage
})