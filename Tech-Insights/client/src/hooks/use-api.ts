import { useQuery, useMutation } from "@tanstack/react-query";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";

// Fetch list of languages
export function useLanguages() {
  return useQuery({
    queryKey: [api.languages.list.path],
    queryFn: async () => {
      const res = await fetch(api.languages.list.path);
      if (!res.ok) throw new Error("Failed to fetch languages");
      const data = await res.json();
      return api.languages.list.responses[200].parse(data);
    },
  });
}

// Fetch single language by slug
export function useLanguageDetail(slug: string) {
  return useQuery({
    queryKey: [api.languages.get.path, slug],
    queryFn: async () => {
      // Manually constructing URL since we don't have buildUrl exposed in manifest, but easy enough
      const url = api.languages.get.path.replace(":slug", slug);
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch language");
      const data = await res.json();
      return api.languages.get.responses[200].parse(data);
    },
    enabled: !!slug,
  });
}

// Fetch resources for a language
export function useResources(languageId: number) {
  return useQuery({
    queryKey: [api.languages.resources.path, languageId],
    queryFn: async () => {
      const url = api.languages.resources.path.replace(":id", languageId.toString());
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch resources");
      const data = await res.json();
      return api.languages.resources.responses[200].parse(data);
    },
    enabled: !!languageId,
  });
}

// Fetch statistics
export function useStatistics() {
  return useQuery({
    queryKey: [api.statistics.list.path],
    queryFn: async () => {
      const res = await fetch(api.statistics.list.path);
      if (!res.ok) throw new Error("Failed to fetch statistics");
      const data = await res.json();
      return api.statistics.list.responses[200].parse(data);
    },
  });
}

// Chat Mutation
export function useChat() {
  return useMutation({
    mutationFn: async (message: string) => {
      const res = await fetch(api.chat.path, {
        method: api.chat.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      
      const data = await res.json();
      return api.chat.responses[200].parse(data);
    },
  });
}
