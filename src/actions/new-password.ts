"use server";

import { newPasswordSchema } from "@/schemas";
import { db } from "@/utils/prisma/client";
import { getPasswordResetTokenByToken } from "@/utils/prisma/password-reset-token";
import { getUserByEmail } from "@/utils/prisma/user";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const newPassword = async (values: z.infer<typeof newPasswordSchema>, token?: string | null) => {
    if (!token) return { error: "Missing token" };
    
    const validatedFields = newPasswordSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid password" };
    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) return { error: "Invalid token" };

    const hasExpired = new Date() > new Date(existingToken.expires);

    if (hasExpired) return { error: "Token expired" };

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) return { error: "Email not found" };

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            password: hashedPassword,
        },
    });

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id,
        },
    })

    return { success: "Password changed" };
};
