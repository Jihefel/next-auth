import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/tailwind-merge-clsx";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  return (
    <main className="h-full flex-col center bg-default">
      <div className="space-y-6">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>🔒Auth</h1>
        <p className="text-lg text-white">A simple authentication service</p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
