import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { HomeView } from "../_components/home-view";

export default async function Home() {
  // const greeting = await caller.hello({
  //   text: "from server",
  // });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // return <p>{greeting.greeting}</p>;

  if (!session) {
    redirect("/sign-in");
  }
  return <HomeView />;
}
