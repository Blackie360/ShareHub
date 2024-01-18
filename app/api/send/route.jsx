import { EmailTemplate } from '../../_component/email-template.jsx';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { firstName, file } = await req.json();

    const data = await resend.emails.send({
      from: 'shareit@resend.dev',
      to: ['felixkent360@gmail.com'],
      subject: 'Hello world',
      react: <EmailTemplate firstName={firstName} file={file} />,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
