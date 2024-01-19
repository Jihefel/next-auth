"use client";

import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import CardWrapper from "./card-wrapper";

export default function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError("Missing token");
      return;
    }

    await newVerification(token)
      .then((res) => {
        if (res.error) setError(res?.error);
        if (res.success) setSuccess(res?.success);
      })
      .catch((err) => {
        setError("Something went wrong");
      });
  }, [error, success, token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper headerLabel="Verify your email" backButtonLabel="Go back to login" backButtonHref="/auth/login">
      <div className="w-full center">
        {!success && !error && <BeatLoader />}
        {!success && <FormError message={error} />}
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
}
