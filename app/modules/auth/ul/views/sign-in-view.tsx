"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z
    .string()
    .email("유효한 이메일 주소를 입력해주세요."),
  password: z.string().min(1, {
    message: "비밀번호를 입력해주세요.",
  }),
});

export function SignInView() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    setError(null);
    setPending(true);

    authClient.signIn.email(
      {
        email: form.getValues("email"),
        password: form.getValues("password"),
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      }
    );
  };

  const onSocial = (provider: "google" | "github") => {
    setError(null);
    setPending(true);

    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      }
    );
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-6 border rounded-md space-y-4 m-2">
          <div>
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue.</p>
          </div>

          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}></FormField>
          </div>
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}></FormField>
          </div>
          {!!error && (
            <Alert className="bg-destructive/10 border-none">
              <OctagonAlertIcon className="w-4 h-4 mr-2 !text-destructive " />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={pending}>
            sign in
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or continue With
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              disabled={pending}
              variant="outline"
              type="button"
              className="w-full"
              onClick={() => onSocial("google")}>
              Google
            </Button>
            <Button
              disabled={pending}
              variant="outline"
              type="button"
              className="w-full"
              onClick={() => onSocial("github")}>
              Github
            </Button>
          </div>
          <div>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="underline underline-offset-4">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
