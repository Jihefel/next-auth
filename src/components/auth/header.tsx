import { cn } from "@/utils/tailwind-merge-clsx";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

function Header({ label }: { label: string }) {
  return (
    <div className="w-full center flex-col">
      <h1 className={cn("text-3xl font-semibold", font.className)}>🔒Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}

export default Header;
