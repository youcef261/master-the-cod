import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8 rounded-2xl border border-white/10 bg-white/5 max-w-md mx-4">
        <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-500 mb-4">
          <AlertTriangle className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-display font-bold">404</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist in this reality.
        </p>
        <Link href="/">
          <Button variant="default" className="w-full">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
