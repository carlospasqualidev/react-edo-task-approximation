import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function LoginCard() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="mx-auto flex flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Olá, Carlos Pasquali
          </h1>
          <p className="text-sm text-muted-foreground">
            Bem vindo de volta, informe sua senha.
          </p>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          <Button
            onClick={() => {
              alert('merda');
              navigate('/home');
            }}
          >
            Entrar
          </Button>
        </p>
      </div>
    </div>
  );
}
