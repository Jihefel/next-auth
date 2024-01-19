"use client";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";
import { BiLoaderAlt } from "react-icons/bi";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/utils/tailwind-merge-clsx";

type SubmitButtonProps = {
  pendingMessage?: string;
} & ButtonProps;

export default function SubmitButton({ pendingMessage = "Loading...", children, className, ...props }: PropsWithChildren<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={cn("w-full flex gap-1", className)} size="lg" disabled={pending || props.disabled} {...props}>
      {pending ? (
        <>
          <BiLoaderAlt className="animate-spin" /> {pendingMessage ?? children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
