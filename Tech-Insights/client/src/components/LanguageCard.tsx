import { Language } from "@shared/schema";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Code } from "lucide-react";
import * as Icons from "lucide-react";

export function LanguageCard({ language, index }: { language: Language; index: number }) {
  // Dynamic icon rendering
  const IconComponent = (Icons as any)[language.icon] || Code;

  return (
    <Link href={`/language/${language.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative h-full cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative h-full bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/50 transition-colors duration-300">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/20 transition-colors duration-300">
              <IconComponent className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
            </div>
            <span className="px-2 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-muted-foreground">
              {language.year}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
              {language.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {language.description}
            </p>
          </div>

          <div className="mt-auto pt-4 flex items-center text-sm font-medium text-secondary group-hover:translate-x-1 transition-transform duration-300">
            Explore <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
