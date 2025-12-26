"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";

export default function AuthForm() {
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("ctx", ctx);
          console.log("Signing up...");
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log(ctx);
          alert(
            "Signup successful! Please check your email to verify your account."
          );
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();

    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("ctx", ctx);
          console.log("Signing up...");
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log(ctx);
          alert(
            "Signup successful! Please check your email to verify your account."
          );
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  if (session) {
    return (
      <div>
        Welcome, {session.user?.name || session.user?.email}
        !
        <button onClick={() => authClient.signOut()}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>submit</Button>
      </form>

      <form onSubmit={onLogin}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>submit</Button>
      </form>
    </div>
  );
}
