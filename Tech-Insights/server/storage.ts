import { db } from "./db";
import { languages, resources, statistics, type Language, type InsertLanguage, type Resource, type InsertResource, type Statistic } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getLanguages(): Promise<Language[]>;
  getLanguageBySlug(slug: string): Promise<Language | undefined>;
  getResourcesByLanguageId(languageId: number): Promise<Resource[]>;
  getStatistics(): Promise<Statistic[]>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getLanguages(): Promise<Language[]> {
    return await db.select().from(languages);
  }

  async getLanguageBySlug(slug: string): Promise<Language | undefined> {
    const [lang] = await db.select().from(languages).where(eq(languages.slug, slug));
    return lang;
  }

  async getResourcesByLanguageId(languageId: number): Promise<Resource[]> {
    return await db.select().from(resources).where(eq(resources.languageId, languageId));
  }

  async getStatistics(): Promise<Statistic[]> {
    return await db.select().from(statistics);
  }

  async seedData(): Promise<void> {
    const existingLangs = await this.getLanguages();
    if (existingLangs.length > 0) return;

    // Seed Languages
    const langs: InsertLanguage[] = [
      {
        name: "Python",
        slug: "python",
        description: "A versatile language used for web dev, data science, and AI.",
        longDescription: "Python is a high-level, interpreted programming language known for its easy-to-read syntax. It is widely used in artificial intelligence, machine learning, web development, and automation.",
        history: "Created by Guido van Rossum and first released in 1991.",
        company: "Python Software Foundation",
        year: "1991",
        codeSnippet: "def hello_world():\n    print('Hello, World!')\n\nhello_world()",
        features: ["Easy to learn", "Versatile", "Huge community"],
        icon: "python"
      },
      {
        name: "JavaScript",
        slug: "javascript",
        description: "The language of the web. Essential for frontend development.",
        longDescription: "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js.",
        history: "Created by Brendan Eich at Netscape in 1995.",
        company: "Oracle (Trademark), ECMA (Standard)",
        year: "1995",
        codeSnippet: "console.log('Hello, World!');\n\nconst greet = (name) => {\n  return `Hello, ${name}`;\n};",
        features: ["Runs in browser", "Asynchronous", "Event-driven"],
        icon: "javascript"
      },
      {
        name: "C++",
        slug: "cpp",
        description: "High-performance language for systems programming and games.",
        longDescription: "C++ is a general-purpose programming language created as an extension of the C programming language, or 'C with Classes'.",
        history: "Created by Bjarne Stroustrup at Bell Labs in 1985.",
        company: "ISO",
        year: "1985",
        codeSnippet: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}",
        features: ["Fast", "Low-level access", "Object-oriented"],
        icon: "cpu"
      },
       {
        name: "Java",
        slug: "java",
        description: "Write once, run anywhere. Enterprise standard.",
        longDescription: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
        history: "Created by James Gosling at Sun Microsystems in 1995.",
        company: "Oracle",
        year: "1995",
        codeSnippet: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
        features: ["Platform independent", "Secure", "Robust"],
        icon: "coffee"
      },
      {
        name: "Go",
        slug: "go",
        description: "Simple, reliable, and efficient software by Google.",
        longDescription: "Go is a statically typed, compiled programming language designed at Google. It is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency.",
        history: "Designed at Google in 2007, announced in 2009.",
        company: "Google",
        year: "2009",
        codeSnippet: "package main\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}",
        features: ["Fast compilation", "Concurrency", "Simple"],
        icon: "box"
      }
    ];

    const insertedLangs = await db.insert(languages).values(langs).returning();

    // Seed Resources (Simulating thousands by adding a few representative ones)
    const resourceData: InsertResource[] = [];
    insertedLangs.forEach(lang => {
      resourceData.push(
        { languageId: lang.id, title: `${lang.name} Official Docs`, url: "https://docs.python.org", type: "documentation", difficulty: "beginner", description: "The official source." },
        { languageId: lang.id, title: `${lang.name} for Beginners`, url: "https://youtube.com", type: "video", difficulty: "beginner", description: "A great introductory video." },
        { languageId: lang.id, title: `Advanced ${lang.name} Patterns`, url: "https://medium.com", type: "article", difficulty: "expert", description: "Deep dive into internals." },
        { languageId: lang.id, title: `Build an App with ${lang.name}`, url: "https://udemy.com", type: "course", difficulty: "intermediate", description: "Full project based learning." }
      );
    });
    
    await db.insert(resources).values(resourceData);

    // Seed Statistics
    await db.insert(statistics).values([
      { key: "lines_of_code", label: "Lines of Code Explained", value: 105230 },
      { key: "active_users", label: "Active Learners", value: 5420 },
      { key: "resources_count", label: "Learning Resources", value: 1250 },
      { key: "db_value", label: "Database Value (GO)", value: 10 }
    ]);
  }
}

export const storage = new DatabaseStorage();
