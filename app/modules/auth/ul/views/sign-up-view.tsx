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

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: "이름을 입력해주세요.",
    }),
    email: z
      .string()
      .email("유효한 이메일 주소를 입력해주세요."),
    password: z.string().min(1, {
      message: "비밀번호를 8자 이상 입력해주세요.",
    }),
    confirmPassword: z.string().min(1, {
      message: "비밀번호를 8자 이상 입력해주세요.",
    }),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"],
    }
  );

export function SignUpView() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async () => {
    setError(null);
    setPending(true);

    authClient.signUp.email(
      {
        name: form.getValues("name"),
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

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-6 border rounded-md space-y-4 m-2">
          <div>
            <h1>Let&apos;s get started</h1>
            <p>Create an account to continue.</p>
          </div>

          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input
                      type="name"
                      placeholder="Muzi"
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
          <div>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>confirm password</FormLabel>
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

          <div>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-in"
                className="underline underline-offset-4">
                Sign In
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
