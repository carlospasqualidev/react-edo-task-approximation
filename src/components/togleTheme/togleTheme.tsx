import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useTheme } from '@/contexts/theme/themeProvider';

export function TogleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
