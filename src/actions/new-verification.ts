"use server";

import { db } from "@/utils/prisma/client";
import { getUserByEmail } from "@/utils/prisma/user";
import { getVerificationTokenByToken } from "@/utils/prisma/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Token not found" };

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) return { error: "Token expired" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Email not found" };

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  })

  return { success: "Email verified" };
}
