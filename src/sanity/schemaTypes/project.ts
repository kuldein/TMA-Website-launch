import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Portfolio Projekt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Untertitel",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Website", "App", "Branding", "Social Media", "Performance",
          "SEO", "CRM", "Video", "Fitness", "FinTech", "Jewelry",
          "Mobility", "Health", "B2B", "Premium", "Launch",
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Hauptbild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "images",
      title: "Weitere Bilder",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "results",
      title: "Ergebnisse",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "year",
      title: "Jahr",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured (auf Homepage zeigen)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "year", media: "coverImage" },
  },
});
