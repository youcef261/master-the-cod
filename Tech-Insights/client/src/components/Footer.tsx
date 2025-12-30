import { useLanguage } from "@/hooks/use-language-context";
import { Code2, Heart } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-8 mt-auto border-t border-white/5 bg-background/50">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Code2 className="w-5 h-5 text-primary" />
          <span className="font-display font-bold">DEV.HUB</span>
        </div>
        
        <p className="text-sm text-center text-muted-foreground flex items-center gap-2">
          {t("footer.credit")} 
          <Heart className="w-3 h-3 text-accent animate-pulse" fill="currentColor" />
        </p>

        <div className="text-xs text-white/20 font-mono">
          © {new Date().getFullYear()} All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
