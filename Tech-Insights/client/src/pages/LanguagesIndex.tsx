import { useLanguages } from "@/hooks/use-api";
import { LanguageCard } from "@/components/LanguageCard";
import { useLanguage } from "@/hooks/use-language-context";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function LanguagesIndex() {
  const { data: languages, isLoading } = useLanguages();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = languages?.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            {t("nav.languages")}
          </h1>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search Python, Java, Rust..."
              className="pl-12 h-14 rounded-2xl bg-white/5 border-white/10 text-lg focus:ring-primary/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered?.map((lang, index) => (
              <LanguageCard key={lang.id} language={lang} index={index} />
            ))}
          </div>
        )}

        {!isLoading && filtered?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No languages found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
