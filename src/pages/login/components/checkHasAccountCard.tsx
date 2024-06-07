import { CheckHasAccountForm } from './checkHasAccountForm';

interface ICheckHasAccountCard {
  checkHasAccount: () => Promise<void>;
}

export function CheckHasAccountCard({ checkHasAccount }: ICheckHasAccountCard) {
  return (
    <div className="p-8">
      <div className="mx-auto flex flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Entre em sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Insira seu email, cuidaremos do resto para você :)
          </p>
        </div>
        <CheckHasAccountForm checkHasAccount={async () => checkHasAccount()} />
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
