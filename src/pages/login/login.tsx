import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Card } from '@/components/ui/card';
import { CheckHasAccountCard, InfoCard } from './components';
import { LoginCard } from './components/loginCard';
import { TogleTheme } from '@/components/togleTheme';

export function Login() {
  const [userAccount, setUserAccount] = useState<true | null>(null);

  return (
    <section className="flex h-screen items-center justify-center p-8">
      <Card className="relative max-w-screen-xl flex-col items-center justify-center bg-background sm:grid lg:grid-cols-2 ">
        <div className="absolute right-2 top-2 z-20">
          <TogleTheme />
        </div>

        <div
          className={twMerge(
            'transition-transform duration-500 ease-in-out',
            userAccount !== null ? 'translate-x-0' : 'lg:translate-x-full',
          )}
        >
          {userAccount === null && ( // On first render
            <CheckHasAccountCard
              checkHasAccount={async () => setUserAccount(true)}
            />
          )}

          {userAccount && ( // After checkHasAccount and user has account
            <LoginCard />
          )}
        </div>

        <div
          className={twMerge(
            'z-10 hidden h-full transition-transform duration-500 ease-in-out lg:flex',
            userAccount !== null ? 'translate-x-0' : 'lg:-translate-x-full',
          )}
        >
          <InfoCard switchPosition={!!userAccount} />
        </div>
      </Card>
    </section>
  );
}
