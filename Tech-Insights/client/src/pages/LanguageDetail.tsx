import { useLanguageDetail, useResources } from "@/hooks/use-api";
import { useRoute } from "wouter";
import { CodeBlock } from "@/components/CodeBlock";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Calendar, Building, BookOpen, PlayCircle, FileText } from "lucide-react";
import * as Icons from "lucide-react";

export default function LanguageDetail() {
  const [, params] = useRoute("/language/:slug");
  const slug = params?.slug || "";
  const { data: language, isLoading } = useLanguageDetail(slug);
  const { data: resources } = useResources(language?.id || 0);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!language) return <div className="min-h-screen flex items-center justify-center">Language not found</div>;

  const IconComponent = (Icons as any)[language.icon] || Icons.Code;

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative pt-32 pb-20 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-2xl"
            >
              <IconComponent className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </motion.div>
            
            <div className="text-center md:text-left">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-6xl font-display font-bold mb-4"
              >
                {language.name}
              </motion.h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-6 font-mono">
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
                  <Calendar className="w-4 h-4" /> {language.year}
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
                  <Building className="w-4 h-4" /> {language.company}
                </span>
              </div>

              <p className="text-lg max-w-2xl leading-relaxed text-white/80">
                {language.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-white/5 border border-white/10 p-1 h-auto rounded-xl inline-flex">
            <TabsTrigger value="overview" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary">Overview</TabsTrigger>
            <TabsTrigger value="code" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary">Code Snippets</TabsTrigger>
            <TabsTrigger value="resources" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary">Learning Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-card/50 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-2xl font-display font-bold mb-4">About</h3>
                  <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
                    {language.longDescription}
                  </p>
                </div>
                
                <div className="bg-card/50 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-2xl font-display font-bold mb-4">History</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {language.history}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card/50 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-secondary" /> Key Features
                  </h3>
                  <ul className="space-y-3">
                    {language.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-display font-bold mb-6">Hello World & Basic Syntax</h3>
              <CodeBlock code={language.codeSnippet} language={language.slug === 'c++' ? 'cpp' : language.slug} />
            </div>
          </TabsContent>

          <TabsContent value="resources" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources?.map((resource) => (
                <a 
                  key={resource.id} 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-white/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {resource.type === 'video' ? <PlayCircle className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium uppercase tracking-wider
                      ${resource.difficulty === 'beginner' ? 'bg-green-500/10 text-green-400' : 
                        resource.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                      {resource.difficulty}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    {resource.title} <ExternalLink className="w-4 h-4 opacity-50" />
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                </a>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
