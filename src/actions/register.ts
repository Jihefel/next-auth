"use server";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/mails/verification";
import { registerSchema } from "@/schemas";
import { db } from "@/utils/prisma/client";
import { getUserByEmail } from "@/utils/prisma/user";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Register
export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields" };

  const { email, name, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "User already exists" };

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent" };
};
