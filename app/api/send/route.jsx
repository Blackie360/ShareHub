import { EmailTemplate } from '../../_component/email-template.jsx';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const responce=await req.json();
  try {
    

    const data = await resend.emails.send({
      from: 'shareit@resend.dev',
      to: ['felixkent360@gmail.com'],
      subject: responce?.fullName+"Shared a file with you",
      react: EmailTemplate({responce}),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
