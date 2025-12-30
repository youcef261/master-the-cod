import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const languages = pgTable("languages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  history: text("history").notNull(),
  company: text("company").notNull(),
  year: text("year").notNull(),
  codeSnippet: text("code_snippet").notNull(),
  features: text("features").array(),
  icon: text("icon").notNull(), // Lucide icon name or image URL
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  languageId: integer("language_id").references(() => languages.id).notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  type: text("type").notNull(), // 'video', 'documentation', 'course', 'article'
  difficulty: text("difficulty").notNull(), // 'beginner', 'intermediate', 'expert'
  description: text("description"),
});

export const statistics = pgTable("statistics", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  label: text("label").notNull(),
  value: integer("value").notNull(),
});

export const insertLanguageSchema = createInsertSchema(languages);
export const insertResourceSchema = createInsertSchema(resources);
export const insertStatisticSchema = createInsertSchema(statistics);

export type Language = typeof languages.$inferSelect;
export type InsertLanguage = z.infer<typeof insertLanguageSchema>;
export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Statistic = typeof statistics.$inferSelect;

export type ChatRequest = {
  message: string;
};

export type ChatResponse = {
  response: string;
};
