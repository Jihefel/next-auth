import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send2FATokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<p style="font-size: 16px;">Your 2FA code is: <b>${token}</b></p> 
      <p style="font-size: 12px;">This code will expire in 10 minutes.</p>`,
  });
};
