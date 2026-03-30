import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "tma-studio",
  title: "TMA Admin",
  // ⚠️ Replace with your real projectId after running: npx sanity init
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "replace-me",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("TMA Content")
          .items([
            S.listItem().title("📝 Blog Posts").child(S.documentTypeList("post")),
            S.listItem().title("🗂️ Portfolio Projekte").child(S.documentTypeList("project")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
