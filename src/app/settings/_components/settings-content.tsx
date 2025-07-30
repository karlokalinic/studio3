
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/context/settings-context';
import { Moon, Sun, BookOpen, EyeOff, Swords, AlertTriangle } from 'lucide-react';
import DifficultySlider from './difficulty-slider';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useCharacterStore } from '@/stores/use-character-store';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const SettingsRow = ({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between rounded-lg border p-4">
    <div className="flex items-center space-x-4">
      <div className="text-accent">{icon}</div>
      <div>
        <Label className="text-lg font-headline">{title}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    {children}
  </div>
);

export default function SettingsContent() {
  const { settings, setSetting } = useSettings();
  const { resetCharacter } = useCharacterStore();
  const { toast } = useToast();
  const router = useRouter();


  if (!settings) return null;

  const handleReset = () => {
    resetCharacter();
    toast({
      title: 'Progress Reset',
      description: 'All your character data and game progress have been deleted.',
    });
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_hsl(var(--primary))] sm:text-6xl">
          Settings
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80">
          Customize your gameplay experience.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">
            Gameplay
          </CardTitle>
           <CardDescription>
            Adjust the challenge level of your adventure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DifficultySlider 
            value={settings.difficulty}
            onValueChange={(value) => setSetting('difficulty', value)}
          />
        </CardContent>
      </Card>
      
      <Card className="max-w-3xl mx-auto bg-card/50 border-primary/20 mt-8">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">
            Accessibility
          </CardTitle>
          <CardDescription>
            Adjust settings for a more comfortable experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingsRow
            icon={<Moon className="h-8 w-8" />}
            title="Dark Mode"
            description="Toggle between light and dark themes."
          >
            <Switch
              checked={settings.theme === 'dark'}
              onCheckedChange={(checked) =>
                setSetting('theme', checked ? 'dark' : 'light')
              }
              aria-label="Toggle dark mode"
            />
          </SettingsRow>
          <SettingsRow
            icon={<BookOpen className="h-8 w-8" />}
            title="Dyslexia-Friendly Font"
            description="Use a font designed for better readability."
          >
            <Switch
              checked={settings.dyslexiaFont}
              onCheckedChange={(checked) => setSetting('dyslexiaFont', checked)}
              aria-label="Toggle dyslexia-friendly font"
            />
          </SettingsRow>
          <SettingsRow
            icon={<EyeOff className="h-8 w-8" />}
            title="Reduce Flashing Lights"
            description="Disable or reduce intense flashing screen effects."
          >
            <Switch
              checked={settings.reduceFlashing}
              onCheckedChange={(checked) =>
                setSetting('reduceFlashing', checked)
              }
              aria-label="Toggle flashing lights"
            />
          </SettingsRow>
        </CardContent>
      </Card>
       <Card className="max-w-3xl mx-auto bg-destructive/10 border-destructive/50 mt-8">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-destructive flex items-center gap-2">
            <AlertTriangle />
            Danger Zone
          </CardTitle>
           <CardDescription className="text-destructive/80">
            These actions are permanent and cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">Reset All Progress</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your character data, inventory, quest progress, and achievements. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>Yes, Delete Everything</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
