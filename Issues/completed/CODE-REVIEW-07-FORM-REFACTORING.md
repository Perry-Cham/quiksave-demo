# Issue 7: Refactor LoginForm Component & Consolidate Modal State Management

**Title:** Separate Concerns in LoginForm & Consolidate Modal State Management

**Problem:** `LoginForm` component has multiple violations:
1. **Tight Coupling:** Directly uses `authClient` without abstraction
2. **State Duplication:** Uses local `useState` for modal, ignores `useMessageModal` store
3. **Incomplete Error Handling:** Generic error messages don't help users
4. **Password Field Bug:** `password` input missing `disabled={isSubmitting}` while `email` has it
5. **Type Safety:** `FormValues` type is overly permissive
6. **Component Size:** Too large, mixing concerns (form handling + error modal)

**Impact:**
- Difficult to reuse authentication logic elsewhere
- State management inconsistency (zustand store unused)
- Poor UX (confusing error messages)
- **SoC violation** - form, validation, auth, and UI state mixed

**Affected Files:**
- `components/login-form.tsx`
- `stores/Admin_Message_Modal_Store.ts` (unused)

**Goal:** Refactor into smaller, focused components with centralized error handling.

**Acceptance Criteria:**

- ✅ Extract authentication logic into `hooks/useAuth.ts`
- ✅ Create separate `components/AuthForm.tsx` (dumb component)
- ✅ Use `useMessageModal` store for all error/success messages
- ✅ All form inputs consistently handle `disabled` state
- ✅ Type safety improved (no partial types)
- ✅ Specific error messages from server are shown to user
- ✅ Remove duplicate modal state management

**Recommended Implementation:**

```typescript
// hooks/useAuth.ts
'use client';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';

export interface AuthError {
  code: string;
  message: string;
}

interface UseAuthReturn {
  isLoading: boolean;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/admin',
        rememberMe: false,
      });

      if (authError) {
        setError({
          code: 'AUTH_FAILED',
          message: authError.message || 'Sign in failed. Please check your credentials.',
        });
      }
    } catch (err: any) {
      setError({
        code: 'NETWORK_ERROR',
        message: err.message || 'Network error. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: '/admin',
      });

      if (authError) {
        setError({
          code: 'SIGNUP_FAILED',
          message: authError.message || 'Sign up failed. Please try again.',
        });
      }
    } catch (err: any) {
      setError({
        code: 'NETWORK_ERROR',
        message: err.message || 'Network error. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    signIn,
    signUp,
    clearError: () => setError(null),
  };
}
```

```typescript
// components/AuthForm.tsx
'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { GalleryVerticalEnd, LoaderCircle } from 'lucide-react';

const baseSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const signUpSchema = baseSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

type SignInValues = z.infer<typeof baseSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;

interface AuthFormProps extends React.ComponentProps<'form'> {
  type: 'signin' | 'signup';
  onSuccess?: () => void;
}

export function AuthForm({ type, className, onSuccess, ...props }: AuthFormProps) {
  const { isLoading, error, signIn, signUp } = useAuth();
  const schema = type === 'signin' ? baseSchema : signUpSchema;
  const form = useForm<SignInValues | SignUpValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      ...(type === 'signup' && { name: '' }),
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = async (values: SignInValues | SignUpValues) => {
    if (type === 'signin') {
      await signIn(values.email, values.password);
    } else {
      const signUpValues = values as SignUpValues;
      await signUp(signUpValues.email, signUpValues.password, signUpValues.name);
    }
    
    if (!error) onSuccess?.();
  };

  return (
    <form
      className={cn('flex flex-col space-y-8', className)}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      {...props}
    >
      <div className="flex items-center justify-left space-x-4">
        <GalleryVerticalEnd className="size-5" />
        <h1 className="text-xl font-bold">Quicksave</h1>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md">
          <p className="text-sm font-medium">{error.message}</p>
        </div>
      )}

      {type === 'signup' && (
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            placeholder="John Doe"
            {...register('name')}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1.5">{(errors.name as any).message}</p>
          )}
        </Field>
      )}

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1.5">{(errors.email as any).message}</p>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          type="password"
          {...register('password')}
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1.5">{(errors.password as any).message}</p>
        )}
      </Field>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
        {type === 'signin' ? 'Sign In' : 'Sign Up'}
      </Button>
    </form>
  );
}
```

**Benefits:**
- Authentication logic reusable in other components
- Consistent state management (no duplicate modal stores)
- Better error UX (specific messages)
- Improved type safety
- Easier to test (hooks are testable)
- Smaller, more focused components
