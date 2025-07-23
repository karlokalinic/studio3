
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&family=Cinzel:wght@400;700&family=Open+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <SettingsProvider>
        <AppBody>
          {children}
          <Toaster />
        </AppBody>
      </SettingsProvider>
    </html>
  );
}
