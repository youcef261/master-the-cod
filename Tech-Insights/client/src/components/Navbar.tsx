import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language-context";
import { Button } from "@/components/ui/button";
import { Globe, Terminal, Cpu, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

export function Navbar() {
  const [location] = useLocation();
  const { t, toggleLanguage, language } = useLanguage();

  const navItems = [
    { href: "/", label: t("nav.home"), icon: Terminal },
    { href: "/languages", label: t("nav.languages"), icon: Cpu },
    { href: "/tutor", label: t("nav.tutor"), icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-secondary group-hover:scale-110 transition-transform duration-300">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            DEV<span className="text-primary">.HUB</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={clsx(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer group hover:bg-white/5",
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon className={clsx("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                  <span className="relative z-10">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="gap-2 font-mono text-xs hover:bg-white/5 hover:text-primary transition-colors"
          >
            <Globe className="w-4 h-4" />
            {language === "en" ? "AR" : "EN"}
          </Button>
        </div>
      </div>
    </header>
  );
}
