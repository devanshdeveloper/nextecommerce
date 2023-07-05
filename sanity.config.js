import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export const config = defineConfig({
  projectId: "gg4qbk77",
  dataset: "production",
  apiVersion: "2023-06-30",
  title: "Ecommerce App",
  basePath: "/admin",
  plugins: [deskTool(),visionTool()],
  schema: { types: schemaTypes }
});
