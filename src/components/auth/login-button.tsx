"use client";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import LoginForm from "./login-form";

type LoginButtonProps = {
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

export default function LoginButton({ children, mode = "redirect", asChild }: PropsWithChildren<LoginButtonProps>) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
}
