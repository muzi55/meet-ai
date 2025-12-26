"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function HomeView() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return <p>로그인 해주세요</p>;
  }
  return (
    <div>
      <p>환영합니다, {session.user.name}!</p>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push("/sign-in"),
            },
          })
        }>
        Sign out
      </Button>
    </div>
  );
}
