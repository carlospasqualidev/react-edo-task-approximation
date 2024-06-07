// #region FORM
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// #endregion

// #region COMPONENTS
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/utils/api';
import { catchHandler } from '@/utils/error/catchHandler';
// #endregion

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 dígitos' }),
});

interface IRegisterForm {
  userId: string;
}

export function RegisterForm({ userId }: IRegisterForm) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit() {
    setIsLoading(true);

    const { password } = form.getValues();
    api
      .post('/publics/auths/login', {
        userId,
        password,
      })
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isLoading}
                  placeholder="digite sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </form>
    </Form>
  );
}
