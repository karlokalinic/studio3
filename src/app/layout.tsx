import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { SettingsProvider } from '@/context/settings-context';
import AppBody from './_components/app-body';


export const metadata: Metadata = {
  title: 'Nexus Chronicles',
  description: 'A futuristic adventure game.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SettingsProvider>
       <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
          <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@400;500;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet"/>
        </head>
        <AppBody>
            {children}
            <Toaster />
        </AppBody>
      </html>
    </SettingsProvider>
  );
}
