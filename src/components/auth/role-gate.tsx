"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";
import { PropsWithChildren } from "react";
import FormError from "../form-error";

export default function RoleGate({ children, allowedRoles }: PropsWithChildren<{ allowedRoles: UserRole }>) {
  const role = useCurrentRole();

  if (role !== allowedRoles) {
    return <FormError message="You do not have permission to access this page." />;
  }

  return (
    <>{children}</>
  );
}
