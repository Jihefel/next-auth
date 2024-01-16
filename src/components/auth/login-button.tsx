"use client";
import { PropsWithChildren } from "react";

type LoginButtonProps = {
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

export default function LoginButton({ children, mode = "redirect", asChild }: PropsWithChildren<LoginButtonProps>) {
  const handleClick = () => {
    console.log("LOGIN BUTTON CLICKED");
  };

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
}
