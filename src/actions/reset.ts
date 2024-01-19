"use server";

import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/mails/reset-password";
import { resetSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/prisma/user";
import { z } from "zod";

export const reset = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid email" };

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "Email not found" };

  const passwordResetToken = await generatePasswordResetToken(email);
  
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: "Email sent" };
};
