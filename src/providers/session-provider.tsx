import { auth } from "@/auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

async function SessionProvider({ children }: PropsWithChildren) {
  const session = await auth();

  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
}

export default SessionProvider;
