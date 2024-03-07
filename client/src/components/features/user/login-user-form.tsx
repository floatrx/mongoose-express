import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { Lock } from 'lucide-react';
import { UserLogoutButton } from '@/components/features/user/user-logout-button';
import { cn } from '@/lib/utils';
import { loginUserSchema } from '@/validators/user';
import { selectIsLoggedIn, selectUser } from '@/store/auth';
import { useAppSelector } from '@/hooks/redux';
import { useForm } from 'react-hook-form';
import { useLazyCheckQuery, useLoginMutation } from '@/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import type { IAuthLoginRequest } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

const formFields = {
  email: {
    label: 'Email',
    placeholder: 'example@domain.com',
    type: 'email',
  },
  password: {
    label: 'Password',
    placeholder: '*****',
    type: 'password',
  },
};

export const LoginUserForm = () => {
  const { toast } = useToast();

  const [login, { isLoading }] = useLoginMutation(); // Create user
  const [checkSession] = useLazyCheckQuery(); // just for testing

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);

  // Create form
  const form = useForm<IAuthLoginRequest>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: { email: '', password: '' },
    disabled: isLoading,
  });

  // Just for testing
  const handleTest = async () => {
    try {
      await checkSession().unwrap();
      toast({ variant: 'success', title: 'Session is valid' });
    } catch (e) {
      console.log('failed', e);
      toast({ title: 'Unauthorized', variant: 'destructive' });
    }
  };

  const handleLogin = form.handleSubmit(async (values) => {
    try {
      const res = await login(values).unwrap();
      toast({ variant: 'success', title: `Welcome back, ${res.profile.name}!` });
    } catch (e) {
      toast({ title: e.data.message, variant: 'destructive' });
    }
  }, console.error);

  if (isLoggedIn) {
    return (
      <Card className="m-auto max-w-xs text-center">
        <CardHeader>
          <CardTitle>Welcome back, {user.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-2">
            <UserLogoutButton />
            <Button type="button" onClick={handleTest} variant="outline">
              Test session
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn({ 'pointer-events-none opacity-65': isLoading }, 'm-auto max-w-[360px]')}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Login</span> <Lock />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form noValidate onSubmit={handleLogin} className="space-y-3">
            {Object.entries(formFields).map(([name, { label, placeholder, type }]) => (
              <FormField
                key={name}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input type={type} placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="flex gap-4">
              <Button type="submit" variant={isLoading ? 'ghost' : 'default'} className="w-[90px]" loading={isLoading}>
                Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginUserForm;