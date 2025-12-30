import { useChat } from "@/hooks/use-api";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function Tutor() {
  const { t } = useLanguage();
  const { mutate: sendMessage, isPending } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm your AI programming assistant. How can I help you learn today?" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);

    sendMessage(userMsg, {
      onSuccess: (data) => {
        setMessages(prev => [...prev, { role: "bot", content: data.response }]);
      },
      onError: () => {
        setMessages(prev => [...prev, { role: "bot", content: "Sorry, I encountered an error. Please try again." }]);
      }
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-10 flex flex-col">
      <div className="container mx-auto px-4 flex-1 flex flex-col max-w-4xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">{t("nav.tutor")}</h1>
          <p className="text-muted-foreground">Powered by Gemini AI</p>
        </div>

        <div className="flex-1 bg-card/30 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col shadow-2xl">
          {/* Chat Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 
                    ${msg.role === 'user' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  
                  <div className={`p-4 rounded-2xl max-w-[80%] leading-relaxed whitespace-pre-wrap
                    ${msg.role === 'user' 
                      ? 'bg-secondary/10 border border-secondary/20 text-white rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-muted-foreground rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isPending && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/5 border-t border-white/10">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("tutor.placeholder")}
                className="flex-1 h-12 bg-black/20 border-white/10 focus:ring-primary/50"
                disabled={isPending}
              />
              <Button type="submit" disabled={isPending || !input.trim()} size="lg" className="h-12 w-12 p-0 rounded-xl bg-primary hover:bg-primary/90">
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
