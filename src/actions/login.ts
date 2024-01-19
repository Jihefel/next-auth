"use server";

import { signIn } from "@/auth";
import { generate2FAToken, generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/mails/verification";
import { send2FATokenEmail } from "@/mails/two-factor-token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schemas";
import { db } from "@/utils/prisma/client";
import { get2FAConfirmationByUserId } from "@/utils/prisma/two-factor-confirmation";
import { get2FATokenByEmail } from "@/utils/prisma/two-factor-token";
import { getUserByEmail } from "@/utils/prisma/user";
import { AuthError } from "next-auth";
import { z } from "zod";

// Login
export const login = async (values: z.infer<typeof loginSchema>, callbackUrl?: string | null) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields" };

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) return { error: "Unknown user" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Verification email sent" };
  }

  if (existingUser.is2FAEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await get2FATokenByEmail(existingUser.email);

      if (!twoFactorToken) return { error: "Invalid code" };

      if (twoFactorToken.token !== code) return { error: "Invalid code" };

      const hasExpired = new Date() > new Date(twoFactorToken.expires);

      if (hasExpired) return { error: "Code expired" };

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await get2FAConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      })
    } else {
      const twoFactorToken = await generate2FAToken(existingUser.email);

      await send2FATokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", { email, password, redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
