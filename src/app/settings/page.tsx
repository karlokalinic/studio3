import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SettingsContent from "./_components/settings-content";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <div className="absolute top-4 left-4 z-10">
        <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Game
          </Link>
        </Button>
      </div>
      <SettingsContent />
    </div>
  );
}
