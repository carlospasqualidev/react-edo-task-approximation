import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Images } from '@/assets';

export function ErrorFallback() {
  return (
    <body className="flex h-screen items-center justify-center p-4">
      <Card className="flex max-w-screen-xl flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-[350px]">
          <img src={Images.mascotSad} alt="mascote e-duzca triste" />
        </div>

        <div className="mb-8 space-y-2">
          <h1 className="text-center text-4xl font-bold text-primary">
            Oops! alguma coisa deu errada...
          </h1>

          <p className="text-center text-xl text-muted-foreground">
            Não se preocupe, eu ja avisei o meu chefe!
          </p>
        </div>

        <Button onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </Card>
    </body>
  );
}
