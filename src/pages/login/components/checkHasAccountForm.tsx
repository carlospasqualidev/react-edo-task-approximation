// #region FORM
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
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

// #endregion

const formSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
});

interface ICheckHasAccountForm {
  checkHasAccount: () => Promise<void>;
}

export function CheckHasAccountForm({ checkHasAccount }: ICheckHasAccountForm) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'carlos.pasquali.dev@gmail.com',
    },
  });

  async function onSubmit() {
    setIsLoading(true);

    await checkHasAccount();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  placeholder="digite seu e-mail"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Entrar com e-mail
        </Button>
      </form>
    </Form>
  );
}
