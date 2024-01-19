"use client";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import FormError from "../form-error";
import { Input } from "../ui/input";
import CardWrapper from "./card-wrapper";
import FormSuccess from "../form-success";
import { login } from "@/actions/login";
import SubmitButton from "../ui/submit-button";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

function LoginForm() {
  const [show2FA, setShow2FA] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isClient, setIsClient] = useState(false);

  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with another provider" : "";
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");

    await login(values, callbackUrl)
      .then((res) => {
        if (res?.error) {
          form.setValue("password", "");
          setError(res.error);
        }
        if (res?.success) {
          form.reset();
          setSuccess(res.success);
        }
        if (res?.twoFactor) {
          setShow2FA(true);
        }
      })
      .catch(() => {
        setError("Something went wrong");
      });
  });

  useEffect(() => {
    show2FA && form.setValue("code", "");
  }, [form, show2FA]);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <CardWrapper headerLabel="Welcome back!" backButtonLabel="Don't have an account?" backButtonHref="/auth/register" showSocial>
      <Form {...form}>
        <form action={() => onSubmit()} className="space-y-6">
          <div className="space-y-4">
            {show2FA ? (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2FA Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456" autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="john.doe@example.com" autoComplete="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="••••••••" autoComplete="current-password" />
                      </FormControl>
                      <Button size="sm" variant="link" asChild className="px-0 font-normal">
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <SubmitButton pendingMessage={show2FA ? "Confirming..." : "Logging in..."}>{show2FA ? "Confirm" : "Login"}</SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
