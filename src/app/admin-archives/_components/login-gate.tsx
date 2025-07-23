'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginGateProps {
  onAuthenticated: () => void;
}

export default function LoginGate({ onAuthenticated }: LoginGateProps) {
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = () => {
    if (password === 'ADMIN') {
      onAuthenticated();
    } else {
      toast({
        title: 'Authentication Failed',
        description: 'The password you entered is incorrect.',
        variant: 'destructive',
      });
      setPassword('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md bg-card/50 border-primary/20 shadow-lg shadow-primary/10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <KeyRound className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl text-primary">
            Admin Archives Access
          </CardTitle>
          <CardDescription>
            This area contains sensitive design and lore documents.
            Authentication is required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="text-center text-lg"
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleLogin}
            className="w-full font-headline text-lg"
          >
            Authenticate
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
