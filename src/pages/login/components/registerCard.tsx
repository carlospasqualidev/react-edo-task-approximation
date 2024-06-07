import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/utils/api';
import { catchHandler } from '@/utils/error/catchHandler';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

interface IRegisterCard {
  user: {
    id: string;
    name: string;
    email: string;
  };
}
export function RegisterCard({ user }: IRegisterCard) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit() {
    setIsLoading(true);

    api
      .post('/publics/registers/send-confirmation-email', {
        email: user.email,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="p-8">
      <div className="mx-auto flex flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Vimos que você ainda não possuí uma conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Caso seja do seu interesse, basta clicar no botão abaixo.
          </p>
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={isLoading}
          onClick={async () => !onSubmit()}
        >
          {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
          {`${isLoading ? 'Enviando' : ' Enviar'} e-mail de confirmação`}
        </Button>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Ao continuar, você concorda com nossos{' '}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Termos de serviço
          </a>{' '}
          e{' '}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Política de Privacidade
          </a>
          .
        </p>
      </div>
    </div>
  );
}
