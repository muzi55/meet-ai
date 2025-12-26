"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";

/**
 * 세션 상태에 따라 회원가입 및 로그인 폼을 렌더링하고 authClient를 사용해 가입·로그인을 처리하는 React 클라이언트 컴포넌트입니다.
 *
 * - 세션이 있으면 사용자 이름 또는 이메일과 로그아웃 버튼을 표시합니다.
 * - 세션이 없으면 이름·이메일·비밀번호를 입력하는 회원가입 폼과 이메일·비밀번호 입력의 로그인 폼을 표시합니다.
 *
 * @returns 렌더된 인증 폼 UI를 포함한 JSX 요소
 */
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