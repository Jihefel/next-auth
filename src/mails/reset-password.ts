import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset your email",
      html: `<a href="${resetLink}">Reset your password</a>`,
  })
}
