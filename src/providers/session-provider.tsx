import { auth } from "@/auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

async function SessionProvider({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
}

export default SessionProvider;
